// src/pages/CreatePage.jsx
import React from 'react';
import StudioLayout from '../layouts/StudioLayout';
import BannerSlider from '../components/BannerSlider';
import UploadSection from '../components/common/UploadSection';

const CreatePage = () => {
  return (
    <StudioLayout>
      {/* <BannerSlider /> */}
      <UploadSection/>
    </StudioLayout>
  );
};

export default CreatePage;
