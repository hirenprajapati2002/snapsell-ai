// src/components/templates/TemplateDetailModal.jsx
import React, { useState } from 'react';
import { X, Edit3, Download, Share, Star, Calendar, Tag, Palette, Type, Image as ImageIcon } from 'lucide-react';

const TemplateDetailModal = ({ template, onClose, onEdit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!template) return null;

  const {
    name,
    category,
    type,
    description,
    images,
    promotionalText,
    designElements,
    tags,
    isTrending,
    createdAt,
    updatedAt
  } = template;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            {isTrending && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4" />
                Trending
              </span>
            )}
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {type}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit Template
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Share className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(95vh-120px)]">
          {/* Left Panel - Images */}
          <div className="lg:w-1/2 p-6 border-r border-gray-700">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                  {name.charAt(0)}
                </div>
                {images && images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images && images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-purple-400' : 'border-transparent'
                      } hover:border-purple-300 transition-colors`}
                    >
                      <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                        {index + 1}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="lg:w-1/2 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Template Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white capitalize">{category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{new Date(createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Updated:</span>
                    <span className="text-white">{new Date(updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-300 mt-3">{description}</p>
              </div>

              {/* Promotional Text */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Promotional Content
                </h3>
                <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-gray-400 text-sm">Title:</label>
                    <p className="text-white font-semibold">{promotionalText?.title}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Subtitle:</label>
                    <p className="text-white">{promotionalText?.subtitle}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Description:</label>
                    <p className="text-gray-300">{promotionalText?.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm">Discount:</label>
                      <p className="text-green-400 font-semibold">{promotionalText?.discount}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Call to Action:</label>
                      <p className="text-blue-400 font-semibold">{promotionalText?.callToAction}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Valid Until:</label>
                    <p className="text-yellow-400">{promotionalText?.validUntil}</p>
                  </div>
                </div>
              </div>

              {/* Design Elements */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Design Elements
                </h3>
                <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm">Primary Color:</label>
                      <div className="flex items-center gap-2 mt-1">
                        <div 
                          className="w-6 h-6 rounded border border-gray-600"
                          style={{ backgroundColor: designElements?.primaryColor }}
                        ></div>
                        <span className="text-white text-sm">{designElements?.primaryColor}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Secondary Color:</label>
                      <div className="flex items-center gap-2 mt-1">
                        <div 
                          className="w-6 h-6 rounded border border-gray-600"
                          style={{ backgroundColor: designElements?.secondaryColor }}
                        ></div>
                        <span className="text-white text-sm">{designElements?.secondaryColor}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Background Color:</label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-6 h-6 rounded border border-gray-600"
                        style={{ backgroundColor: designElements?.backgroundColor }}
                      ></div>
                      <span className="text-white text-sm">{designElements?.backgroundColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Font Family:</label>
                    <p className="text-white">{designElements?.fontFamily}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags?.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailModal;
