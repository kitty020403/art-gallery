import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Validate ID format
    if (!id || id.length < 1) {
      return NextResponse.json(
        { success: false, error: 'Invalid artist ID' },
        { status: 400 }
      );
    }

    // Try to find artist by ID or name
    let artist = await User.findById(id).select('-password');
    
    // If not found by ID, try by name
    if (!artist) {
      artist = await User.findOne({ 
        $or: [
          { name: id },
          { email: id }
        ]
      }).select('-password');
    }

    if (!artist) {
      return NextResponse.json(
        { success: false, error: 'Artist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: artist });
  } catch (error) {
    console.error('GET /api/artists/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
