// src/utils/errorHandler.js

export const handleApiError = (error) => {
    // Default error message
    let message = 'An unexpected error occurred. Please try again.';

    if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        switch (status) {
            case 400:
                message = data.message || 'Invalid request. Please check your input.';
                break;
            case 401:
                message = 'Invalid credentials. Please check your email and password.';
                break;
            case 403:
                message = 'Access forbidden. You do not have permission to perform this action.';
                break;
            case 404:
                message = 'Resource not found.';
                break;
            case 409:
                message = data.message || 'Conflict. This email might already be registered.';
                break;
            case 422:
                message = data.message || 'Validation error. Please check your input.';
                break;
            case 429:
                message = 'Too many requests. Please wait a moment and try again.';
                break;
            case 500:
                message = 'Server error. Please try again later.';
                break;
            default:
                message = data.message || message;
        }
    } else if (error.request) {
        // Network error
        message = 'Network error. Please check your internet connection and try again.';
    } else if (error.code === 'ECONNABORTED') {
        // Timeout error
        message = 'Request timeout. Please try again.';
    }

    return message;
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return {
        isValid: password.length >= 6,
        errors: [
            ...(password.length < 6 ? ['Password must be at least 6 characters long'] : []),
            ...(!/(?=.*[a-z])/.test(password) ? ['Password must contain at least one lowercase letter'] : []),
            ...(!/(?=.*[A-Z])/.test(password) ? ['Password must contain at least one uppercase letter'] : []),
            ...(!/(?=.*\d)/.test(password) ? ['Password must contain at least one number'] : []),
        ],
    };
};

export const validateName = (name) => {
    return {
        isValid: name.trim().length >= 2,
        error: name.trim().length < 2 ? 'Name must be at least 2 characters long' : null,
    };
};
