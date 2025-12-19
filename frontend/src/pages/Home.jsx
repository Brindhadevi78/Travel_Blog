import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import api from '../utils/api';

const Home = () => {
  const [dbBlogs, setDbBlogs] = useState([]);

  const staticBlogs = [
    {
      _id: 'static-1',
      title: "Amazing Journey To Mt Everest",
      excerpt: "An unforgettable trek to the base camp of the world's highest peak, experiencing stunning landscapes and rich culture.",
      createdAt: "2024-07-15",
      image: "/src/images/i6.jpg",
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
      image: "/src/images/17.webp",
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
      image: "/src/images/i1.jpg",
      location: "Cambodia",
      category: "Culture",
      readTime: 7,
      author: { name: "Luffy" },
      likesCount: 12
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setDbBlogs(response.data.blogs || response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const allBlogs = [...staticBlogs, ...dbBlogs];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center text-white py-48"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://wallpapers.com/images/hd/world-map-aesthetic-ksbnbro6lzsn1638.jpg")'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <img src="/src/images/i11.png" alt="Sunny Voyage" className="w-24 h-24 rounded-full mr-4" />
            <h1 className="text-6xl font-bold">Sunny Voyage</h1>
          </div>
          <p className="text-xl mb-8">Share your journeys under the same sun</p>
          <Link 
            to="/blogs" 
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Read Travel Stories
          </Link>
        </div>
      </div>

      {/* Featured Blogs */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Popular Travel Blogs</h2>
          <p className="text-black text-lg max-w-2xl mx-auto">Discover amazing travel stories from our community of passionate explorers</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.length > 0 ? (
            allBlogs.slice(0, 6).map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No blogs available.
            </p>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-br from-amber-100 to-orange-100 py-24">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h2 className="text-5xl font-bold mb-12 text-black">About Our Platform</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-amber-50 p-10 rounded-2xl shadow-xl border border-amber-200">
              <div className="text-6xl mb-6">🌍</div>
              <h3 className="text-2xl font-bold mb-4 text-black">What is this?</h3>
              <p className="text-black text-lg leading-relaxed">A community-driven travel blogging platform where passionate travelers share their adventures and discoveries from around the world.</p>
            </div>
            <div className="bg-amber-50 p-10 rounded-2xl shadow-xl border border-amber-200">
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-2xl font-bold mb-4 text-black">Why it exists?</h3>
              <p className="text-black text-lg leading-relaxed">To connect travelers, inspire wanderlust, and help people discover new destinations through authentic stories and experiences.</p>
            </div>
            <div className="bg-amber-50 p-10 rounded-2xl shadow-xl border border-amber-200">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-black">Who can use it?</h3>
              <p className="text-black text-lg leading-relaxed">Anyone with a passion for travel - seasoned explorers, weekend adventurers, or dreamers with stories to share.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;