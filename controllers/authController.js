import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dmlc8hjzu',
  api_key: '463525567462749',
  api_secret: 'gXldLMlEHGYIDKwoKTBaiSxPEZU',
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({ message: 'Missing required fields' });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
  const IsMatchPassword = bcrypt.compare(password, existingUser.password);
  if (!IsMatchPassword) {
    res.status(401).json({ message: 'Email or password is not correct!' });
  }
  const jwtPayload = {
    email: existingUser.email,
    id: existingUser.id,
    userName: existingUser.userName,
    isAdmin: existingUser.isAdmin,
  };
  const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  res.json({ token: token, message: 'Login successfully' });
});

export const register = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username || !password || !email) {
    res.status(404).json({ message: 'Missing required fields' });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'Email has already been registered' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    email,
    username,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).json({ message: 'Register new user successfully' });
});

export const getMe = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const currentUser = await User.findById(id).select('-password');
  if (!currentUser) {
    res.status(401).json({ message: 'Unauthorized user' });
  }
  res.json({
    userInfo: currentUser,
  });
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const file = req.file;
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: 'auto',
    folder: 'music-app-avatar',
  });
  fs.unlinkSync(file.path);
  const avatarUrl = result && result.secure_url;
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    {
      profilePic: avatarUrl,
    },
    {
      new: true,
    },
  ).select('-password');

  return res.json({
    message: 'Upload avatar successfully',
    data: updatedUser,
  });
});
