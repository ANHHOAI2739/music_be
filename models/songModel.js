import mongoose from 'mongoose';

const songSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    song: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    genre: {
      type: String,
    },
    language: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Song = mongoose.model('Song', songSchema);
export default Song;
