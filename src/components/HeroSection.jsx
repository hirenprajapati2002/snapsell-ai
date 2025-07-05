import React from 'react';
import { Sparkles } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-pink-700 min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <ParticlesBackground />
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Turn Traffic into Sales with
        </h1>

        {/* Gradient Text */}
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            High-Converting Ads & Catalogs
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
          Join <span className="text-yellow-400 font-semibold">1mn+</span> entrepreneurs & marketers to effortlessly create, automate, and scale visuals in seconds.
        </p>

        {/* CTA Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-colors">
            <span>Start Creating</span>
            <Sparkles className="w-5 h-5" />
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg border border-gray-600 transition-colors">
            Explore All Tools
          </button>
        </div> */}

        {/* No Credit Card Text */}
        <p className="text-gray-500 text-sm mb-16">
          No credit card required*
        </p>

        {/* Company Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
          {/* AWS */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-orange-400 font-bold text-xl">aws</div>
            <p className="text-gray-400 text-xs">Gen AI Global Accelerator</p>
          </div>

          {/* Product Hunt */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-orange-500 font-semibold">Product Hunt</span>
            </div>
            <p className="text-gray-400 text-xs">Product of the day & week</p>
          </div>

          {/* Jio GENNEXT */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-blue-400 font-bold text-xl">Jio GENNEXT</div>
            <p className="text-gray-400 text-xs">Market Access Program</p>
          </div>

          {/* NVIDIA */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-green-400 font-bold text-xl">NVIDIA</div>
            <p className="text-gray-400 text-xs">Nvidia inception</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;