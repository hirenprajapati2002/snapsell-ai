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
  Home,
  FolderOpen,
  Megaphone,
  Share2,
  Calendar,
  TrendingUp,
  Images,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  const [isAIBannerOpen, setIsAIBannerOpen] = useState(false);

  const toggleBanners = () => setIsBannersOpen(!isBannersOpen);
  const toggleAIBanner = () => setIsAIBannerOpen(!isAIBannerOpen);

  return (
    <aside className="w-60 bg-white h-screen border-r px-4 py-6 flex flex-col justify-between fixed">
      <div>
        {/* Logo */}
        <div className="mb-8 flex items-center text-2xl font-extrabold text-gray-800">
          Snapsell.<span className="text-purple-700">AI</span>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {/* Dashboard Home */}
          <Link to="/dashboard">
            <SidebarItem icon={Home} label="Dashboard" />
          </Link>

          {/* AI Banner Dropdown */}
          <SidebarItem
            icon={ImageIcon}
            label="AI Banners"
            active={isAIBannerOpen}
            onClick={toggleAIBanner}
            isDropdown
          />

          {/* AI Banner Dropdown links */}
          {isAIBannerOpen && (
            <div className="ml-6 space-y-1">
              <Link to="/predefined-templates">
                <div className="text-sm text-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-100">
                  Predefined Templates
                </div>
              </Link>
              <Link to="/upload-products">
                <div className="text-sm text-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-100">
                  Custom Generator
                </div>
              </Link>
            </div>
          )}

          {/* My Media */}
          <Link to="/my-media">
            <SidebarItem icon={Images} label="My Media" />
          </Link>

          {/* Catalogs */}
          <Link to="/catalogs">
            <SidebarItem icon={FolderOpen} label="Catalogs" />
          </Link>

          {/* Campaigns */}
          <Link to="/campaigns">
            <SidebarItem icon={Megaphone} label="Campaigns" />
          </Link>

          {/* Shared Content */}
          <Link to="/shared-content">
            <SidebarItem icon={Share2} label="Shared Content" />
          </Link>

          {/* Local Events */}
          <Link to="/local-events">
            <SidebarItem icon={Calendar} label="Local Events (Sync)" />
          </Link>

          {/* Insights */}
          <Link to="/insights">
            <SidebarItem icon={TrendingUp} label="Insights" />
          </Link>

      
          {/* Create Tools Section */}
          {/* <div className="text-xs text-gray-500 uppercase tracking-wide px-3 py-2 font-semibold">
            Create Tools
          </div> */}

          {/* <Link to="/create">
            <SidebarItem icon={Plus} label="Create" />
          </Link> */}

          {/* Dropdown parent
          <SidebarItem
            icon={ImageIcon}
            label="AI Banners"
            active={isBannersOpen}
            onClick={toggleBanners}
            isDropdown
          /> */}

          {/* Dropdown links */}
          {/* {isBannersOpen && (
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
          )} */}

          
        </div>
      </div>
    </aside>
  );
};

export default StudioSidebar;
