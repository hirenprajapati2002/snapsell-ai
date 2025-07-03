import React from 'react';
import StudioLayout from '../layouts/StudioLayout';
import productImage from '../assets/ads/custome-ads.png';
import AdHeroSection from '../components/common/AI-banners/AdHeroSection';
import AdFooterSection from '../components/common/AI-banners/AdFooterSection';

const CustomAds = () => {
  return (
    <StudioLayout>
      <>
<AdHeroSection
        variant="custom"
        title={`Make <span class="bg-gradient-to-r from-[#6a4bff] to-[#f82cff] bg-clip-text text-transparent">eCommerce<br/>Creatives</span> that convert`}
        subtitle="Create scroll stopping eCommerce product creatives for your store. Make creatives that work as a click magnet and improve your campaign performance."
        buttonText="Start Now"
        image={productImage}
      />


      <AdFooterSection />
</>
      
    </StudioLayout>
  );
};

export default CustomAds;
