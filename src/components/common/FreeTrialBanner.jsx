import React from "react";

const FreeTrialBanner = () => {
  return (
    <section className="w-full px-4 md:px-10 py-8">
      <div className="w-full bg-gradient-to-r from-[#1a0730] to-[#120b1e] rounded-2xl px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left text section */}
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-300 mb-1">Not sure yet?</p>
          <h2 className="text-3xl font-bold text-white">
            Try for <span className="text-white font-extrabold">FREE</span> now!
          </h2>
        </div>

        {/* Button */}
        <button className="bg-[#7B3FF7] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#682de9] transition duration-300">
          Claim 25 FREE Photos ✨
        </button>
      </div>
    </section>
  );
};

export default FreeTrialBanner;
