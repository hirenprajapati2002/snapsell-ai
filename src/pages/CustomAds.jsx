import React, { useState } from 'react';
import StudioLayout from '../layouts/StudioLayout';
import { Search, Mic, Plus } from 'lucide-react';

const CustomAds = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Generating custom design with prompt:', prompt);
  };

  return (
    <StudioLayout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white">
        {/* Main Content Container */}
        <div className="w-full max-w-4xl text-center space-y-12">
          
          {/* Greeting */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-normal text-gray-700">
              Hello, <span className="bg-gradient-to-r from-[#6a4bff] to-[#f82cff] bg-clip-text text-transparent font-medium">Hiren</span>
            </h1>
          </div>

          {/* Search/Prompt Interface */}
          <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
                
                {/* Plus Icon */}
                <button
                  type="button"
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>

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
                  {/* Deep Research Button */}
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    <span className="text-sm font-medium">Deep Research</span>
                  </button>

                  {/* Canvas Button */}
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <div className="w-4 h-4 border border-gray-400 rounded"></div>
                    <span className="text-sm font-medium">Canvas</span>
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

            {/* Suggestions */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "Create a social media post",
                "Design a product banner",
                "Make a logo design",
                "Generate an ad creative"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Design</h3>
              <p className="text-gray-600 text-sm">Create stunning designs with advanced AI technology</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Custom Templates</h3>
              <p className="text-gray-600 text-sm">Access thousands of customizable design templates</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">One-Click Export</h3>
              <p className="text-gray-600 text-sm">Export your designs in multiple formats instantly</p>
            </div>
          </div>
        </div>
      </div>
    </StudioLayout>
  );
};


export default CustomAds;
