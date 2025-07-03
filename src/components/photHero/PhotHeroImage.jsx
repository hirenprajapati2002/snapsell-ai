import React from "react";
import heroImg from "../../assets/images/Studio.webp"; // Your combined final image with card grid

const PhotHeroImage = () => {
  return (
    <img
      src={heroImg}
      alt="Snapsell.AI Hero Mockup"
      className="w-full max-w-[1100px] object-contain"
    />
  );
};

export default PhotHeroImage;
