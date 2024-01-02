import express from 'express';
import {
  authMiddleware,
  isAdminMiddleware,
} from '../middlewares/authMiddleware.js';
import {
  allUser,
  deleteUser,
  editUser,
  searchUsers,
  setAdmin,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', authMiddleware, allUser);
router.put('/setAdmin/:userId', authMiddleware, isAdminMiddleware, setAdmin);
router.put('/profile/:userId', authMiddleware, editUser);
router.get('/search/:userId', authMiddleware, searchUsers);
router.put('/delete/:userId', authMiddleware, isAdminMiddleware, deleteUser);

export default router;
