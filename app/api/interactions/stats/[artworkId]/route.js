import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Interaction from '@/models/Interaction';

// GET /api/interactions/stats/:artworkId - Get interaction counts for an artwork
export async function GET(request, context) {
  try {
    await connectDB();
    
    const { artworkId } = await context.params;

    const likesCount = await Interaction.countDocuments({ artwork: artworkId, type: 'like' });
    const favoritesCount = await Interaction.countDocuments({ artwork: artworkId, type: 'favorite' });
    const sharesCount = await Interaction.countDocuments({ artwork: artworkId, type: 'share' });

    return NextResponse.json({
      success: true,
      data: {
        likes: likesCount,
        favorites: favoritesCount,
        shares: sharesCount
      }
    });
  } catch (error) {
    console.error('Error fetching interaction stats:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}
