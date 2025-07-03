// src/components/product/ProductDetailsStep.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, MicOff, Save, DollarSign, Package, Tag } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

const ProductDetailsStep = ({ productData, onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        name: productData.name || '',
        price: productData.price || '',
        discount: productData.discount || '',
        discountType: productData.discountType || 'percentage',
        stock: productData.stock || '',
        description: productData.description || '',
        category: productData.category || '',
        tags: productData.tags || ''
    });

    const [inputMethod, setInputMethod] = useState('manual'); // 'manual' or 'voice'
    const [isRecording, setIsRecording] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Voice recognition setup
    const recognitionRef = useRef(null);
    const [isVoiceSupported, setIsVoiceSupported] = useState(false);

    useEffect(() => {
        // Check if speech recognition is supported
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setIsVoiceSupported(true);
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (currentField) {
                    setFormData(prev => ({
                        ...prev,
                        [currentField]: transcript
                    }));
                }
                setIsRecording(false);
                setCurrentField('');
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsRecording(false);
                setCurrentField('');
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
                setCurrentField('');
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [currentField]);

    const startVoiceInput = (fieldName) => {
        if (!isVoiceSupported || !recognitionRef.current) {
            alert('Voice recognition is not supported in your browser.');
            return;
        }

        setCurrentField(fieldName);
        setIsRecording(true);
        recognitionRef.current.start();
    };

    const stopVoiceInput = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
        setCurrentField('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'Price is required';
        } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price';
        }

        if (formData.discount && (isNaN(parseFloat(formData.discount)) || parseFloat(formData.discount) < 0)) {
            newErrors.discount = 'Please enter a valid discount';
        }

        if (formData.stock && (isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0)) {
            newErrors.stock = 'Please enter a valid stock quantity';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Error submitting product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const VoiceInputButton = ({ fieldName, className = "" }) => {
        if (!isVoiceSupported) return null;

        const isCurrentlyRecording = isRecording && currentField === fieldName;

        return (
            <button
                type="button"
                onClick={() => isCurrentlyRecording ? stopVoiceInput() : startVoiceInput(fieldName)}
                className={`p-2 rounded-lg transition-colors ${isCurrentlyRecording
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } ${className}`}
                title={isCurrentlyRecording ? 'Stop recording' : 'Start voice input'}
            >
                {isCurrentlyRecording ? (
                    <MicOff className="w-4 h-4" />
                ) : (
                    <Mic className="w-4 h-4" />
                )}
            </button>
        );
    };

    return (
        <div className="space-y-6">
            {/* Input Method Toggle */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>

                {isVoiceSupported && (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Input method:</span>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                type="button"
                                onClick={() => setInputMethod('manual')}
                                className={`px-3 py-1 text-sm rounded-md transition-colors ${inputMethod === 'manual'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Manual
                            </button>
                            <button
                                type="button"
                                onClick={() => setInputMethod('voice')}
                                className={`px-3 py-1 text-sm rounded-md transition-colors ${inputMethod === 'voice'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Voice
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${errors.name ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="Enter product name"
                        />
                        {inputMethod === 'voice' && <VoiceInputButton fieldName="name" />}
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Price and Discount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price *
                        </label>
                        <div className="flex space-x-2">
                            <div className="flex-1 relative">
                                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${errors.price ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="0.00"
                                />
                            </div>
                            {inputMethod === 'voice' && <VoiceInputButton fieldName="price" />}
                        </div>
                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Discount
                        </label>
                        <div className="flex space-x-2">
                            <div className="flex">
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    className={`w-24 px-3 py-3 border border-r-0 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${errors.discount ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="0"
                                />
                                <select
                                    name="discountType"
                                    value={formData.discountType}
                                    onChange={handleInputChange}
                                    className="px-3 py-3 border border-l-0 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                >
                                    <option value="percentage">%</option>
                                    <option value="amount">$</option>
                                </select>
                            </div>
                            {inputMethod === 'voice' && <VoiceInputButton fieldName="discount" />}
                        </div>
                        {errors.discount && <p className="mt-1 text-sm text-red-600">{errors.discount}</p>}
                    </div>
                </div>

                {/* Stock and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stock Quantity
                        </label>
                        <div className="flex space-x-2">
                            <div className="flex-1 relative">
                                <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    min="0"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${errors.stock ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Available quantity"
                                />
                            </div>
                            {inputMethod === 'voice' && <VoiceInputButton fieldName="stock" />}
                        </div>
                        {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <div className="flex space-x-2">
                            <div className="flex-1 relative">
                                <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="e.g. Electronics, Fashion"
                                />
                            </div>
                            {inputMethod === 'voice' && <VoiceInputButton fieldName="category" />}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <div className="flex space-x-2">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                            placeholder="Describe your product features, benefits, and specifications..."
                        />
                        {inputMethod === 'voice' && (
                            <VoiceInputButton fieldName="description" className="self-start" />
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                            placeholder="Enter tags separated by commas (e.g. sale, featured, new)"
                        />
                        {inputMethod === 'voice' && <VoiceInputButton fieldName="tags" />}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Separate multiple tags with commas</p>
                </div>

                {/* Voice Recording Indicator */}
                {isRecording && (
                    <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-red-700 font-medium">
                                Recording for {currentField}... Speak now
                            </span>
                            <button
                                type="button"
                                onClick={stopVoiceInput}
                                className="text-red-600 hover:text-red-800 underline"
                            >
                                Stop
                            </button>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Images
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                Saving Product...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductDetailsStep;
