import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageType, setImageType] = useState('file'); // 'file' or 'url'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImage(null);
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      setLoading(false);
      return;
    }

    // Validate image size if present
    if (image && image.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content.trim());
      
      if (imageType === 'file' && image) {
        formData.append('image', image);
        console.log('Uploading image file:', { name: image.name, size: image.size, type: image.type });
      } else if (imageType === 'url' && imageUrl) {
        formData.append('imageUrl', imageUrl);
        console.log('Using image URL:', imageUrl);
      }

      console.log('Submitting blog...');

      const response = await api.post('/blogs', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 30000, // 30 seconds
      });

      console.log('Blog created successfully:', response.data._id);
      navigate('/');
    } catch (err) {
      console.error('Create blog error:', err);
      
      let errorMessage = 'Failed to create blog. Please try again.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        if (err.message.includes('timeout')) {
          errorMessage = 'Upload timeout. Please try with a smaller image or check your connection.';
        } else if (err.message.includes('Network Error') || err.message.includes('ERR_NETWORK')) {
          errorMessage = 'Cannot connect to server. Please make sure the backend is running on port 5000.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Blog Post</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your blog title..."
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Content *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Write your blog content here..."
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Featured Image</label>
              
              {/* Image type selector */}
              <div className="flex gap-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="file"
                    checked={imageType === 'file'}
                    onChange={(e) => setImageType(e.target.value)}
                    className="mr-2"
                  />
                  Upload File
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="url"
                    checked={imageType === 'url'}
                    onChange={(e) => setImageType(e.target.value)}
                    className="mr-2"
                  />
                  Image URL
                </label>
              </div>
              
              {imageType === 'file' ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
                </>
              ) : (
                <>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter a direct link to an image from the internet</p>
                </>
              )}
              
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                    onError={() => setImagePreview(null)}
                  />
                  {image && (
                    <p className="text-xs text-gray-500 mt-1">
                      File: {image.name} ({(image.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                  {imageUrl && (
                    <p className="text-xs text-gray-500 mt-1">
                      URL: {imageUrl}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? 'Creating Blog...' : 'Publish Blog'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;