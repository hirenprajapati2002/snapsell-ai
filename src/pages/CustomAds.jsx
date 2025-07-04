import React, { useState } from 'react';
import StudioLayout from '../layouts/StudioLayout';
import { Mic, Plus, Wand2, Upload, Loader2, X, Download } from 'lucide-react';
import { generateImage } from '../services/imageGenerationService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import usePrivateRoutes from '../hooks/usePrivateRoutes';

const CustomAds = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  usePrivateRoutes(); // Protected route

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImage(null);

    try {
      const result = await generateImage(prompt, selectedImage);
      setGeneratedImage(result);
      setShowImageModal(true); // Show modal when image is generated
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
  };

  const handleDownload = async () => {
    try {
      const imageUrl = generatedImage.url || generatedImage.image_url;
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.style.display = 'none';
      
      // Try to fetch the image as blob first (better for cross-origin)
      try {
        const response = await fetch(imageUrl, {
          method: 'GET',
          mode: 'cors',
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          
          link.href = blobUrl;
          link.download = `snapsell-generated-${Date.now()}.png`;
          
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
          }, 100);
          
          return;
        }
      } catch (fetchError) {
        console.log('Fetch failed, trying direct download:', fetchError);
      }
      
      // Fallback: Direct download link
      link.href = imageUrl;
      link.download = `snapsell-generated-${Date.now()}.png`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try right-clicking the image and selecting "Save image as..."');
    }
  };

  const closeModal = () => {
    setShowImageModal(false);
    setGeneratedImage(null);
  };

  return (
    <StudioLayout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white">
        {/* Main Content Container */}
        <div className="w-full max-w-4xl text-center space-y-12">
          
          {/* Greeting */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-normal text-gray-700">
              Hello, <span className="bg-gradient-to-r from-[#6a4bff] to-[#f82cff] bg-clip-text text-transparent font-medium">
                {user?.name || user?.email?.split('@')[0] || 'User'}
              </span>
            </h1>
          </div>

          {/* Search/Prompt Interface */}
          <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
                
                {/* Upload Icon */}
                <label className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Input Field */}
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the custom design you want to create..."
                  className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-lg"
                />

                {/* Right Side Icons */}
                <div className="flex items-center space-x-2">
                  {/* Generate Button */}
                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[#6a4bff] to-[#f82cff] text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isGenerating ? 'Generating...' : 'Generate'}
                    </span>
                  </button>

                  {/* Mic Button */}
                  <button
                    type="button"
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mt-4 flex items-center justify-center">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="h-20 w-20 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={clearSelectedImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <span className="ml-3 text-sm text-gray-600">{selectedImage.name}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                {error}
              </div>
            )}
          </div>

          {/* Loading State */}
          {isGenerating && (
            <div className="w-full max-w-4xl mx-auto mt-12">
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <LoadingSpinner />
                <p className="mt-4 text-gray-600">Creating your amazing design...</p>
                <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
              </div>
            </div>
          )}

          {/* Generated Image Modal */}
          {showImageModal && generatedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-[800px] h-[700px] flex flex-col relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
                  <h2 className="text-2xl font-semibold text-gray-800">Generated Image</h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
                
                {/* Modal Body */}
                <div className="flex-1 p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={generatedImage.url || generatedImage.image_url}
                    alt="Generated"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                </div>
                
                {/* Modal Footer */}
                <div className="flex justify-center space-x-4 p-6 border-t border-gray-200 flex-shrink-0">
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          {!generatedImage && !isGenerating && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wand2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Image Generation</h3>
                <p className="text-gray-600 text-sm">Create stunning images from text descriptions using advanced AI</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Image-to-Image</h3>
                <p className="text-gray-600 text-sm">Upload an image and transform it based on your prompt</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-green-600 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">High Quality Output</h3>
                <p className="text-gray-600 text-sm">Generate high-resolution images perfect for any use case</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudioLayout>
  );
};


export default CustomAds;
