import apiClient from '../utils/apiClient';

export async function updateProfile(formData) {
  // formData: instance of FormData
  try {
    if (apiClient && apiClient.post) {
      const response = await apiClient.post('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data;
    } else {
      // fallback
      const response = await fetch('/profile', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      return await response.json();
    }
  } catch (error) {
    throw error;
  }
} 