import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

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
  }
}
