import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Song from '../models/songModel.js';

export const allUser = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  const users = await User.find().skip(skip).limit(size);
  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / size);

  res.json({
    data: users,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalCounts: totalUsers,
      totalPages,
    },
  });
});

export const setAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  if (typeof isAdmin !== 'boolean') {
    return res.status(400).json({ message: 'Invalid value for isAdmin' });
  }
  //   if (!req.user.isAdmin) {
  //     return res.status(403).json({ message: 'Permission denied' });
  //   }
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.isAdmin = isAdmin;
  await user.save();
  res.status(200).json({
    data: user,
    message: `Admin status for user ${user.username} updated successfully`,
  });
});

export const searchUsers = asyncHandler(async (req, res) => {
  const searchTerm = req.query.term?.toString();
  const regexTerm = new RegExp(searchTerm, 'i');
  const searchUsers = await User.find({
    username: { $regex: regexTerm },
  }).select('username avatar');
  if (!searchUsers) return res.status(404).json({ message: 'User not found' });
  const searchSongs = await Song.find({
    name: { $regex: regexTerm },
  }).select('image artist');
  if (!searchSongs) return res.status(404).json({ message: 'Song not found' });
  res.status(200).json({
    searchUsers: searchUsers,
    searchSongs: searchSongs,
  });
});

export const editUser = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { username } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.username = username;
  await user.save();
  return res
    .status(200)
    .json({ message: 'Username updated successfully', user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await user.remove();
  return res.status(200).json({ message: 'User deleted successfully' });
});
