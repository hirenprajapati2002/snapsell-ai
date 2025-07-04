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
import CatalogModal from "../components/catalog/CatalogModal";

// Reusable sidebar item
// eslint-disable-next-line no-unused-vars
const SidebarItem = ({ icon: Icon, label, active, beta, onClick, isDropdown,isCatalogOpen }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 text-sm font-medium ${active ? "bg-[#f1efff] text-purple-700" : "text-gray-700"
      }`}
  >
    <div className="flex items-center">
      <Icon className="w-4 h-4 mr-2" />
      <span>{label}</span>
    </div>
    {(isDropdown || isCatalogOpen) && (
      <span className="ml-2">{active ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
    )}
  </div>
);

const StudioSidebar = () => {
  const [isBannersOpen, setIsBannersOpen] = useState(true);
  const [isAIBannerOpen, setIsAIBannerOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(true);
  const [showCatalogModal, setShowCatalogModal] = useState(false); // ✅ Modal state

  const toggleBanners = () => setIsBannersOpen(!isBannersOpen);
  const toggleAIBanner = () => setIsAIBannerOpen(!isAIBannerOpen);
  const toggleCatalogs = () => setIsCatalogOpen(!isCatalogOpen);

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
              <Link to="/custom-ads">
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

          {/* Catalogs Section */}
          {/* <Link to="/catalogs">
            <SidebarItem icon={FolderOpen} label="Catalogs" />
          </Link> */}

          <SidebarItem
            icon={FolderOpen}
            label="Catalogs"
            active={isCatalogOpen}
            onClick={toggleCatalogs}
            isCatalogOpen
          />

          {/* Catalog Dropdown */}
          {isCatalogOpen && (
            <div className="ml-6 space-y-1">
              {/* ✅ Create Catalog opens modal */}
              <div
                className="text-sm text-purple-700 bg-[#f1efff] px-3 py-1 rounded cursor-pointer hover:bg-[#e7e4ff]"
                onClick={() => setShowCatalogModal(true)}
              >
                Create Catalog
              </div>

              {/* ✅ My Catalogs links to the catalog page */}
              <Link to="/catalogs">
                <div className="text-sm text-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-100">
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
