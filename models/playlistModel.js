import mongoose from 'mongoose';

const playlistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    songs: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
