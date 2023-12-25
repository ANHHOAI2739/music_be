import express from 'express';
import authRouter from './authRoute.js';
import songRouter from './songRoute.js';
import userRouter from './userRoute.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/songs', songRouter);
router.use('/user', userRouter);

export default router;
