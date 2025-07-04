import React from 'react';
import StepperForm from '../common/StepperForm';

const CatalogModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

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
      fields: [
        { name: 'productName', placeholder: 'Enter product name', type: 'text' },
        { name: 'productPrice', placeholder: 'Enter product price', type: 'text' },
        { name: 'productImage', type: 'file', accept: 'image/*' },
      ],
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
          Create Catalog
        </h2>

        <StepperForm steps={steps} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CatalogModal;
