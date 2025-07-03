// src/components/AdCategoryLayout.jsx
import React from "react";

const AdCategoryLayout = ({ banner, title, description, buttonText }) => {
  return (
    <div className="p-6">
      {/* Banner Section */}
      <div className="bg-[#f9f5ff] rounded-xl p-6 flex justify-between items-center mb-10">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-gray-800">
            {title}
          </h2>
          <p className="mt-2 text-gray-600">
            {description}
          </p>
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
            {buttonText}
          </button>
        </div>
        <div>
          <img src={banner} alt="Banner" className="w-[500px]" />
        </div>
      </div>

      {/* Common Content Section */}
      <div className="bg-[#f9f9f9] p-10 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Get started for free</h3>
        <p className="text-gray-500">
          Experience the power of AI to create creatives, social media content with Snapsell.AI
        </p>
        <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
          Start Creating Now
        </button>
      </div>
    </div>
  );
};

export default AdCategoryLayout;
