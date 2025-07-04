import React from 'react';
import StudioLayout from '../layouts/StudioLayout';
import AdHeroSection from '../components/common/AI-banners/AdHeroSection';
import AdFooterSection from '../components/common/AI-banners/AdFooterSection';
import PredefinedTemplatesSection from '../components/common/AI-banners/PredefinedTemplatesSection';
import productImage from '../assets/ads/Product-ecom.png';

const ProductEcomAds = () => {
  return (
  <StudioLayout>
<>
<AdHeroSection
        variant="product"
        title={`Make <span class="bg-gradient-to-r from-[#6a4bff] to-[#f82cff] bg-clip-text text-transparent">eCommerce<br/>Creatives</span> that convert`}
        subtitle="Create scroll stopping eCommerce product creatives for your store. Make creatives that work as a click magnet and improve your campaign performance."
        buttonText="Start Now"
        image={productImage}
      />

      {/* Predefined Templates Section */}
      <div className="my-8">
        <PredefinedTemplatesSection />
      </div>

      <AdFooterSection />
</>
      

</StudioLayout>

  );
};

export default ProductEcomAds;
