import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import api from '../utils/api';

const Blogs = () => {
  const [dbBlogs, setDbBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const staticBlogs = [
    {
      _id: 'static-1',
      title: "Amazing Journey To Mt Everest",
      excerpt: "An unforgettable trek to the base camp of the world's highest peak, experiencing stunning landscapes and rich culture.",
      createdAt: "2024-07-15",
      image: "/images/i6.jpg",
      location: "Nepal",
      category: "Adventure",
      readTime: 8,
      author: { name: "Dharshana" },
      likesCount: 15
    },
    {
      _id: 'static-2',
      title: "Tokyo Street Adventures",
      excerpt: "Discover the vibrant life and culture of Tokyo through its bustling streets, delicious cuisine, and unique traditions.",
      createdAt: "2025-01-10",
      image: "/images/17.webp",
      location: "Tokyo, Japan",
      category: "City",
      readTime: 6,
      author: { name: "Birunda Lakshimi" },
      likesCount: 23
    },
    {
      _id: 'static-3',
      title: "Ancient Temple Exploration",
      excerpt: "A journey through time exploring the history and architecture of ancient temples nestled in serene landscapes.",
      createdAt: "2024-04-09",
      image: "/images/i1.jpg",
      location: "Cambodia",
      category: "Culture",
      readTime: 7,
      author: { name: "Luffy" },
      likesCount: 12
    },
    {
      _id: 'static-4',
      title: "Chalbi Desert Safari",
      excerpt: "Experience the vast beauty and solitude of the Chalbi Desert, where endless horizons meet stunning sunsets.",
      createdAt: "2025-07-07",
      image: "/images/i2.jpg",
      location: "Kenya",
      category: "Nature",
      readTime: 5,
      author: { name: "Zoro Roronoa" },
      likesCount: 8
    }
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs');
      setDbBlogs(response.data.blogs || response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load some blogs');
      setLoading(false);
    }
  };

  const allBlogs = [...staticBlogs, ...dbBlogs];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Travel Stories</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto">
            {error}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlogs.length > 0 ? (
            allBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No blogs available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;