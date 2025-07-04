import React, { useState, useEffect } from 'react';
import { getTemplates } from '../../services/catalogService';

const TemplateSelectionModal = ({ isOpen, onClose, onTemplateSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadTemplates();
    }
  }, [isOpen]);

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
    onTemplateSelect(template);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-8 relative mt-32 mb-16 max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Choose Your Catalog Template
        </h2>

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
                onClick={() => handleTemplateSelect(template)}
              >
                {/* Template Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  {template.img ? (
                    <img
                      src={template.img}
                      alt={`Template ${template.id}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                        <p className="text-sm">Template {template.id}</p>
                      </div>
                    </div>
                  )}
                  {/* Overlay with Choose button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-medium text-lg shadow-lg transform scale-95 group-hover:scale-100">
                      Choose Template
                    </button>
                  </div>
                </div>
                {/* Template Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Template {template.id}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Professional catalog template with modern design
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelectionModal; 