// src/components/Navbar.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, openLoginModal } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      openLoginModal();
    }
  };
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-white font-semibold text-xl">Snapsell.AI</span>
        </div>

        {/* Links */}
        {/* <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1 text-gray-300 hover:text-white cursor-pointer">
            <span>All Tools</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <a href="#" className="text-gray-300 hover:text-white">Services</a>
          <a href="#" className="text-gray-300 hover:text-white">APIs</a>
          <a href="#" className="text-gray-300 hover:text-white">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-white">Resources</a>
        </div> */}

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <a
            href={`${window.location.origin}/create`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative"
          >
            {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">
              Start Creating
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded">
                New
              </span>
            </button> */}
          </a>
          <button
            onClick={handleAuthClick}
            className="text-gray-300 hover:text-white border border-gray-600 px-4 py-2 rounded-lg"
          >
            {user ? `Welcome, ${user.name}` : 'Log in / Sign up'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
