import React from 'react';
import MyCatalogs from '../components/catalog/MyCatalogs';
import StudioLayout from '../layouts/StudioLayout';

const CatalogPage = () => {
  return (
    <StudioLayout>
      {/* <BannerSlider /> */}
      <MyCatalogs />
    </StudioLayout>
  );
};

export default CatalogPage;
