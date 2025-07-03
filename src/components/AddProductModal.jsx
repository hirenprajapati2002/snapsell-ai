// src/components/AddProductModal.jsx
import React, { useState } from 'react';
import { X, Upload, Image, Mic, MicOff } from 'lucide-react';
import ImageUploadStep from './product/ImageUploadStep';
import ProductDetailsStep from './product/ProductDetailsStep';

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        discount: '',
        discountType: 'percentage', // 'percentage' or 'amount'
        stock: '',
        images: []
    });

    const handleNext = () => {
        if (currentStep === 1 && uploadedImages.length > 0) {
            setProductData(prev => ({ ...prev, images: uploadedImages }));
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
        }
    };

    const handleSubmit = async (data) => {
        try {
            const finalProductData = { ...productData, ...data };

            // Call the onSubmit prop if provided
            if (onSubmit) {
                onSubmit(finalProductData);
            } else {
                // Default behavior if no onSubmit is provided
                console.log('Product data:', finalProductData);
            }

            // Reset form and close modal
            setCurrentStep(1);
            setUploadedImages([]);
            setProductData({
                name: '',
                price: '',
                discount: '',
                discountType: 'percentage',
                stock: '',
                images: []
            });
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleClose = () => {
        setCurrentStep(1);
        setUploadedImages([]);
        setProductData({
            name: '',
            price: '',
            discount: '',
            discountType: 'percentage',
            stock: '',
            images: []
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                        <p className="text-gray-600 mt-1">
                            Step {currentStep} of 2: {currentStep === 1 ? 'Upload Images' : 'Product Details'}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-4 bg-gray-50">
                    <div className="flex items-center">
                        <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                                }`}>
                                <Image className="w-4 h-4" />
                            </div>
                            <span className="ml-2 font-medium">Upload Images</span>
                        </div>
                        <div className={`flex-1 h-1 mx-4 rounded ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'
                            }`} />
                        <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                                }`}>
                                <Upload className="w-4 h-4" />
                            </div>
                            <span className="ml-2 font-medium">Product Details</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {currentStep === 1 && (
                        <ImageUploadStep
                            uploadedImages={uploadedImages}
                            setUploadedImages={setUploadedImages}
                            onNext={handleNext}
                        />
                    )}

                    {currentStep === 2 && (
                        <ProductDetailsStep
                            productData={productData}
                            onSubmit={handleSubmit}
                            onBack={handleBack}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
