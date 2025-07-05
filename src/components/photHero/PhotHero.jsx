import React from "react";
import PhotHeroContent from "./PhotHeroContent";
import PhotHeroImage from "./PhotHeroImage";

const PhotHero = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-800 pt-0 -mt-1">
      <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-800">
        <PhotHeroContent />
        <div className="mt-12">
          <PhotHeroImage />
        </div>
      </section>
    </div>
  );
};

export default PhotHero;
