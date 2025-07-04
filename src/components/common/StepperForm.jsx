import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import Button from './Button';

const StepperForm = ({ steps, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const fileInputRef = useRef(null);

    const handleChange = (e, name) => {
        const { value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            onSubmit(formData);
        }
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
                    if (field.type === 'textarea') {
                        return (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.placeholder}
                                </label>
                                <textarea
                                    name={field.name}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(e, field.name)}
                                />
                            </div>
                        );
                    }

                    if (field.type === 'file') {
                        return (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Store Image
                                </label>
                                <div
                                    className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-gray-500 text-sm">Click to upload store image</p>
                                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name={field.name}
                                        accept={field.accept}
                                        onChange={(e) => handleChange(e, field.name)}
                                        className="absolute opacity-0 inset-0 cursor-pointer"
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
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(e, field.name)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="step-controls mt-8 flex justify-end">
                {currentStep > 0 && (
                    <button
                        onClick={handleBack}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300"
                    >
                        Back
                    </button>
                )}
                <button
                    onClick={handleNext}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
                >
                    {currentStep === steps.length - 1 ? 'Save' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default StepperForm;
