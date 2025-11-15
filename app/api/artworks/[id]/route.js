import connectDB from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// GET single artwork by ID
export async function GET(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    console.log('GET /api/artworks/:id ->', id);
    const artwork = await Artwork.findById(id).populate({ path: 'submittedBy', select: 'name email', strictPopulate: false });
    if (!artwork) {
      return NextResponse.json({ success: false, error: 'Artwork not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: artwork });
  } catch (error) {
    console.error('GET /api/artworks/[id] error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT update artwork by ID
export async function PUT(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    console.log('PUT /api/artworks/:id ->', id);
    const body = await request.json();

    // Determine role to allow status updates only for admin
    const token = request.cookies.get('token')?.value;
    let role = 'user';
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
        role = decoded.role;
      } catch(e) {}
    }

    // Build update object only with provided fields to avoid failing required validators
    const updatableFields = ['title','artist','year','image','description','period','price','featured'];
    const update = {};
    updatableFields.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        update[key] = body[key];
      }
    });
    // Allow admin to modify status/rejectionReason
    if (role === 'admin') {
      if (Object.prototype.hasOwnProperty.call(body, 'status')) update.status = body.status;
      if (Object.prototype.hasOwnProperty.call(body, 'rejectionReason')) update.rejectionReason = body.rejectionReason;
    }

  const artwork = await Artwork.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      omitUndefined: true,
    });
    if (!artwork) {
      return NextResponse.json({ success: false, error: 'Artwork not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: artwork });
  } catch (error) {
    console.error('PUT /api/artworks/[id] error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE artwork by ID
export async function DELETE(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    console.log('DELETE /api/artworks/:id ->', id);
    // Only admin can delete (simple enforcement)
    const token = request.cookies.get('token')?.value;
    let role = 'user';
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
        role = decoded.role;
      } catch(e) {}
    }
    if (role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }
  const artwork = await Artwork.findByIdAndDelete(id);
    if (!artwork) {
      return NextResponse.json({ success: false, error: 'Artwork not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
