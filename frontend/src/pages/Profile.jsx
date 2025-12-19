import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CartoonAvatar from '../components/CartoonAvatar';

const Profile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    bio: 'Passionate traveler sharing amazing adventures and hidden gems from around the world.',
    location: 'Global Nomad',
    website: 'https://travelexplorer.com'
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data - replace with API call
    console.log('Profile updated:', profile);
  };

  const userPosts = [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          
          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-6">
              <div className="border-4 border-white rounded-full shadow-lg">
                <CartoonAvatar name={profile.name} size={128} />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-gray-600">{profile.location}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full p-3 border rounded-lg h-24"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2 text-gray-600">{profile.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Website:</span>
                    <a href={profile.website} className="ml-2 text-blue-600 hover:underline">
                      {profile.website}
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Bio:</span>
                    <p className="mt-1 text-gray-600">{profile.bio}</p>
                  </div>
                </div>
              )}
            </div>

            {/* User Posts */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">My Posts</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <div key={post._id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                          Published
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2">No posts yet. Create your first blog!</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;