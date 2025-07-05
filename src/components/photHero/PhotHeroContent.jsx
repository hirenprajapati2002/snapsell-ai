import React from "react";

const PhotHeroContent = () => {
  return (
    <div className="text-center max-w-4xl flex flex-col items-center gap-6">
      <h1 className="text-white text-3xl sm:text-5xl font-bold leading-snug">
        Transform Visuals with our{" "}
        <span className="text-white font-extrabold">Creative Automation Platform</span>{" "}
        & 10,000+ Custom Templates
      </h1>
      <p className="text-gray-300 text-lg sm:text-xl max-w-2xl">
        Unlock <strong className="text-white">40+ AI tools</strong> & Custom design templates.
        From ads and banners to product photos and seasonal promotions, Snapsell.AI delivers
        high-converting results effortlessly.
      </p>
      {/* <button className="bg-[#7B61FF] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#684ad1] transition">
        Start Creating ✨
      </button> */}
    </div>
  );
};

export default PhotHeroContent;
