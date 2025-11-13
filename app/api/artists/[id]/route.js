import connectDB from '@/lib/mongodb';
import Artist from '@/models/Artist';
import { NextResponse } from 'next/server';

// GET single artist by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const artist = await Artist.findById(params.id);
    if (!artist) {
      return NextResponse.json({ success: false, error: 'Artist not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: artist });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT update artist by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const artist = await Artist.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!artist) {
      return NextResponse.json({ success: false, error: 'Artist not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: artist });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE artist by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const artist = await Artist.findByIdAndDelete(params.id);
    if (!artist) {
      return NextResponse.json({ success: false, error: 'Artist not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
