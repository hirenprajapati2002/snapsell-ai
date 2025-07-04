// src/components/templates/TemplateDetailModal.jsx
import React from 'react';
import { X, Edit3 } from 'lucide-react';

const TemplateDetailModal = ({ template, onClose, onEdit }) => {
  if (!template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Template Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Template Info */}
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Template ID:</span> {template.id}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Name:</span> {template.name || 'Template'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Text:</span> {template.text || 'No text content'}
              </p>
            </div>
          </div>

          {/* Template Image */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Template Preview</h3>
            <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {template.imageUrl ? (
                <img
                  src={template.imageUrl}
                  alt="Template preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <p className="text-sm">No image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onEdit();
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailModal;
