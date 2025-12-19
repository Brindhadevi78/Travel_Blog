import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sunny Voyage</h3>
            <p className="text-amber-200">Share your journeys under the same sun. Connect with fellow travelers and discover amazing destinations.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-amber-200 hover:text-white">Home</Link></li>
              <li><Link to="/blogs" className="text-amber-200 hover:text-white">Blogs</Link></li>
              <li><Link to="/login" className="text-amber-200 hover:text-white">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-amber-200">Email: info@sunnyvoyage.com</p>
            <p className="text-amber-200">Follow us for travel inspiration</p>
          </div>
        </div>
        <div className="border-t border-amber-700 mt-8 pt-4 text-center">
          <p className="text-amber-200">&copy; 2024 Sunny Voyage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;