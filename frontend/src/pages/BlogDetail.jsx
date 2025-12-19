import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const staticBlogs = {
    'static-1': {
      _id: 'static-1',
      title: "Amazing Journey To Mt Everest",
      content: `An unforgettable trek to the base camp of the world's highest peak, experiencing stunning landscapes and rich culture.

The Journey Begins

Starting from Kathmandu, the adventure takes you through picturesque villages and breathtaking mountain views. The trek offers incredible insights into Sherpa culture and the challenges of high-altitude climbing.

Base Camp Experience

Reaching Everest Base Camp is a life-changing experience with incredible views of the world's tallest mountain. The sense of achievement and the breathtaking panorama make every step of the challenging journey worthwhile.`,
      author: { name: "Dharshana" },
      createdAt: "2024-07-15",
      image: "/src/images/i6.jpg",
      location: "Nepal",
      category: "Adventure"
    },
    'static-2': {
      _id: 'static-2',
      title: "Tokyo Street Adventures",
      content: `Discover the vibrant life and culture of Tokyo through its bustling streets, delicious cuisine, and unique traditions.

Street Culture

Tokyo's streets are alive with energy, from busy crossings to quiet alleyways filled with local shops. Each district has its own unique character and charm.

Food Adventures

Experience authentic Japanese cuisine from street vendors and traditional restaurants. From ramen to sushi, every meal is an adventure in flavor.`,
      author: { name: "Birunda Lakshimi" },
      createdAt: "2025-01-10",
      image: "/src/images/17.webp",
      location: "Tokyo, Japan",
      category: "City"
    },
    'static-3': {
      _id: 'static-3',
      title: "Ancient Temple Exploration",
      content: `A journey through time exploring the history and architecture of ancient temples nestled in serene landscapes.

Historical Significance

These temples hold centuries of history and spiritual significance for local communities. Each stone tells a story of devotion and craftsmanship.

Architectural Marvel

The intricate designs and craftsmanship showcase the artistic skills of ancient civilizations. Every detail reflects the spiritual beliefs and cultural values of the time.`,
      author: { name: "Luffy" },
      createdAt: "2024-04-09",
      image: "/src/images/i1.jpg",
      location: "Cambodia",
      category: "Culture"
    },
    'static-4': {
      _id: 'static-4',
      title: "Chalbi Desert Safari",
      content: `Experience the vast beauty and solitude of the Chalbi Desert, where endless horizons meet stunning sunsets.

Desert Landscape

The Chalbi Desert offers unique geological formations and breathtaking views across its expansive terrain. The silence and vastness create a meditative experience.

Wildlife Encounters

Despite its harsh conditions, the desert is home to various adapted wildlife species. Early morning and evening safaris reveal the desert's hidden life.`,
      author: { name: "Zoro Roronoa" },
      createdAt: "2025-07-07",
      image: "/src/images/i2.jpg",
      location: "Kenya",
      category: "Nature"
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      // Check if it's a static blog first
      if (staticBlogs[id]) {
        setBlog(staticBlogs[id]);
        setLoading(false);
        return;
      }

      // Otherwise, fetch from database
      try {
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
          <p className="text-gray-600">The blog you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/800x400';
    if (imagePath.startsWith('http')) return imagePath; // Already a full URL
    return `http://localhost:3002${imagePath}`; // Add base URL for uploaded files
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <img 
          src={getImageUrl(blog.image)} 
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400';
          }}
        />
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              {blog.category && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                  {blog.category}
                </span>
              )}
              {blog.location && (
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {blog.location}
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{blog.title}</h1>
            <div className="flex items-center text-gray-600 mb-6">
              <span>By {blog.author?.name || 'Anonymous'}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(blog.createdAt)}</span>
              {blog.readTime && (
                <>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime} min read</span>
                </>
              )}
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {blog.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              
              // Check if it's a heading (simple heuristic)
              if (paragraph.length < 50 && !paragraph.includes('.') && paragraph.trim() !== '') {
                return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-900">{paragraph}</h3>;
              }
              
              return <p key={index} className="mb-4">{paragraph}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;