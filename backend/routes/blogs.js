const express = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const router = express.Router();

// Multer setup with proper storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `blog-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    
    let imageSource = null;
    if (req.file) {
      imageSource = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      imageSource = imageUrl;
    }
    
    const blog = new Blog({
      title,
      content,
      author: req.user._id,
      image: imageSource
    });

    await blog.save();
    await blog.populate('author', 'name email');
    
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete all blogs
router.delete('/all', async (req, res) => {
  try {
    await Blog.deleteMany({});
    res.json({ message: 'All blogs deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;