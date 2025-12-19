import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const getImageUrl = (imagePath) => {
    // If no image, return a random placeholder based on blog ID
    if (!imagePath) {
      const imageId = Math.abs(blog._id?.toString().charCodeAt(0) || Math.random() * 1000) % 10 + 1;
      return `https://picsum.photos/400/200?random=${imageId}`;
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `http://localhost:3002${imagePath}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <img
        src={getImageUrl(blog.image)}
        alt={blog.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const imageId = Math.abs(blog._id?.toString().charCodeAt(0) || Math.random() * 1000) % 10 + 1;
          e.target.src = `https://picsum.photos/400/200?random=${imageId}`;
        }}
      />
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-3">
          {blog.content ? blog.content.substring(0, 100) + '...' : 'No content available'}
        </p>
        <p className="text-sm text-gray-400 mb-3">By: {blog.author?.name || 'Anonymous'}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <Link
            to={`/blog/${blog._id}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;