import express from 'express';
import {
  addSongs,
  deleteSong,
  getAll,
  getLikedSong,
  getSongById,
  likeSong,
  updateSong,
  uploadsArtistImage,
  uploadsAudio,
  uploadsImage,
} from '../controllers/songController.js';
import uploadFile from '../configs/multerConfig.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', addSongs);
router.get('/', getAll);
router.put('/:songId', updateSong);
router.delete('/:songId', deleteSong);
router.get('/:songId', getSongById);
router.put('/like/:songId', authMiddleware, likeSong);
router.get('/like', getLikedSong);
router.post('/image', uploadFile.single('image'), uploadsImage);
router.post('/audio', uploadFile.single('audio'), uploadsAudio);
router.post('/artistImg', uploadFile.single('artistImg'), uploadsArtistImage);

export default router;
