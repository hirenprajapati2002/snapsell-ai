import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTemplates } from '../services/catalogService';
import StudioLayout from '../layouts/StudioLayout';
import CatalogModal from '../components/catalog/CatalogModal';

const TemplateSelectionPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowCatalogModal(true);
  };

  const handleCatalogModalClose = () => {
    setShowCatalogModal(false);
    setSelectedTemplate(null);
  };

  const handleCatalogSubmit = () => {
    setShowCatalogModal(false);
    setSelectedTemplate(null);
    // Optionally, navigate or show a success message
  };

  return (
    <StudioLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Choose Your Catalog Template</h2>
        <div className="w-full max-w-6xl">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading templates...</span>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No templates available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Template Image */}
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    {template.thumbnail_image ? (
                      <img
                        src={template.thumbnail_image}
                        alt={template.name || `Template ${template.id}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                          <p className="text-sm">{template.name || `Template ${template.id}`}</p>
                        </div>
                      </div>
                    )}
                    {/* Overlay with Choose button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-medium text-lg shadow-lg transform scale-95 group-hover:scale-100"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        Choose Template
                      </button>
                    </div>
                  </div>
                  {/* Template Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {template.name || `Template ${template.id}`}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {template.description || 'Professional catalog template with modern design'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Catalog Modal (Stepper Form) */}
      <CatalogModal
        isOpen={showCatalogModal}
        onClose={handleCatalogModalClose}
        onSubmit={handleCatalogSubmit}
        selectedTemplate={selectedTemplate}
      />
    </StudioLayout>
  );
};

export default TemplateSelectionPage; 