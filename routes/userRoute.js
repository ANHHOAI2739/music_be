import express from 'express';
import {
  authMiddleware,
  isAdminMiddleware,
} from '../middlewares/authMiddleware.js';
import { allUser, setAdmin } from '../controllers/userController.js';

const router = express.Router();

router.get('/', authMiddleware, allUser);
router.put('/setAdmin/:userId', authMiddleware, isAdminMiddleware, setAdmin);

export default router;
