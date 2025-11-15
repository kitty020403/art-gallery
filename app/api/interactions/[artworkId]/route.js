import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Interaction from '@/models/Interaction';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// GET /api/interactions/:artworkId - Get user's interactions for an artwork
export async function GET(request, context) {
  try {
    await connectDB();
    
    const { artworkId } = await context.params;
    
    // Check auth
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    // Get all interactions for this artwork by this user
    const interactions = await Interaction.find({
      user: decoded.userId,
      artwork: artworkId
    });

    const userInteractions = {
      liked: interactions.some(i => i.type === 'like'),
      favorited: interactions.some(i => i.type === 'favorite'),
      shared: interactions.some(i => i.type === 'share')
    };

    return NextResponse.json({ success: true, data: userInteractions });
  } catch (error) {
    console.error('Error fetching interactions:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch interactions' }, { status: 500 });
  }
}

// POST /api/interactions/:artworkId - Toggle an interaction (like/favorite/share)
export async function POST(request, context) {
  try {
    await connectDB();
    
    const { artworkId } = await context.params;
    const { type } = await request.json();

    // Validate type
    if (!['like', 'favorite', 'share'].includes(type)) {
      return NextResponse.json({ success: false, error: 'Invalid interaction type' }, { status: 400 });
    }

    // Check auth
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    // Check if interaction exists
    const existingInteraction = await Interaction.findOne({
      user: decoded.userId,
      artwork: artworkId,
      type
    });

    let action;
    if (existingInteraction) {
      // Remove interaction (toggle off)
      await Interaction.deleteOne({ _id: existingInteraction._id });
      action = 'removed';
    } else {
      // Add interaction (toggle on)
      await Interaction.create({
        user: decoded.userId,
        artwork: artworkId,
        type
      });
      action = 'added';
    }

    // Get updated counts
    const likesCount = await Interaction.countDocuments({ artwork: artworkId, type: 'like' });
    const favoritesCount = await Interaction.countDocuments({ artwork: artworkId, type: 'favorite' });
    const sharesCount = await Interaction.countDocuments({ artwork: artworkId, type: 'share' });

    return NextResponse.json({
      success: true,
      data: {
        action,
        type,
        counts: {
          likes: likesCount,
          favorites: favoritesCount,
          shares: sharesCount
        }
      }
    });
  } catch (error) {
    console.error('Error toggling interaction:', error);
    return NextResponse.json({ success: false, error: 'Failed to toggle interaction' }, { status: 500 });
  }
}
