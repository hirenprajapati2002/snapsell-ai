// src/components/common/AI-banners/PredefinedTemplatesSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, ArrowRight } from 'lucide-react';

const PredefinedTemplatesSection = () => {
  const navigate = useNavigate();

  const featuredTemplates = [
    {
      id: 'diwali-special',
      name: 'Diwali Special',
      category: 'Festival',
      discount: '50% OFF',
      isTrending: true,
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      bgImage: 'bg-gradient-to-br from-purple-600 via-yellow-500 to-orange-600',
      textColor: 'text-yellow-100',
      pattern: '🪔✨'
    },
    {
      id: 'christmas-sale',
      name: 'Christmas Sale',
      category: 'Holiday',
      discount: '15% OFF',
      isTrending: true,
      gradient: 'from-red-500 via-green-500 to-red-600',
      bgImage: 'bg-gradient-to-br from-red-500 via-white to-green-600',
      textColor: 'text-red-100',
      pattern: '🎄❄️'
    },
    {
      id: 'new-year',
      name: 'New Year Celebration',
      category: 'Festival',
      discount: 'Special Price',
      isTrending: true,
      gradient: 'from-blue-500 via-purple-500 to-blue-600',
      bgImage: 'bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-700',
      textColor: 'text-blue-100',
      pattern: '🎊🎉'
    },
    {
      id: 'valentine',
      name: "Valentine's Day",
      category: 'Holiday',
      discount: 'Buy 1 Get 1',
      isTrending: false,
      gradient: 'from-pink-400 via-rose-500 to-red-500',
      bgImage: 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500',
      textColor: 'text-pink-100',
      pattern: '💝❤️'
    }
  ];

  const handleViewAllTemplates = () => {
    navigate('/festival-templates');
  };

  const handleUseTemplate = (templateId) => {
    // Navigate to create page with template pre-selected
    navigate(`/create?template=${templateId}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-12 rounded-3xl shadow-lg w-full font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Festival Templates
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ready-to-use templates for upcoming festivals. Customize them to match your brand and boost your sales.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Template Preview */}
              <div className={`h-40 ${template.bgImage} relative overflow-hidden shadow-lg`}>
                <div className={`absolute inset-0 flex flex-col items-center justify-center ${template.textColor} font-bold`}>
                  <div className="text-3xl mb-2">{template.pattern}</div>
                  <div className="text-sm font-bold text-center px-2">{template.name}</div>
                </div>
                
                {/* Trending Badge */}
                {template.isTrending && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Trending
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                  {template.discount}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    Use Template
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 truncate">{template.name}</h3>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                    {template.category}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Ready to use</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={handleViewAllTemplates}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            View All Templates
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Festival Templates</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-green-600 mb-2">1-Click</div>
            <div className="text-gray-600">Customization</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">Mobile Ready</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredefinedTemplatesSection;
