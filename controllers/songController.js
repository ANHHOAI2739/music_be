import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import Song from '../models/songModel.js';

cloudinary.config({
  cloud_name: 'dmlc8hjzu',
  api_key: '463525567462749',
  api_secret: 'gXldLMlEHGYIDKwoKTBaiSxPEZU',
});

export const addSongs = asyncHandler(async (req, res) => {
  const { name, artist, song, category, image, language, album, artistImg } =
    req.body;
  const newSongs = new Song({
    name,
    artist,
    song,
    category,
    language,
    image,
    album,
    artistImg,
  });
  await newSongs.save();
  res.status(201).json({
    data: newSongs,
    message: 'Create new post successfully',
  });
});

export const getAll = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  const songs = await Song.find().skip(skip).limit(size);
  const totalSongs = await Song.countDocuments();
  const totalPages = Math.ceil(totalSongs / size);

  res.json({
    data: songs,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalCounts: totalSongs,
      totalPages,
    },
  });
});

export const updateSong = asyncHandler(async (req, res) => {
  const { songId } = req.params;
  const { name, artist, song, category, image, language, album } = req.body;
  const updatedSong = await Song.findByIdAndUpdate(
    songId,
    { name, artist, song, category, language, album, image },
    { new: true },
  );

  res
    .status(200)
    .json({ message: 'Song updated successfully', song: updatedSong });
});

export const deleteSong = asyncHandler(async (req, res) => {
  const { songId } = req.params;
  const deletedSong = await Song.findByIdAndDelete(songId);
  if (!deletedSong) {
    return res.status(404).json({ message: 'Song not found' });
  }
  res
    .status(200)
    .json({ message: 'Song deleted successfully', song: deletedSong });
});

export const likeSong = asyncHandler(async (req, res) => {
  const { songId } = req.params;
  const likedSong = await Song.findByIdAndUpdate(
    songId,
    { $inc: { likes: 1 } },
    { new: true },
  );
  res.status(200).json({ message: 'Song liked successfully', song: likedSong });
});

export const getLikedSong = asyncHandler(async (req, res) => {
  const likedSongs = await Song.find({ likes: { $gt: 0 } });
  res.status(200).json({ likedSongs: likedSongs });
});

export const uploadsImage = asyncHandler(async (req, res) => {
  const file = req.file;
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: 'auto',
    folder: 'IMAGE',
  });
  fs.unlinkSync(file.path);
  const imageUrl = result && result.secure_url;
  return res.status(200).json({
    data: imageUrl,
    message: 'upload image successfully',
  });
});

export const uploadsAudio = asyncHandler(async (req, res) => {
  const file = req.file;
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: 'auto',
    folder: 'AUDIO',
  });
  fs.unlinkSync(file.path);
  const audioUrl = result && result.secure_url;
  return res.status(200).json({
    data: audioUrl,
    message: 'upload audio successfully',
  });
});

export const uploadsArtistImage = asyncHandler(async (req, res) => {
  const file = req.file;
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: 'auto',
    folder: 'ARTIST-IMAGE',
  });
  fs.unlinkSync(file.path);
  const imageUrl = result && result.secure_url;
  return res.status(200).json({
    data: imageUrl,
    message: 'upload image successfully',
  });
});
