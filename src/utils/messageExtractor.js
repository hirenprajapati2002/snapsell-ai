/**
 * Utility functions to extract messages from backend API responses
 * Handles different response formats that backends might use
 */

export const extractSuccessMessage = (response) => {
  if (!response || !response.data) {
    return 'Operation completed successfully!';
  }

  const data = response.data;
  
  // Common success message fields
  if (data.message) return data.message;
  if (data.success) return data.success;
  if (data.msg) return data.msg;
  if (data.detail && typeof data.detail === 'string') return data.detail;
  
  // If response is just a string
  if (typeof data === 'string') return data;
  
  return 'Operation completed successfully!';
};

export const extractErrorMessage = (error) => {
  if (!error) {
    return 'An unexpected error occurred.';
  }

  // Network errors
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }
  
  if (error.code === 'NETWORK_ERROR' || !error.response) {
    return 'Network error. Please check your connection and try again.';
  }

  const { response } = error;
  
  // HTTP status specific messages
  if (response.status === 413) {
    return 'File size too large. Please use smaller files.';
  }
  
  if (response.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  if (response.status === 401) {
    return 'Authentication required. Please log in again.';
  }
  
  if (response.status === 403) {
    return 'Access denied. You don\'t have permission for this action.';
  }
  
  if (response.status === 404) {
    return 'Resource not found.';
  }

  // Extract message from response data
  if (response.data) {
    const data = response.data;
    
    // Common error message fields
    if (data.message) return data.message;
    if (data.error) return data.error;
    if (data.detail) return data.detail;
    if (data.msg) return data.msg;
    
    // If it's an array of errors (common in validation errors)
    if (Array.isArray(data)) {
      return data.map(err => err.message || err).join(', ');
    }
    
    // If it's an object with nested errors
    if (typeof data === 'object') {
      const messages = [];
      Object.keys(data).forEach(key => {
        if (data[key] && typeof data[key] === 'string') {
          messages.push(data[key]);
        }
      });
      if (messages.length > 0) {
        return messages.join(', ');
      }
    }
  }

  return 'An error occurred. Please try again.';
}; 