// src/pages/FestivalTemplatesPage.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/common/Footer';
import TemplateCard from '../components/templates/TemplateCard';
import TemplateDetailModal from '../components/templates/TemplateDetailModal';
import TemplateEditModal from '../components/templates/TemplateEditModal';
import { festivalTemplatesData } from '../data/festivalTemplatesData';
import usePrivateRoutes from '../hooks/usePrivateRoutes';

const FestivalTemplatesPage = () => {
  const [templates, setTemplates] = useState(festivalTemplatesData);
  const [filteredTemplates, setFilteredTemplates] = useState(festivalTemplatesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  usePrivateRoutes(); // Protected route

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Featured Festival Templates
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready-to-use templates for upcoming festivals. Customize them to match your brand and boost your sales.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredTemplates.length} of {templates.length} templates
          </p>
        </div>

        {/* Templates Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              viewMode={viewMode}
              onShow={() => handleShowTemplate(template)}
              onEdit={() => handleEditTemplate(template)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No templates found</div>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

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

      <Footer />
    </div>
  );
};

export default FestivalTemplatesPage;
