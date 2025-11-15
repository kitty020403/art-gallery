import connectDB from '@/lib/mongodb';
import Artist from '@/models/Artist';
import { NextResponse } from 'next/server';

// GET single artist by ID
export async function GET(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const artist = await Artist.findById(id);
    if (!artist) {
      return NextResponse.json({ success: false, error: 'Artist not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: artist });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT update artist by ID
export async function PUT(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    const artist = await Artist.findByIdAndUpdate(id, body, {
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
export async function DELETE(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      return NextResponse.json({ success: false, error: 'Artist not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
