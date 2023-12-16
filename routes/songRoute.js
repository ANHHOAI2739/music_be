import express from 'express';

const router = express.Router();

router.post('/', addSongs);
router.get('/', getAll);
router.put('/:songId', updateSong);
router.delete('/:songId', deleteSong);
router.put('/like/:songId', likeSong);
router.get('/like', getLikedSong);

export default router;
