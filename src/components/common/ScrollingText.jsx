// src/components/common/ScrollingText.jsx
import React from 'react';

const ScrollingText = () => {
  const items = [
    "Google Ads",
    "Meta Ads",
    "Banners",
    "Product Visuals",
    "Google Ads", // Repeating for smooth loop
    "Meta Ads",
    "Banners",
    "Product Visuals"
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-gray-600 py-2">
      <div className="animate-marquee inline-block">
        {items.map((text, index) => (
          <span
            key={index}
            className="text-xl text-white mx-6 inline-block font-semibold"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingText;
