// src/components/product/ImageUploadStep.jsx
import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

const ImageUploadStep = ({ uploadedImages, setUploadedImages, onNext }) => {
    const fileInputRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState('');

    const MAX_IMAGES = 5;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    const validateFile = (file) => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            return 'Please upload only JPEG, PNG, JPG, or WebP images.';
        }
        if (file.size > MAX_FILE_SIZE) {
            return 'File size must be less than 10MB.';
        }
        return null;
    };

    const handleFileSelect = (files) => {
        setError('');
        const fileArray = Array.from(files);

        if (uploadedImages.length + fileArray.length > MAX_IMAGES) {
            setError(`You can only upload up to ${MAX_IMAGES} images.`);
            return;
        }

        const validFiles = [];
        for (const file of fileArray) {
            const error = validateFile(file);
            if (error) {
                setError(error);
                return;
            }
            validFiles.push(file);
        }

        // Convert files to preview objects
        const newImages = validFiles.map(file => ({
            id: Date.now() + Math.random(),
            file,
            preview: URL.createObjectURL(file),
            name: file.name
        }));

        setUploadedImages(prev => [...prev, ...newImages]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        handleFileSelect(files);
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFileSelect(files);
        }
    };

    const removeImage = (imageId) => {
        setUploadedImages(prev => {
            const filtered = prev.filter(img => img.id !== imageId);
            // Clean up object URLs to prevent memory leaks
            const imageToRemove = prev.find(img => img.id === imageId);
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.preview);
            }
            return filtered;
        });
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${dragOver
                    ? 'border-blue-500 bg-blue-50'
                    : uploadedImages.length > 0
                        ? 'border-gray-300 bg-gray-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={(e) => {
                    // Only open file dialog if the click is directly on this div,
                    // not when bubbling up from child elements
                    if (e.target === e.currentTarget || e.target.closest('.upload-area-content')) {
                        openFileDialog();
                    }
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploadedImages.length >= MAX_IMAGES}
                />

                <div className="space-y-4 upload-area-content">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-blue-600" />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Upload Product Images
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Drag and drop your images here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                            Maximum {MAX_IMAGES} images • JPEG, PNG, WebP • Max 10MB each
                        </p>
                    </div>

                    {uploadedImages.length < MAX_IMAGES && (
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                openFileDialog();
                            }}
                        >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Choose Images
                        </button>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Uploaded Images Preview */}
            {uploadedImages.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">
                            Uploaded Images ({uploadedImages.length}/{MAX_IMAGES})
                        </h4>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedImages.map((image, index) => (
                            <div key={image.id} className="relative group">
                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={image.preview}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Primary Image Badge */}
                                {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        Primary
                                    </div>
                                )}

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeImage(image.id)}
                                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                >
                                    <X className="w-3 h-3" />
                                </button>

                                {/* Image Name */}
                                <p className="mt-2 text-sm text-gray-600 truncate" title={image.name}>
                                    {image.name}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-sm text-gray-500">
                        <p>• The first image will be used as the primary product image</p>
                        <p>• You can upload up to {MAX_IMAGES - uploadedImages.length} more images</p>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                    onClick={onNext}
                    disabled={uploadedImages.length === 0}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    Continue to Details
                </button>
            </div>
        </div>
    );
};

export default ImageUploadStep;
