const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));

// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'Blog API Server is running!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API endpoints working!', timestamp: new Date() });
});

// MongoDB connection - Try Atlas first, fallback to local
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch(err => {
    console.log('❌ Atlas connection failed, trying local MongoDB...');
    mongoose.connect(process.env.MONGODB_LOCAL)
      .then(() => console.log('✅ Connected to local MongoDB successfully!'))
      .catch(localErr => console.log('❌ Both Atlas and local MongoDB failed:', localErr));
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});