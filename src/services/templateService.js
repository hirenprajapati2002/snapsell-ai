// src/services/templateService.js
import apiClient from '../utils/apiClient';
import axios from 'axios';
const templateService = {
  // Fetch all templates from API
  async getTemplates() {
    try {
      const response = await apiClient.get('/photoroom/templates');
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
      let payload;
      for (const [key, value] of updateData.entries()) {
        console.log("ss", key, value);
      }
      //   let config = {};
      //   // If imageFile exists, use FormData
      //    if (updateData.imageFile) {
      //   payload = new FormData();
      //   if (updateData.imageFile instanceof File) {
      //     payload.append('image', updateData.image);
      //   }
      //   if (updateData.text) payload.append('text', updateData.text);
      //   // Append other fields as needed
      //   // Do NOT set Content-Type header, let browser set it for FormData
      //   config = {};
      // }else {
      //   console.log("else updateData",updateData)
      // }
      const response = await apiClient({ url: `/photoroom/templates/${templateId}`, method: 'POST', data: updateData });
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
      const response = await apiClient.get(`/photoroom/templates/${templateId}`);
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
