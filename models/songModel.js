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
    artistImg: {
      type: String,
    },
    category: {
      type: String,
    },
    language: {
      type: String,
    },
    // album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    album: { type: String },
  },
  {
    timestamps: true,
  },
);

const Song = mongoose.model('Song', songSchema);
export default Song;
