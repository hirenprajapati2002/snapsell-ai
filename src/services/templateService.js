// src/services/templateService.js
import apiClient from '../utils/apiClient';

const templateService = {
  // Fetch all templates from API
  async getTemplates() {
    try {
      const response = await apiClient.get('/templates');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching templates:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch templates'
      };
    }
  },

  // Update template with new image and text
  async updateTemplate(templateId, updateData) {
    try {
      const response = await apiClient.post(`/templates/${templateId}`, updateData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating template:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update template'
      };
    }
  },

  // Get template details by ID
  async getTemplateById(templateId) {
    try {
      const response = await apiClient.get(`/templates/${templateId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching template details:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch template details'
      };
    }
  }
};

export default templateService;
