import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artwork: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  },
  type: {
    type: String,
    enum: ['like', 'favorite', 'share'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index pour recherche rapide et éviter les doublons
interactionSchema.index({ user: 1, artwork: 1, type: 1 }, { unique: true });

// Delete cached model in development
if (process.env.NODE_ENV !== 'production' && mongoose.models.Interaction) {
  delete mongoose.models.Interaction;
}

const Interaction = mongoose.models.Interaction || mongoose.model('Interaction', interactionSchema);

export default Interaction;
