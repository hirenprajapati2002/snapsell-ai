// src/pages/CreatePage.jsx
import React from 'react';
import StudioLayout from '../layouts/StudioLayout';
import BannerSlider from '../components/BannerSlider';
import UploadSection from '../components/common/UploadSection';
import usePrivateRoutes from '../hooks/usePrivateRoutes';

const CreatePage = () => {
  usePrivateRoutes();
  
  return (
    <StudioLayout>
      {/* <BannerSlider /> */}
      <UploadSection/>
    </StudioLayout>
  );
};

export default CreatePage;
