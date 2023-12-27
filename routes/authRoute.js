import express from 'express';
import { getMe, login, register } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import uploadFile from '../configs/multerConfig.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authMiddleware, getMe);
router.post('/avatar', authMiddleware, uploadFile.single('avatar'), getMe);

export default router;
