// src/components/LoadingSpinner.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Eye, Edit3, Star, Calendar, Tag } from 'lucide-react';
import StudioLayout from '../layouts/StudioLayout';
import TemplateDetailModal from '../components/templates/TemplateDetailModal';
import TemplateEditModal from '../components/templates/TemplateEditModal';
import { festivalTemplatesData } from '../data/festivalTemplatesData';

const PredefinedTemplates = () => {
    const [templates, setTemplates] = useState(festivalTemplatesData);
    const [filteredTemplates, setFilteredTemplates] = useState(festivalTemplatesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
  
    // Filter templates based on search and category
    useEffect(() => {
      let filtered = templates;
  
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(template =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(template => template.category === selectedCategory);
      }
  
      setFilteredTemplates(filtered);
    }, [searchTerm, selectedCategory, templates]);
  
    // Get unique categories
    const categories = ['all', ...new Set(templates.map(template => template.category))];
  
    const handleShowTemplate = (template) => {
      setSelectedTemplate(template);
      setShowDetailModal(true);
    };
  
    const handleEditTemplate = (template) => {
      setSelectedTemplate(template);
      setShowEditModal(true);
    };
  
    const handleSaveTemplate = (updatedTemplate) => {
      setTemplates(prev => prev.map(template => 
        template.id === updatedTemplate.id ? updatedTemplate : template
      ));
      setShowEditModal(false);
      setSelectedTemplate(null);
    };
  
    const handleCloseModals = () => {
      setShowDetailModal(false);
      setShowEditModal(false);
      setSelectedTemplate(null);
    };
  
    const TemplateCard = ({ template, viewMode = 'grid' }) => {
      const {
        name,
        category,
        type,
        description,
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
              gradient: 'from-yellow-400 via-orange-500 to-red-500',
              bgImage: 'bg-gradient-to-br from-purple-600 via-yellow-500 to-orange-600',
              textColor: 'text-yellow-100',
              pattern: '🪔✨'
            };
          case 'christmas sale':
            return {
              gradient: 'from-red-500 via-green-500 to-red-600',
              bgImage: 'bg-gradient-to-br from-red-500 via-white to-green-600',
              textColor: 'text-red-100',
              pattern: '🎄❄️'
            };
          case 'new year celebration':
            return {
              gradient: 'from-blue-500 via-purple-500 to-blue-600',
              bgImage: 'bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-700',
              textColor: 'text-blue-100',
              pattern: '🎊🎉'
            };
          case "valentine's day":
            return {
              gradient: 'from-pink-400 via-rose-500 to-red-500',
              bgImage: 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500',
              textColor: 'text-pink-100',
              pattern: '💝❤️'
            };
          case 'holi festival':
            return {
              gradient: 'from-yellow-400 via-pink-500 to-purple-500',
              bgImage: 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600',
              textColor: 'text-yellow-100',
              pattern: '🌈🎨'
            };
          case 'eid mubarak':
            return {
              gradient: 'from-emerald-500 via-yellow-400 to-emerald-600',
              bgImage: 'bg-gradient-to-br from-emerald-500 via-yellow-400 to-emerald-600',
              textColor: 'text-emerald-100',
              pattern: '🌙⭐'
            };
          default:
            return {
              gradient: 'from-purple-500 to-pink-500',
              bgImage: 'bg-gradient-to-br from-purple-500 to-pink-500',
              textColor: 'text-white',
              pattern: '✨🎯'
            };
        }
      };
  
      const templateStyle = getTemplateStyle(name);
  
      if (viewMode === 'list') {
        return (
          <div className="bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <div className={`w-full md:w-48 h-32 ${templateStyle.bgImage} rounded-lg overflow-hidden relative shadow-lg`}>
                  <div className={`w-full h-full flex flex-col items-center justify-center ${templateStyle.textColor} font-bold relative`}>
                    <div className="text-3xl mb-2">{templateStyle.pattern}</div>
                    <div className="text-lg font-bold text-center px-2">{name}</div>
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
                      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                        {type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
  
                    <div className="flex items-center gap-4 text-sm text-gray-500">
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
                      onClick={() => handleShowTemplate(template)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Show
                    </button>
                    <button
                      onClick={() => handleEditTemplate(template)}
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
        <div className="bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 overflow-hidden group">
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
                onClick={() => handleShowTemplate(template)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors transform translate-y-2 group-hover:translate-y-0"
              >
                <Eye className="w-4 h-4" />
                Show
              </button>
              <button
                onClick={() => handleEditTemplate(template)}
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
              <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                {type}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {tags?.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
              {tags?.length > 2 && (
                <span className="text-gray-500 text-xs py-1">+{tags.length - 2} more</span>
              )}
            </div>
  
            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="capitalize">{category}</span>
              <span>{new Date(updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      );
    };
  
    return (
      <StudioLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Predefined Festival Templates
              </h1>
              <p className="text-gray-600">
                Ready-to-use templates for upcoming festivals. Customize them to match your brand and boost your sales.
              </p>
            </div>
  
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
  
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
  
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
  
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredTemplates.length} of {templates.length} templates
              </p>
            </div>
          </div>
  
          {/* Templates Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                viewMode={viewMode}
              />
            ))}
          </div>
  
          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No templates found</div>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
  
          {/* Modals */}
          {showDetailModal && (
            <TemplateDetailModal
              template={selectedTemplate}
              onClose={handleCloseModals}
              onEdit={() => {
                setShowDetailModal(false);
                setShowEditModal(true);
              }}
            />
          )}
  
          {showEditModal && (
            <TemplateEditModal
              template={selectedTemplate}
              onClose={handleCloseModals}
              onSave={handleSaveTemplate}
            />
          )}
        </div>
      </StudioLayout>
    );
  };

export default PredefinedTemplates;
