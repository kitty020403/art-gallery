import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'artist', 'admin'],
    default: 'user',
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
  }],
}, {
  timestamps: true,
});

if (mongoose.models.User) {
  delete mongoose.models.User;
}
export default mongoose.models.User || mongoose.model("User", UserSchema);
