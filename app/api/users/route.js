import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

// GET /api/users - List all users (admin only)
export async function GET(request) {
  try {
    await connectDB();
    
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

    // Get all users (exclude password)
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}
