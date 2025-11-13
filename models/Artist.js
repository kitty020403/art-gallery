import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  years: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Artist || mongoose.model('Artist', ArtistSchema);
