// src/components/StudioNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, UploadCloud } from "lucide-react";

const StudioNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-end relative z-30">
      {/* Right Side: + Create & Login */}
      <div className="flex items-center space-x-3">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 px-4 py-1.5 border rounded-lg text-sm text-gray-800 hover:bg-gray-100"
          >
            <span className="text-lg font-medium">+ Create</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg border rounded-xl text-sm text-gray-800">
              <div className="px-4 py-2 font-semibold text-xs text-gray-500 border-b">
                Create new design
              </div>
              <div className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                <Plus className="w-4 h-4 mr-2 text-purple-600" />
                <span>Create new</span>
              </div>
              <div className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                <UploadCloud className="w-4 h-4 mr-2 text-purple-600" />
                <span>Import from PSD</span>
              </div>
            </div>
          )}
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium">
          Login
        </button>
      </div>
    </nav>
  );
};

export default StudioNavbar;
