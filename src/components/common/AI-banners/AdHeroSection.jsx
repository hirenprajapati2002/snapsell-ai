import React from "react";
import clsx from "clsx";

const AdHeroSection = ({
  title,
  subtitle,
  buttonText,
  image,
  badges,
  variant = "product",
}) => {
  const bgClass = clsx({
    "bg-[#f9f9ff]": variant === "product",
    "bg-[#fff3eb]": variant === "social",
    "bg-[#F2F6FA]": variant === "custom",
  });

  return (
    <div className={`${bgClass} px-[32px] py-[50px] rounded-3xl shadow w-full font-inter`}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          <h1
            className="text-[28px] font-bold leading-[1.2] text-black"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="mt-2 text-gray-600 text-[15px] leading-snug">
            {subtitle}
          </p>

          <button className="mt-4 bg-[#7927ff] hover:bg-[#6221cc] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow transition">
            {buttonText}
          </button>

          <div className="flex flex-wrap gap-2 mt-4">
            {badges?.map((badge, idx) => (
              <span
                key={idx}
                className="bg-white border px-3 py-1.5 text-xs text-gray-700 rounded-full shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={image}
            alt="Banner"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AdHeroSection;
