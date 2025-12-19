import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-amber-50 shadow-lg border-b border-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 text-2xl font-bold text-black hover:text-gray-800 transition-colors">
            <img src="/src/images/i11.png" alt="Sunny Voyage" className="w-10 h-10 rounded-full" />
            <span>Sunny Voyage</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-black hover:text-gray-700 font-medium transition-colors">Home</Link>
            <Link to="/blogs" className="text-black hover:text-gray-700 font-medium transition-colors" >Blogs</Link>
            {user ? (
              <>
                <Link to="/create" className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium">Write</Link>
                <Link to="/profile" className="text-black hover:text-gray-700 font-medium transition-colors">Profile</Link>
                <button onClick={logout} className="text-black hover:text-red-600 font-medium transition-colors">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;