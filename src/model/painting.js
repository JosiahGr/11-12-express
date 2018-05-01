import mongoose from 'mongoose';

const paintingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  artist: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: false,
  },
  era: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model('painting', paintingSchema);
