import React, { useState } from "react";
import {
  ImageIcon,
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
import { Link, useLocation } from "react-router-dom";
import CatalogModal from "../components/catalog/CatalogModal";
 
// Reusable sidebar item
const SidebarItem = ({ icon: Icon, label, active, onClick, isDropdown }) => (
  <div
    onClick={(e) => {
      if (onClick) {
        onClick(e);
      }
    }}
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
  const location = useLocation();
  const [isAIBannerOpen, setIsAIBannerOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false); // ✅ Modal state
 
  // Check if current route is under AI Banners and keep it open
  React.useEffect(() => {
    if (location.pathname === '/custom-ads' || location.pathname === '/predefined-templates') {
      setIsAIBannerOpen(true);
    }
    if (location.pathname === '/catalogs') {
      setIsCatalogOpen(true);
    }
  }, [location.pathname]);
 
  const toggleAIBanner = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAIBannerOpen(!isAIBannerOpen);
  };
 
  const toggleCatalogs = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCatalogOpen(!isCatalogOpen);
  };
 
  const handleCatalogSubmit = (formData) => {
    console.log("Catalog Submitted:", formData);
    // TODO: Call API to save catalog data
    setShowCatalogModal(false);
  };
 
  return (
    <aside className="w-60 bg-white h-[calc(100vh-4rem)] border-r px-4 py-6 flex flex-col justify-between fixed top-16 left-0 z-20">
      <div>
        {/* Logo */}
        {/* <div className="mb-8 flex items-center text-2xl font-extrabold text-gray-800">
          Snapsell.<span className="text-purple-700">AI</span>
        </div> */}
 
        {/* Menu */}
        <div className="space-y-2">
          {/* Dashboard Home */}
          <Link to="/dashboard">
            <SidebarItem
              icon={Home}
              label="Dashboard"
              active={location.pathname === '/dashboard'}
            />
          </Link>
 
          {/* AI Banner Dropdown */}
          <SidebarItem
            icon={ImageIcon}
            label="AI Banners"
            active={isAIBannerOpen || location.pathname === '/custom-ads' || location.pathname === '/predefined-templates'}
            onClick={toggleAIBanner}
            isDropdown
          />
 
          {/* AI Banner Dropdown links */}
          {isAIBannerOpen && (
            <div className="ml-6 space-y-1">
              <Link to="/predefined-templates">
                <div className={`text-sm px-3 py-1 rounded cursor-pointer ${
                  location.pathname === '/predefined-templates'
                    ? 'text-purple-700 bg-[#f1efff] hover:bg-[#e7e4ff]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  Predefined Templates
                </div>
              </Link>
              <Link to="/custom-ads">
                <div className={`text-sm px-3 py-1 rounded cursor-pointer ${
                  location.pathname === '/custom-ads'
                    ? 'text-purple-700 bg-[#f1efff] hover:bg-[#e7e4ff]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  Custom Generator
                </div>
              </Link>
            </div>
          )}
 
          {/* My Media */}
          <Link to="/my-media">
            <SidebarItem
              icon={Images}
              label="My Media"
              active={location.pathname === '/my-media'}
            />
          </Link>
 
          {/* Catalogs Section */}
          {/* <Link to="/catalogs">
            <SidebarItem icon={FolderOpen} label="Catalogs" />
          </Link> */}
 
          <SidebarItem
            icon={FolderOpen}
            label="Catalogs"
            active={isCatalogOpen || location.pathname === '/catalogs' || showCatalogModal}
            onClick={toggleCatalogs}
            isDropdown
          />
 
          {/* Catalog Dropdown */}
          {isCatalogOpen && (
            <div className="ml-6 space-y-1">
              {/* ✅ Create Catalog opens modal */}
              <div
                className="text-sm text-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowCatalogModal(true);
                }}
              >
                Create Catalog
              </div>
 
              {/* ✅ My Catalogs links to the catalog page */}
              <Link to="/catalogs">
                <div className={`text-sm px-3 py-1 rounded cursor-pointer ${
                  location.pathname === '/catalogs'
                    ? 'text-purple-700 bg-[#f1efff] hover:bg-[#e7e4ff]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  My Catalogs
                </div>
              </Link>
            </div>
          )}
 
          {/* ✅ Catalog Modal Popup */}
          <CatalogModal
            isOpen={showCatalogModal}
            onClose={() => setShowCatalogModal(false)}
            onSubmit={handleCatalogSubmit}
          />
 
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
 
 
         
 
 
 
        </div>
      </div>
    </aside>
  );
};
 
export default StudioSidebar;