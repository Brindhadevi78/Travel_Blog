import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const data = isLogin ? { email, password } : { name, email, password };
      
      const response = await api.post(endpoint, data);
      login(response.data.user, response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center py-12">
      <div className="bg-amber-50 p-8 rounded-2xl shadow-xl w-full max-w-md border border-amber-200">
        <div className="text-center mb-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-black mb-2">🌞 Sunny Voyage</h1>
            <p className="text-gray-600">Share your journeys under the same sun</p>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">{isLogin ? 'Welcome Back!' : 'Join Our Community'}</h2>
          <p className="text-gray-600 text-sm">{isLogin ? 'Sign in to continue your adventure' : 'Create an account to start sharing your travels'}</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-black mb-2 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-black mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-black mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 text-white p-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-lg"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;