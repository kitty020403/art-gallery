import connectDB from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// GET all artworks
export async function GET(request) {
  try {
    await connectDB();
    // Use Next.js provided nextUrl to safely access searchParams (new URL(request.url) can fail if relative)
    const statusFilter = request.nextUrl?.searchParams?.get('status');
    const submittedBy = request.nextUrl?.searchParams?.get('submittedBy');
    let query = {};
    if (statusFilter && statusFilter !== 'all') {
      // Validate acceptable values
      const allowed = ['pending', 'approved', 'rejected'];
      if (allowed.includes(statusFilter)) {
        query.status = statusFilter;
      } else {
        return NextResponse.json({ success: false, error: 'Invalid status filter' }, { status: 400 });
      }
    } else if (!statusFilter) {
      // Default: only approved or legacy docs without status field
      query = { $or: [ { status: 'approved' }, { status: { $exists: false } } ] };
    } // status=all => query remains {}

    if (submittedBy) {
      // Basic ObjectId validation; if invalid, return empty list to avoid throwing
      try {
        // eslint-disable-next-line no-new
        new (await import('mongoose')).default.Types.ObjectId(submittedBy);
        query.submittedBy = submittedBy;
      } catch (e) {
        return NextResponse.json({ success: true, data: [] });
      }
    }

    const artworks = await Artwork.find(query)
      .sort({ createdAt: -1 })
      .populate({ path: 'submittedBy', select: 'name email', strictPopulate: false });
    return NextResponse.json({ success: true, data: artworks });
  } catch (error) {
    console.error('GET /api/artworks error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// POST create new artwork
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Extract user from JWT cookie to associate submission
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }
    let submittedBy = null;
    let role = 'user';
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
      submittedBy = decoded.userId;
      role = decoded.role;
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    // Only allow admin or artist roles to submit
    if (!['admin', 'artist'].includes(role)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    // If a normal user submits, force status to pending even if they tried to set approved
    // Admin can directly approve.
    let status = body.status;
    if (role !== 'admin') {
      status = 'pending';
    } else if (!status) {
      status = 'approved';
    }

    const artwork = await Artwork.create({
      title: body.title,
      artist: body.artist,
      year: body.year,
      image: body.image,
      description: body.description,
      period: body.period,
      price: body.price,
      featured: body.featured || false,
      submittedBy,
      status,
    });
    return NextResponse.json({ success: true, data: artwork }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
