import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import UpdateBlogImages from './pages/UpdateBlogImages';
import Footer from './components/Footer';

function AppContent() {
  const { user } = useContext(AuthContext);
  
  // If user is not authenticated, show login page
  if (!user) {
    return <Login />;
  }
  
  // If user is authenticated, show the main app
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-images" element={<UpdateBlogImages />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;