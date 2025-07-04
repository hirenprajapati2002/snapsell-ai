// src/components/StudioNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, User, LogOut, Settings, RefreshCw } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

const StudioNavbar = () => {
  const { user, logout, openLoginModal, fetchUserData } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const menuRef = useRef();

  // Fetch fresh user data when component mounts
  useEffect(() => {
    console.log('StudioNavbar: Current user state:', user);
    if (user) {
      console.log('StudioNavbar: User exists, fetching fresh data...');
      fetchUserData();
    }
  }, [fetchUserData]);

  // Log user changes
  useEffect(() => {
    console.log('StudioNavbar: User data updated:', user);
  }, [user]);

  const handleRefreshUser = async () => {
    setIsRefreshing(true);
    console.log('Manual refresh triggered');
    await fetchUserData();
    setIsRefreshing(false);
  };

  // Test function to set a token manually
  const handleTestAPI = () => {
    // Set the JWT token from your Postman test - REPLACE WITH YOUR ACTUAL TOKEN
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Replace with your actual JWT token
    localStorage.setItem('authToken', testToken);
    console.log('Token set, now fetching user data...');
    fetchUserData();
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      openLoginModal();
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-end relative z-30">
      {/* Right Side: Profile Dropdown */}
      <div className="flex items-center">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                {user?.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name || 'User'} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (                    <span className="text-white text-sm font-medium">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 
                       user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-xl text-sm overflow-hidden">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name || 'User'} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 
                         user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {user?.name || user?.username || 'User\'s Personal Account'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center">
                  <User className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-gray-700">My Dashboard</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center">
                  <Settings className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-gray-700">Settings</span>
                </div>
              </div>

              {/* Logout */}
              <div className="border-t py-2">
                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-left"
                >
                  <LogOut className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-gray-700">Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default StudioNavbar;
