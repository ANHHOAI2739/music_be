import express from 'express';
import authRouter from './authRoute.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/songs', authRouter);

export default router;