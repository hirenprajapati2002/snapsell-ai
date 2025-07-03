import React from "react";

const AdFooterSection = () => {
  return (
    <div className="bg-[#f8f8f8] py-16 px-6 mt-6 rounded-2xl shadow border text-center flex flex-col items-center justify-center font-inter">
      <h2 className="text-[24px] font-semibold text-black mb-2">
        Get started for free
      </h2>
      <p className="text-[#666] text-[16px] mb-6 max-w-[500px]">
        Experience the power of AI to Create creatives, social media content with Snapsell.AI
      </p>
      <button className="bg-[#7927ff] hover:bg-[#6221cc] text-white px-6 py-2 rounded-xl text-[16px] font-medium shadow transition">
        Start Creating Now
      </button>
    </div>
  );
};

export default AdFooterSection;
