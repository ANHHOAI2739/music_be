import express from 'express';
import {
  addSongs,
  deleteSong,
  getAll,
  getLikedSong,
  likeSong,
  updateSong,
  uploadsArtistImage,
  uploadsAudio,
  uploadsImage,
} from '../controllers/songController.js';
import uploadFile from '../configs/multerConfig.js';

const router = express.Router();

router.post('/', addSongs);
router.get('/', getAll);
router.put('/:songId', updateSong);
router.delete('/:songId', deleteSong);
router.put('/like/:songId', likeSong);
router.get('/like', getLikedSong);
router.post('/image', uploadFile.single('image'), uploadsImage);
router.post('/audio', uploadFile.single('audio'), uploadsAudio);
router.post('/artistImg', uploadFile.single('audio'), uploadsArtistImage);

export default router;
