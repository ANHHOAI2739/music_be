import mongoose from 'mongoose';

const albumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    image: {
      type: String,
    },
    category: {
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

const Album = mongoose.model('Album', albumSchema);
export default Album;
