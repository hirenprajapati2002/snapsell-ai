// src/components/templates/TemplateCard.jsx
import React from 'react';
import { Eye, Edit3, Star, Calendar, Tag } from 'lucide-react';

const TemplateCard = ({ template, viewMode = 'grid', onShow, onEdit }) => {
  const {
    name,
    category,
    type,
    description,
    thumbnail,
    promotionalText,
    tags,
    isTrending,
    updatedAt
  } = template;

  // Template-specific styling and images
  const getTemplateStyle = (templateName) => {
    switch (templateName.toLowerCase()) {
      case 'diwali special':
        return {
          bgImage: 'bg-gradient-to-br from-purple-600 via-yellow-500 to-orange-600',
          textColor: 'text-yellow-100',
          pattern: '🪔✨'
        };
      case 'christmas sale':
        return {
          bgImage: 'bg-gradient-to-br from-red-500 via-white to-green-600',
          textColor: 'text-red-100',
          pattern: '🎄❄️'
        };
      case 'new year celebration':
        return {
          bgImage: 'bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-700',
          textColor: 'text-blue-100',
          pattern: '🎊🎉'
        };
      case "valentine's day":
        return {
          bgImage: 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500',
          textColor: 'text-pink-100',
          pattern: '💝❤️'
        };
      case 'holi festival':
        return {
          bgImage: 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600',
          textColor: 'text-yellow-100',
          pattern: '🌈🎨'
        };
      case 'eid mubarak':
        return {
          bgImage: 'bg-gradient-to-br from-emerald-500 via-yellow-400 to-emerald-600',
          textColor: 'text-emerald-100',
          pattern: '🌙⭐'
        };
      default:
        return {
          bgImage: 'bg-gradient-to-br from-purple-500 to-pink-500',
          textColor: 'text-white',
          pattern: '✨🎯'
        };
    }
  };

  const templateStyle = getTemplateStyle(name);

  if (viewMode === 'list') {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnail */}            <div className="flex-shrink-0">
              <div className={`w-full md:w-48 h-32 ${templateStyle.bgImage} rounded-lg overflow-hidden relative shadow-lg`}>
                <div className={`w-full h-full flex flex-col items-center justify-center ${templateStyle.textColor} font-bold relative`}>
                  <div className="text-3xl mb-2">{templateStyle.pattern}</div>
                  <div className="text-sm font-bold text-center px-2">{name}</div>
                  {promotionalText?.discount && (
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                      {promotionalText.discount}
                    </div>
                  )}
                </div>
                {isTrending && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Trending
                  </div>
                )}
              </div>
            </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {type}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-3 line-clamp-2">{description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags?.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Updated {new Date(updatedAt).toLocaleDateString()}
                  </span>
                  <span className="capitalize">{category}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={onShow}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Show
                </button>
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className={`relative h-48 ${templateStyle.bgImage} overflow-hidden shadow-lg`}>
        <div className={`w-full h-full flex flex-col items-center justify-center ${templateStyle.textColor} font-bold relative`}>
          <div className="text-4xl mb-2">{templateStyle.pattern}</div>
          <div className="text-lg font-bold text-center px-2">{name}</div>
          {promotionalText?.discount && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
              {promotionalText.discount}
            </div>
          )}
        </div>
        
        {/* Trending Badge */}
        {isTrending && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3" />
            Trending
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={onShow}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-4 h-4" />
            Show
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors transform translate-y-2 group-hover:translate-y-0"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white truncate">{name}</h3>
          <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
            {type}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags?.slice(0, 2).map((tag, index) => (
            <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
          {tags?.length > 2 && (
            <span className="text-gray-400 text-xs py-1">+{tags.length - 2} more</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="capitalize">{category}</span>
          <span>{new Date(updatedAt).toLocaleDateString()}</span>
        </div>          {/* Promotional Text Preview */}
          {promotionalText?.discount && (
            <div className="mt-3 p-2 bg-gray-50 rounded text-center">
              <span className="text-green-600 font-semibold text-sm">{promotionalText.discount}</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default TemplateCard;
