import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

<<<<<<< HEAD
export async function GET(req, { params }) {
=======
// GET /api/users/:id - Public user profile (limited fields)
export async function GET(request, context) {
>>>>>>> 483fa3a78f9c0a786bc76b280f26a3c31c4cdb3c
  try {
    await connectDB();
    const { id } = await context.params;

<<<<<<< HEAD
    // Vérifie ID valide MongoDB
    const mongoose = await import('mongoose');
    if (!mongoose.default.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid user ID' }, { status: 400 });
    }

    const user = await User.findById(id).select('name role createdAt');
    if (!user) return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
=======
    const user = await User.findById(id).select('name role createdAt phone bio location instagram website');
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching public user profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/users/:id
// - If the authenticated user updates their own profile, allow updating allowed profile fields
// - If updating another user, only admins can update role
export async function PUT(request, context) {
  try {
    await connectDB();
    
    const { id } = await context.params;
    
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

    const body = await request.json();

    // Self-update: allow safe profile fields only
    if (id === decoded.userId) {
      const allowedFields = ['name', 'phone', 'bio', 'location', 'instagram', 'website'];
      const update = {};
      for (const key of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          update[key] = body[key];
        }
      }

      // Don't allow empty update
      if (Object.keys(update).length === 0) {
        return NextResponse.json({ success: false, error: 'No valid fields to update' }, { status: 400 });
      }

      const updated = await User.findByIdAndUpdate(
        id,
        update,
        { new: true, runValidators: true }
      ).select('-password');

      if (!updated) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: updated });
    }

    // Otherwise, require admin to update role for others
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    const { role } = body;
    if (!role || !['user', 'artist', 'admin'].includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role. Must be user, artist, or admin.' }, { status: 400 });
    }

    const updatedRoleUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedRoleUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedRoleUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
>>>>>>> 483fa3a78f9c0a786bc76b280f26a3c31c4cdb3c
  }
}
