import React from 'react';
import MyCatalogs from '../components/catalog/MyCatalogs';
import StudioLayout from '../layouts/StudioLayout';
import usePrivateRoutes from '../hooks/usePrivateRoutes';

const CatalogPage = () => {
  usePrivateRoutes();
  
  return (
    <StudioLayout>
      {/* <BannerSlider /> */}
      <MyCatalogs />
    </StudioLayout>
  );
};

export default CatalogPage;
