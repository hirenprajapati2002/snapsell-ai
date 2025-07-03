import React from 'react';
import StudioLayout from '../layouts/StudioLayout';
import AdHeroSection from '../components/common/AI-banners/AdHeroSection';
import AdFooterSection from '../components/common/AI-banners/AdFooterSection';
import productImage from '../assets/ads/social-ads.png';

const SocialAds = () => {
  return (
    <StudioLayout>
<>
 <AdHeroSection
  variant="social"
  title={`Generate multiple <span class="bg-gradient-to-r from-[#6a4bff] via-[#23f0c7] to-[#23f0c7] bg-clip-text text-transparent">Social Media Posts</span> in seconds`}
  subtitle="Engage your audience and reach your social media goals with our Free AI Social Media Post Generator."
  buttonText="Start Now"
  image={productImage}
/>

        <AdFooterSection />
</>
    
 
    </StudioLayout>
  );
};

export default SocialAds;
