// src/services/imageGenerationService.js
import apiClient from '../utils/apiClient';

export const generateImage = async (prompt, imageFile = null) => {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await apiClient.post('/generate-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // Increase timeout for image generation
    });

    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

export const generateImageWithPrompts = async (prompts) => {
  try {
    const results = [];
    
    for (const prompt of prompts) {
      const result = await generateImage(prompt);
      results.push(result);
    }
    
    return results;
  } catch (error) {
    console.error('Error generating multiple images:', error);
    throw error;
  }
};
    