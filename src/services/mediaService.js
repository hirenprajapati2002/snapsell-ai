// src/services/mediaService.js
import apiClient from '../utils/apiClient';

export const mediaService = {
    // Get all user media
    getMyMedia: async () => {
        try {
            const response = await apiClient.get('/my-media');
            return response.data;
        } catch (error) {
            console.error('Error fetching media:', error);
            throw error;
        }
    },

    // Upload new media
    uploadMedia: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await apiClient.post('/upload-media', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading media:', error);
            throw error;
        }
    },

    // Delete media
    deleteMedia: async (mediaId) => {
        try {
            const response = await apiClient.delete(`/media/${mediaId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting media:', error);
            throw error;
        }
    },

    // Update media (rename, etc.)
    updateMedia: async (mediaId, data) => {
        try {
            const response = await apiClient.put(`/media/${mediaId}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating media:', error);
            throw error;
        }
    }
};
