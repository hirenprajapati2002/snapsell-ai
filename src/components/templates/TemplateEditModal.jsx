// src/components/templates/TemplateEditModal.jsx
import React, { useState } from 'react';
import { X, Save, Upload, Palette, Type, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

const TemplateEditModal = ({ template, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    category: template?.category || 'festival',
    type: template?.type || '',
    promotionalText: {
      title: template?.promotionalText?.title || '',
      subtitle: template?.promotionalText?.subtitle || '',
      description: template?.promotionalText?.description || '',
      callToAction: template?.promotionalText?.callToAction || '',
      discount: template?.promotionalText?.discount || '',
      validUntil: template?.promotionalText?.validUntil || ''
    },
    designElements: {
      primaryColor: template?.designElements?.primaryColor || '#9333EA',
      secondaryColor: template?.designElements?.secondaryColor || '#EC4899',
      backgroundColor: template?.designElements?.backgroundColor || '#1F2937',
      fontFamily: template?.designElements?.fontFamily || 'Inter',
      fontSize: {
        title: template?.designElements?.fontSize?.title || '2.5rem',
        subtitle: template?.designElements?.fontSize?.subtitle || '1.5rem',
        body: template?.designElements?.fontSize?.body || '1rem'
      }
    },
    tags: template?.tags || [],
    images: template?.images || []
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [newTag, setNewTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const categories = ['festival', 'holiday', 'seasonal', 'promotional', 'special'];
  const fontFamilies = ['Inter', 'Roboto', 'Poppins', 'Playfair Display', 'Nunito', 'Amiri'];

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (imageToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove)
    }));
  };

  const handleSave = () => {
    const updatedTemplate = {
      ...template,
      ...formData,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onSave(updatedTemplate);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Type },
    { id: 'content', label: 'Content', icon: Type },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'images', label: 'Images', icon: ImageIcon }
  ];

  if (!template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Template</h2>
            <p className="text-gray-400 mt-1">Customize your template content and design</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(95vh-200px)] overflow-y-auto">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Template Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange(null, 'name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter template name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange(null, 'category', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-gray-700">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => handleInputChange(null, 'type', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Holiday Promotion, Seasonal Sale"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange(null, 'description', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your template..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add a tag..."
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:bg-purple-700 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.promotionalText.title}
                    onChange={(e) => handleInputChange('promotionalText', 'title', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Main title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.promotionalText.subtitle}
                    onChange={(e) => handleInputChange('promotionalText', 'subtitle', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Discount</label>
                  <input
                    type="text"
                    value={formData.promotionalText.discount}
                    onChange={(e) => handleInputChange('promotionalText', 'discount', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 50% OFF, Buy 1 Get 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Call to Action</label>
                  <input
                    type="text"
                    value={formData.promotionalText.callToAction}
                    onChange={(e) => handleInputChange('promotionalText', 'callToAction', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Shop Now, Learn More"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Valid Until</label>
                  <input
                    type="text"
                    value={formData.promotionalText.validUntil}
                    onChange={(e) => handleInputChange('promotionalText', 'validUntil', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Limited Time, Dec 31st"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.promotionalText.description}
                  onChange={(e) => handleInputChange('promotionalText', 'description', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Promotional description..."
                />
              </div>
            </div>
          )}

          {/* Design Tab */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.designElements.primaryColor}
                      onChange={(e) => handleInputChange('designElements', 'primaryColor', e.target.value)}
                      className="w-16 h-12 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.designElements.primaryColor}
                      onChange={(e) => handleInputChange('designElements', 'primaryColor', e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.designElements.secondaryColor}
                      onChange={(e) => handleInputChange('designElements', 'secondaryColor', e.target.value)}
                      className="w-16 h-12 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.designElements.secondaryColor}
                      onChange={(e) => handleInputChange('designElements', 'secondaryColor', e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.designElements.backgroundColor}
                      onChange={(e) => handleInputChange('designElements', 'backgroundColor', e.target.value)}
                      className="w-16 h-12 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.designElements.backgroundColor}
                      onChange={(e) => handleInputChange('designElements', 'backgroundColor', e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
                <select
                  value={formData.designElements.fontFamily}
                  onChange={(e) => handleInputChange('designElements', 'fontFamily', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {fontFamilies.map(font => (
                    <option key={font} value={font} className="bg-gray-700">
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">Font Sizes</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Title Size</label>
                    <input
                      type="text"
                      value={formData.designElements.fontSize.title}
                      onChange={(e) => handleNestedInputChange('designElements', 'fontSize', 'title', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., 2.5rem"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Subtitle Size</label>
                    <input
                      type="text"
                      value={formData.designElements.fontSize.subtitle}
                      onChange={(e) => handleNestedInputChange('designElements', 'fontSize', 'subtitle', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., 1.5rem"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Body Size</label>
                    <input
                      type="text"
                      value={formData.designElements.fontSize.body}
                      onChange={(e) => handleNestedInputChange('designElements', 'fontSize', 'body', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., 1rem"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Add New Image</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Image URL or path..."
                  />
                  <button
                    onClick={handleAddImage}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">Current Images</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">Image {index + 1}</span>
                        <button
                          onClick={() => handleRemoveImage(image)}
                          className="p-2 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-2 flex items-center justify-center text-white font-semibold">
                        Preview {index + 1}
                      </div>
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => {
                          const updatedImages = [...formData.images];
                          updatedImages[index] = e.target.value;
                          setFormData(prev => ({ ...prev, images: updatedImages }));
                        }}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  ))}
                </div>

                {formData.images.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No images added yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEditModal;
