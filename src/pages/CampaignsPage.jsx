import React from 'react';
import CampaignGenerator from '../components/CampaignGenerator';
import StudioLayout from '../layouts/StudioLayout';

const CampaignsPage = () => {
  return (
    <StudioLayout>
      <div className="bg-gray-50">
        <CampaignGenerator />
      </div>
    </StudioLayout>
  );
};

export default CampaignsPage;
