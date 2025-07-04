import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const StepperForm = ({ steps, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const fileInputRef = useRef(null);
    const [error, setError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e, name) => {
        const { value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleNext = () => {
        setError("");
        if (currentStep < steps.length - 2) {
            setCurrentStep((prev) => prev + 1);
        } else if (currentStep === steps.length - 2) {
            // Last real step, just show processing UI
            setIsProcessing(true);
            setCurrentStep((prev) => prev + 1);
        }
    };

    // Check if current step is valid
    const isStepValid = () => {
        if (currentStep === 0) {
            const storeName = formData.storeName?.trim();
            const storeImage = formData.storeImage;
            return storeName || storeImage;
        }
        if (currentStep === 1) {
            const productName = formData.productName?.trim();
            const productPrice = formData.productPrice?.trim();
            const productImage = formData.productImage;
            // Validate productPrice is a valid number (integer or float)
            const isValidNumber = productPrice && /^\d+(\.\d{0,2})?$/.test(productPrice);
            return productName && isValidNumber && productImage;
        }
        return true;
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    };

    const currentFields = steps[currentStep].fields;

    return (
        <div className="w-full">
            {/* Stepper Header */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-6">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${index === currentStep
                                        ? 'bg-gray-800 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={`ml-2 text-sm ${index === currentStep
                                        ? 'text-gray-800 font-medium'
                                        : 'text-gray-500'
                                    }`}
                            >
                                {step.title}
                            </span>
                            {index < steps.length - 1 && (
                                <div className="w-12 h-px bg-gray-300 mx-4" />
                            )}
                        </div>
                    ))}
                </div>
            </div>


            {/* Step Fields */}
            <div className="grid grid-cols-1 gap-4">
                {currentFields.map((field) => {
                    if (field.type === 'processing') {
                        return (
                            <div key="processing" className="flex flex-col items-center justify-center py-12">
                                <span className="text-lg font-semibold text-gray-700 mb-4">Your Catalog is in Processing....</span>
                                <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        );
                    }
                    if (field.type === 'textarea') {
                        return (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.placeholder}
                                </label>
                                <textarea
                                    name={field.name}
                                    rows={4}
                                    maxLength={field.name === 'description' ? 250 : undefined}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(e, field.name)}
                                />
                                {field.name === 'description' && (
                                    <div className="text-xs text-gray-500 mt-1 text-right">
                                        {formData[field.name]?.length || 0}/250 characters
                                    </div>
                                )}
                            </div>
                        );
                    }

                    if (field.type === 'file') {
                        const file = formData[field.name];
                        const isImage = file && file.type && file.type.startsWith('image/');
                        let imageUrl = '';
                        if (isImage) {
                            imageUrl = URL.createObjectURL(file);
                        }
                        const handleRemoveImage = () => {
                            setFormData({ ...formData, [field.name]: undefined });
                        };
                        return (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.placeholder || 'Upload Image'}
                                </label>
                                {isImage && (
                                    <div className="flex items-center mb-2">
                                        <div className="relative inline-block">
                                            <img
                                                src={imageUrl}
                                                alt="Preview"
                                                className="w-10 h-10 object-cover rounded shadow border bg-white"
                                                onLoad={() => URL.revokeObjectURL(imageUrl)}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-xs text-gray-700 hover:bg-red-100 hover:text-red-600 shadow"
                                                aria-label="Remove image"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition">
                                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-gray-500 text-sm">Click to upload image</p>
                                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                                    <input
                                        type="file"
                                        name={field.name}
                                        accept={field.accept}
                                        onChange={(e) => handleChange(e, field.name)}
                                        className="absolute opacity-0 inset-0 cursor-pointer"
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.placeholder}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                value={formData[field.name] || ''}
                                onChange={(e) => {
                                    if (field.name === 'productPrice') {
                                        // Allow only digits and one dot
                                        const val = e.target.value;
                                        if (val === '' || /^\d*(\.\d{0,2})?$/.test(val)) {
                                            handleChange(e, field.name);
                                        }
                                    } else {
                                        handleChange(e, field.name);
                                    }
                                }}
                            />
                            {/* Show error if productPrice is invalid and user tried to proceed */}
                            {field.name === 'productPrice' && formData[field.name] && !/^\d+(\.\d{0,2})?$/.test(formData[field.name]) && (
                                <div className="text-red-500 text-xs mt-1">Please enter a valid price (numbers only).</div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="step-controls mt-8 flex justify-end">
                {currentStep > 0 && currentStep < steps.length - 1 && (
                    <button
                        onClick={handleBack}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300"
                    >
                        Back
                    </button>
                )}
                {currentStep < steps.length - 1 && (
                    <button
                        onClick={handleNext}
                        disabled={!isStepValid() || isProcessing}
                        className={`px-6 py-2 rounded ${
                            isStepValid() && !isProcessing
                                ? 'bg-black text-white hover:bg-gray-900'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {currentStep === steps.length - 2 ? 'Save' : 'Next'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default StepperForm;
