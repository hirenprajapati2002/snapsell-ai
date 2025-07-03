import React, { useState } from "react";
import {
  Plus,
  ImageIcon,
  Wand2,
  Upload,
  LayoutDashboard,
  Palette,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom"; // <-- import this

// Reusable sidebar item
// eslint-disable-next-line no-unused-vars
const SidebarItem = ({ icon: Icon, label, active, beta, onClick, isDropdown }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 text-sm font-medium ${active ? "bg-[#f1efff] text-purple-700" : "text-gray-700"
      }`}
  >
    <div className="flex items-center">
      <Icon className="w-4 h-4 mr-2" />
      <span>{label}</span>
    </div>
    {isDropdown && (
      <span className="ml-2">{active ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
    )}
  </div>
);

const StudioSidebar = () => {
  const [isBannersOpen, setIsBannersOpen] = useState(true);

  const toggleBanners = () => setIsBannersOpen(!isBannersOpen);

  return (
    <aside className="w-60 bg-white h-screen border-r px-4 py-6 flex flex-col justify-between fixed">
      <div>
        {/* Logo */}
        <div className="mb-8 flex items-center text-2xl font-extrabold text-gray-800">
          Snapsell.<span className="text-purple-700">AI</span>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          <Link to="/create">
            <SidebarItem icon={Plus} label="Create" />
          </Link>

          {/* Dropdown parent */}
          <SidebarItem
            icon={ImageIcon}
            label="AI Banners"
            active={isBannersOpen}
            onClick={toggleBanners}
            isDropdown
          />

          {/* Dropdown links */}
          {isBannersOpen && (
            <div className="ml-6 space-y-1">
              <Link to="/product-ecom-ads">
                <div className="text-sm text-purple-700 bg-[#f1efff] px-3 py-1 rounded cursor-pointer hover:bg-[#e7e4ff]">
                  Product/Ecom Ads
                </div>
              </Link>
              <Link to="/social-ads">
                <div className="text-sm text-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-100">
                  Social Ads
                </div>
              </Link>
              <Link to="/custom-ads">
                <div className="text-sm text-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-100">
                  Custom Ads
                </div>
              </Link>
            </div>
          )}

          {/* Static menu */}
          <Link to="/image-gpt">
            <SidebarItem icon={Wand2} label="Image GPT" />
          </Link>
          <Link to="/ai-tools">
            <SidebarItem icon={LayoutDashboard} label="AI Tools" />
          </Link>
          <Link to="/uploads">
            <SidebarItem icon={Upload} label="Uploads" />
          </Link>
          <Link to="/studio-designs">
            <SidebarItem icon={Palette} label="Your Studio Designs" />
          </Link>
          <Link to="/brand">
            <SidebarItem icon={Settings} label="Brand" />
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-xs text-gray-500 px-3 py-2 cursor-pointer hover:text-gray-700">
        Preferences
      </div>
    </aside>
  );
};

export default StudioSidebar;
