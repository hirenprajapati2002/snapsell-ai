import React from "react";
import PhotHeroContent from "./PhotHeroContent";
import PhotHeroImage from "./PhotHeroImage";

const PhotHero = () => {
  return (
    <div className="bg-gradient-to-r from-[#032f35] via-[#0c1634] to-[#320050] pt-0 -mt-1">
      <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-r from-[#072E37] via-[#0f1f3f] to-[#370052]">
        <PhotHeroContent />
        <div className="mt-12">
          <PhotHeroImage />
        </div>
      </section>
    </div>
  );
};

export default PhotHero;
