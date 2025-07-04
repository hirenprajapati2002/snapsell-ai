// src/components/StudioNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, User, LogOut, Settings, RefreshCw } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';
import ProfileUpdateModal from './ProfileUpdateModal';

const StudioNavbar = () => {
  const { user, logout, openLoginModal, fetchUserData } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false);
  const menuRef = useRef();





  const handleRefreshUser = async () => {
    setIsRefreshing(true);
    await fetchUserData();
    setIsRefreshing(false);
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
    <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-30">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <div className="text-2xl font-extrabold">
          <span className="bg-gradient-to-r from-[#6a4bff] to-[#f82cff] bg-clip-text text-transparent">
            Snapsell.
          </span>
          <span className="text-black">
            AI
          </span>
        </div>
      </div>

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
                <div
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                  onClick={() => { setShowProfileUpdateModal(true); setShowProfileMenu(false); }}
                >
                  <RefreshCw className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-gray-700">Update Profile</span>
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
      {showProfileUpdateModal && (
        <ProfileUpdateModal
          isOpen={showProfileUpdateModal}
          onClose={() => setShowProfileUpdateModal(false)}
          user={user}
        />
      )}
    </nav>
  );
};

export default StudioNavbar;
