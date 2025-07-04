import apiClient from '../utils/apiClient';

export const generateCampaign = async (form) => {
  const data = new FormData();
  data.append('product_description', form.product_description);
  data.append('business_type', form.business_type);
  if (form.image) data.append('image', form.image);
  const response = await apiClient.post('/generate-marketing-campaign', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
