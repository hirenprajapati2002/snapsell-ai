import React from 'react';
import StepperForm from '../common/StepperForm';

const CatalogModal = ({ isOpen, onClose, onSubmit, selectedTemplate }) => {
  if (!isOpen) return null;

  const handleSubmit = (formData) => {
    // Close the modal when form is successfully submitted
    onClose();
  };

  const steps = [
    {
      title: 'Store Information',
      fields: [
        { name: 'storeName', placeholder: 'Enter store name', type: 'text' },
        { name: 'description', placeholder: 'Enter store description', type: 'textarea' },
        { name: 'storeImage', type: 'file', accept: 'image/*' },
      ],
    },
    {
      title: 'Products',
      fields: [], // Products are handled with custom UI in StepperForm
    },
    {
      title: 'Processing',
      fields: [
        { name: 'processing', type: 'processing' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-8 relative mt-32 mb-16">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>

        {/* Centered Header */}
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          Create Catalog - Template {selectedTemplate?.id || 'Selected'}
        </h2>

        <StepperForm 
          steps={steps} 
          onSubmit={handleSubmit} 
          template_id={selectedTemplate?.id}
        />
      </div>
    </div>
  );
};

export default CatalogModal;
