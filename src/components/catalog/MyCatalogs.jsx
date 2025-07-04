import React, { useState } from 'react';
import { Check } from 'lucide-react';
import img7 from '../../assets/images/bgRemover3.jpg';
import img8 from '../../assets/images/bgRemover3.webp';
import img9 from '../../assets/images/imageExtender.webp';
import img10 from '../../assets/images/photoShot.webp';
import img11 from '../../assets/images/replaceBg.webp';
import img12 from '../../assets/images/restorer.webp';
import img13 from '../../assets/images/socialMediaGraphic.webp';
import img14 from '../../assets/images/Long.jpg';
import './MyCatalogs.css';
import Button from '../common/Button';
import { Download as DownloadIcon, Share2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const images = [
    // img1,
    // img2,
    // img3,
    // img4,
    // img5,
    // img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14        
];

const catalogs = [
  {
    id: 1,
    title: 'Electronics Catalog',
    // products: 45,
    // updated: '2 days ago',
  },
  {
    id: 2,
    title: 'Fashion Collection',
    // products: 31,
    // updated: '1 week ago',
  },
  {
    id: 3,
    title: 'Home & Garden',
    // products: 28,
    // updated: '2 days ago',
  },
  {
    id: 4,
    title: 'Sports Equipment',
    // products: 21,
    // updated: '5 days ago',
  },
  {
    id: 5,
    title: 'Kitchen Appliances',
    // products: 37,
    // updated: '1 day ago',
  },
  {
    id: 6,
    title: 'Books & Media',
    // products: 29,
    // updated: '6 days ago',
  },
];

const MyCatalogs = () => {
  const [primaryId, setPrimaryId] = useState(null);
  const location = useLocation();
  return (
    <div className="p-6">
      <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6">Your Catalogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {catalogs.map((cat, idx) => {
          const isPrimary = primaryId === cat.id;
          const cardContent = (
            <div
              className={`bg-white/70 rounded-xl shadow-sm border-2 transition-shadow transition-transform duration-300 cursor-pointer flex flex-col min-h-[180px] relative group ${isPrimary ? 'border-transparent scale-105 shadow-2xl' : 'border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:scale-105'} z-10`}
            >
              {/* Checkmark icon if primary, with animation and glow */}
              {isPrimary && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                  <div className="bg-white rounded-full border-2 border-purple-600 p-2 shadow-lg ring-4 ring-purple-300/40
                    transition-all duration-300 ease-out
                    scale-100 opacity-100 animate-bounce"
                  >
                    <Check className="w-7 h-7 text-purple-600 drop-shadow" />
                  </div>
                </div>
              )}
              {/* Image */}
              <div className="bg-gray-900 rounded-t-xl h-32 flex items-center justify-center relative overflow-hidden">
                <img
                  src={images[idx % images.length]}
                  alt={cat.title}
                  className="h-full w-full object-cover rounded-t-xl"
                />
              </div>
              {/* Footer title */}
              <div className="py-3 text-center text-gray-900 font-medium bg-white rounded-b-xl z-10 relative">
                {cat.title}
              </div>
              {/* Hover Buttons with Animation and Blur (z-20, sibling of footer) */}
              <div className="absolute left-0 right-0 bottom-0 h-12 flex justify-center items-center gap-2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-b-xl shadow-md">
                <button
                  className="relative z-10 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs font-medium shadow
                    -translate-x-10 group-hover:translate-x-0
                    transition-all duration-300 ease-out pointer-events-auto"
                  style={{ transitionProperty: 'opacity, transform' }}
                  onClick={() => setPrimaryId(cat.id)}
                >
                  Set as Primary
                </button>
                <button
                  className="relative z-10 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-xs font-medium shadow
                    translate-x-10 group-hover:translate-x-0
                    transition-all duration-300 ease-out pointer-events-auto"
                  style={{ transitionProperty: 'opacity, transform' }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
          return isPrimary ? (
            <div key={cat.id} className="p-[0.2rem] bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 rounded-2xl animate-gradient-spin w-full h-full relative">
              <div className="bg-white rounded-xl shadow-lg w-full h-full flex flex-col min-h-[180px] relative group">
                {/* Checkmark icon if primary, with animation and glow */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                  <div className="bg-white rounded-full border-2 border-purple-600 p-2 shadow-2xl ring-4 ring-purple-300/40
                    transition-all duration-300 ease-out
                    scale-100 opacity-100 animate-bounce"
                  >
                    <Check className="w-7 h-7 text-purple-600 drop-shadow" />
                  </div>
                </div>
                {/* Image */}
                <div className="bg-gray-900 rounded-t-xl h-32 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={images[idx % images.length]}
                    alt={cat.title}
                    className="h-full w-full object-cover rounded-t-xl"
                  />
                </div>
                {/* Footer title */}
                <div className="py-3 text-center text-gray-900 font-medium bg-white rounded-b-xl z-10 relative">
                  {cat.title}
                </div>
                {/* Hover Buttons with Animation and Blur (z-20, sibling of footer) */}
                <div className="absolute left-0 right-0 bottom-0 h-12 flex justify-center items-center gap-2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-b-xl shadow-md">
                  <button
                    className="relative z-10 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs font-medium shadow
                      -translate-x-10 group-hover:translate-x-0
                      transition-all duration-300 ease-out pointer-events-auto"
                    style={{ transitionProperty: 'opacity, transform' }}
                    onClick={() => setPrimaryId(cat.id)}
                  >
                    Set as Primary
                  </button>
                  <button
                    className="relative z-10 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-xs font-medium shadow
                      translate-x-10 group-hover:translate-x-0
                      transition-all duration-300 ease-out pointer-events-auto"
                    style={{ transitionProperty: 'opacity, transform' }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div key={cat.id}>{cardContent}</div>
          );
        })}
      </div>

      <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6">Your Catalog QR Code</h2>
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center w-full max-w-md">
          <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400 mb-4">
            QR Code
          </div>
          <div className="text-gray-800 font-medium mb-1">Catalog QR Code</div>
          <div className="text-gray-500 text-sm mb-4">Scan to view all catalogs</div>
          <div className="flex flex-row gap-3 w-full justify-center">
            <Button
              variant="primary"
              className="bg-[#181c29] text-white rounded-full font-bold flex items-center px-6 py-2 text-base shadow-none hover:bg-[#10121a]"
            >
              <DownloadIcon className="w-5 h-5 mr-2" />
              Download
            </Button>
            <Button
              variant="secondary"
              className="bg-white text-[#181c29] border border-[#e5e7eb] rounded-full font-bold flex items-center px-6 py-2 text-base shadow-none hover:bg-gray-100"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCatalogs; 