import mongoose from 'mongoose';

const ArtworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  period: {
    type: String,
  },
  price: {
    type: Number,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  // NEW FIELDS FOR ARTIST SUBMISSION WORKFLOW
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true,
  },
  rejectionReason: {
    type: String,
  }
}, {
  timestamps: true,
});

// In dev, Next.js can cache models with older schemas. Ensure we recompile when schema changes.
if (mongoose.models.Artwork) {
  delete mongoose.models.Artwork;
}
export default mongoose.model('Artwork', ArtworkSchema);
