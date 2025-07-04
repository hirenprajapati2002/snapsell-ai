import apiClient from '../utils/apiClient';

// Fetch available templates from backend
export async function getTemplates() {
  try {
    const response = await apiClient.get('/templates');
    console.log('Templates API Response:', response);
    
    // Handle different response formats
    if (response.data) {
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (response.data.templates && Array.isArray(response.data.templates)) {
        return response.data.templates;
      }
    }
    
    console.warn('Unexpected templates API response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error in getTemplates:', error);
    throw error;
  }
}

// data: { products: [{ name, description, price, code, image (File) }], company_phone, company_website, template_id }
export async function generateCatalogPDF({ products, company_phone, company_website, template_id }) {
  const formData = new FormData();
  
  // Add products data
  products.forEach((product, idx) => {
    if (product.image) formData.append(`products[${idx}][image]`, product.image);
    if (product.name) formData.append(`products[${idx}][name]`, product.name);
    if (product.description) formData.append(`products[${idx}][description]`, product.description);
    if (product.price) formData.append(`products[${idx}][price]`, product.price);
    if (product.code) formData.append(`products[${idx}][code]`, product.code);
  });
  
  // Add company data
  if (company_phone) formData.append('company_phone', company_phone);
  if (company_website) formData.append('company_website', company_website);
  
  // Add store information
  if (products[0]?.storeName) formData.append('store_name', products[0].storeName);
  if (products[0]?.storeDescription) formData.append('store_description', products[0].storeDescription);
  if (products[0]?.storeImage) formData.append('store_image', products[0].storeImage);
  
  // Add template ID
  if (template_id) {
    formData.append('template_id', template_id);
  }

  // POST to /catalog/generate with extended timeout for file processing
  const response = await apiClient.post('/catalog/generate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'blob', // if expecting a PDF file
    timeout: 300000, // 5 minutes timeout for catalog generation
  });
  
  return response;
}

// Fetch user's catalogs from /my-pdfs endpoint
export async function getMyCatalogs() {
  try {
    const response = await apiClient.get('/my-pdfs');
    console.log('Raw API Response:', response); // Debug log
    
    // Handle different response formats
    if (response.data) {
      // If response.data is an array, return it directly
      if (Array.isArray(response.data)) {
        return response.data;
      }
      // If response.data has a nested data property
      if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      // If response.data has a catalogs property
      if (response.data.catalogs && Array.isArray(response.data.catalogs)) {
        return response.data.catalogs;
      }
      // If response.data has a results property (common in paginated APIs)
      if (response.data.results && Array.isArray(response.data.results)) {
        return response.data.results;
      }
    }
    
    // If none of the above, return empty array
    console.warn('Unexpected API response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error in getMyCatalogs:', error);
    throw error;
  }
}

// Delete a catalog by ID
export async function deleteCatalog(catalogId) {
  try {
    const response = await apiClient.delete(`/catalog/${catalogId}`);
    console.log('Delete catalog response:', response);
    return response.data;
  } catch (error) {
    console.error('Error in deleteCatalog:', error);
    throw error;
  }
} 