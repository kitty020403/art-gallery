import connectDB from '@/lib/mongodb';
import Artist from '@/models/Artist';
import { NextResponse } from 'next/server';

// GET all artists
export async function GET() {
  try {
    await connectDB();
    const artists = await Artist.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: artists });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// POST create new artist
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const artist = await Artist.create(body);
    return NextResponse.json({ success: true, data: artist }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
