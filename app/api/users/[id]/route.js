import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

// GET /api/users/:id - Public user profile (limited fields)
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const user = await User.findById(id).select('name role createdAt');
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching public user profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/users/:id - Update user role (admin only)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Check auth
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { role } = body;

    // Validate role
    if (!role || !['user', 'artist', 'admin'].includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role. Must be user, artist, or admin.' }, { status: 400 });
    }

    // Prevent self-demotion from admin
    if (id === decoded.userId && role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Cannot change your own admin role' }, { status: 400 });
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ success: false, error: 'Failed to update user role' }, { status: 500 });
  }
}
