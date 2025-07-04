import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';
import { generateCatalogPDF } from '../../services/catalogService';
import { useToast } from '../../contexts/ToastContext';
import { extractSuccessMessage, extractErrorMessage } from '../../utils/messageExtractor';

const StepperForm = ({ steps, onSubmit, template_id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    // For progressive product input reveal
    const [products, setProducts] = useState([
        { id: 1, name: '', price: '', image: null }
    ]);
    const fileInputRef = useRef(null);
    const [error, setError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const { showError } = useToast();
    // Add to StepperForm state:
    const [storeImages, setStoreImages] = useState([]);
    const MAX_STORE_IMAGES = 6;
    const [storeImageError, setStoreImageError] = useState('');

    // Ensure at least one product input is always shown
    useEffect(() => {
        if (currentStep === 1 && products.length === 0) {
            setProducts([{ id: 1, name: '', price: '', image: null }]);
        }
    }, [currentStep, products.length]);

    const handleChange = (e, name) => {
        const { value, files } = e.target;
        if (name === 'storeImage') {
            setStoreImageError('');
            let fileArray = Array.from(files);
            if (fileArray.length + storeImages.length > MAX_STORE_IMAGES) {
                setStoreImageError('Maximum 6 images allowed.');
                fileArray = fileArray.slice(0, MAX_STORE_IMAGES - storeImages.length);
            }
            const newImages = fileArray.map(file => ({
                id: Date.now() + Math.random(),
                file,
                preview: URL.createObjectURL(file),
                name: file.name
            }));
            setStoreImages(prev => [...prev, ...newImages].slice(0, MAX_STORE_IMAGES));
            setFormData({ ...formData, [name]: [...(formData[name] || []), ...fileArray].slice(0, MAX_STORE_IMAGES) });
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value,
            });
        }
    };

    const addProduct = () => {
        if (products.length < 6) {
            setProducts([
                ...products,
                { id: products.length + 1, name: '', price: '', image: null }
            ]);
        }
    };

    const updateProduct = (productId, field, value) => {
        setProducts(products.map(p =>
            p.id === productId ? { ...p, [field]: value } : p
        ));
    };

    const handleProductImageChange = (productId, file) => {
        updateProduct(productId, 'image', file);
    };

    const handleNext = async () => {
        setError("");
        if (currentStep < steps.length - 2) {
            setCurrentStep((prev) => prev + 1);
        } else if (currentStep === steps.length - 2) {
            // Last real step - Save button pressed, call API
            setIsProcessing(true);
            setCurrentStep((prev) => prev + 1);
            
            try {
                // Transform products array to match API structure
                const apiProducts = products.map(product => ({
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: formData.description || '',
                    code: '', // No code field in form
                    // Add store information to first product
                    ...(products.indexOf(product) === 0 && {
                        storeName: formData.storeName,
                        storeDescription: formData.description,
                        storeImage: formData.storeImage,
                    })
                }));
                
                const payload = {
                    products: apiProducts,
                    company_phone: '', // Not collected in form
                    company_website: '', // Not collected in form
                    template_id: template_id, // Add template_id to payload
                };
                
                const response = await generateCatalogPDF(payload);
                
                // Extract success message from backend response
                //const successMessage = extractSuccessMessage(response);
                
                // Success - close modal and navigate
                if (onSubmit) {
                    onSubmit(formData);
                }
                
                // Show success toast first, then navigate after a delay
              //  showSuccess(successMessage);
                
                // Wait 2 seconds for toast to be visible, then navigate
                setTimeout(() => {
                    navigate('/my-catalogs');
                }, 2000);
            } catch (error) {
                console.error('Error generating catalog:', error);
                
                // Extract error message from backend response
                const errorMessage = extractErrorMessage(error);
                
                setError(errorMessage);
                showError(errorMessage);
                // Go back to previous step on error
                setCurrentStep((prev) => prev - 1);
            } finally {
                setIsProcessing(false);
            }
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
            // Check if at least one product is added and valid
            if (products.length === 0) return false;
            
            return products.every(product => {
                const name = product.name?.trim();
                const price = product.price?.trim();
                const image = product.image;
                const isValidNumber = price && /^\d+(\.\d{0,2})?$/.test(price);
                return name && isValidNumber && image;
            });
        }
        return true;
    };

    // Validation for last product filled
    const isLastProductFilled = () => {
        if (products.length === 0) return false;
        const last = products[products.length - 1];
        return last.name.trim() && last.price.trim() && last.image;
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
                                        ? 'bg-[#9333ea] text-white'
                                        : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={`ml-2 text-sm ${index === currentStep
                                        ? 'text-[#9333ea] font-medium'
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
                {/* Error Message Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 1 ? (
                    <div key="products-step" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">Add Products (Max 6)</h3>
                            {products.length < 6 && isLastProductFilled() && (
                                <button
                                    type="button"
                                    onClick={addProduct}
                                    className="px-4 py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700"
                                >
                                    + Add Product
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {products.map((product, index) => (
                                <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <h4 className="font-medium text-gray-800">Product {index + 1}</h4>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Image
                                        </label>
                                        <div className="relative">
                                            {product.image ? (
                                                <div className="relative">
                                                    <img
                                                        src={URL.createObjectURL(product.image)}
                                                        alt="Product preview"
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => updateProduct(product.id, 'image', null)}
                                                        className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 shadow"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 transition-colors">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleProductImageChange(product.id, e.target.files[0])}
                                                        className="hidden"
                                                        id={`product-image-${product.id}`}
                                                    />
                                                    <label htmlFor={`product-image-${product.id}`} className="cursor-pointer">
                                                        <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                        <p className="text-sm text-gray-500">Click to upload image</p>
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            value={product.name}
                                            onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                            placeholder="Enter product name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            value={product.price}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === '' || /^\d*(\.\d{0,2})?$/.test(val)) {
                                                    updateProduct(product.id, 'price', val);
                                                }
                                            }}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                            placeholder="0.00"
                                        />
                                        {product.price && !/^\d+(\.\d{0,2})?$/.test(product.price) && (
                                            <div className="text-red-500 text-xs mt-1">Please enter a valid price</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    currentFields.map((field) => {
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
                                        {field.label || field.placeholder}
                                    </label>
                                    <textarea
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(e, field.name)}
                                        maxLength={field.maxLength}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                        placeholder={field.placeholder}
                                    />
                                    {field.maxLength && (
                                        <div className="text-xs text-gray-400 text-right mt-1">
                                            {formData[field.name]?.length || 0}/{field.maxLength}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        if (field.type === 'file') {
                            if (field.name === 'storeImage') {
                                return (
                                    <div key={field.name}>
                                        {/* Preview row for all images (always at the top) */}
                                        {storeImages.length > 0 && (
                                            <div className="flex flex-wrap gap-3 mb-4">
                                                {storeImages.map(img => (
                                                    <div key={img.id} className="relative inline-block">
                                                        <img
                                                            src={img.preview}
                                                            alt="Preview"
                                                            className="w-20 h-20 object-cover rounded shadow border bg-white"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setStoreImages(prev => prev.filter(i => i.id !== img.id));
                                                                setFormData({ ...formData, storeImage: (formData.storeImage || []).filter(f => f.name !== img.name) });
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-xs text-gray-700 hover:bg-red-100 hover:text-red-600 shadow"
                                                            aria-label="Remove image"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {field.placeholder || 'Upload Image'}
                                        </label>
                                        <div className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition">
                                            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                            <p className="text-gray-500 text-sm">Click to upload image</p>
                                            <p className="text-xs text-gray-400">PNG, JPG up to 10MB. Maximum 6 images allowed.</p>
                                            <input
                                                type="file"
                                                name={field.name}
                                                accept={field.accept}
                                                multiple
                                                onChange={(e) => handleChange(e, field.name)}
                                                className="absolute opacity-0 inset-0 cursor-pointer"
                                                style={{ height: '100%', width: '100%' }}
                                            />
                                        </div>
                                        {storeImageError && (
                                            <div className="text-red-500 text-xs mt-1">{storeImageError}</div>
                                        )}
                                    </div>
                                );
                            }
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
                    })
                )}
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
                                ? 'bg-purple-800 text-white hover:bg-gray-900'
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
