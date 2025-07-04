// src/services/authService.js
import apiClient from '../utils/apiClient';

export const authService = {
    // Login API call
    login: async (email, password) => {
        try {
            const response = await apiClient.post('/login', {
                email,
                password,
            });

            const { token, user } = response.data;

            // Store token and user data
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            return {
                success: true,
                data: { token, user },
            };
        } catch (error) {
            console.error('Login error:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                'Invalid email or password';

            return {
                success: false,
                error: errorMessage,
            };
        }
    },

    // Register API call
    register: async (name, email, password) => {
        try {
            const response = await apiClient.post('/register', {
                name,
                email,
                password,
            });

            const { token, user } = response.data;

            // Store token and user data
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            return {
                success: true,
                data: { token, user },
            };
        } catch (error) {
            console.error('Registration error:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                'Registration failed. Please try again.';

            return {
                success: false,
                error: errorMessage,
            };
        }
    },

    // Forgot Password API call
    forgotPassword: async (email) => {
        try {
            const response = await apiClient.post('/forgot-password', {
                email,
            });

            return {
                success: true,
                message: response.data.message || 'Password reset link sent to your email',
            };
        } catch (error) {
            console.error('Forgot password error:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                'Failed to send reset email. Please try again.';

            return {
                success: false,
                error: errorMessage,
            };
        }
    },

    // Reset Password API call
    resetPassword: async (token, newPassword) => {
        try {
            const response = await apiClient.post('/reset-password', {
                token,
                newPassword,
            });

            return {
                success: true,
                message: response.data.message || 'Password reset successfully',
            };
        } catch (error) {
            console.error('Reset password error:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                'Failed to reset password. Please try again.';

            return {
                success: false,
                error: errorMessage,
            };
        }
    },

    // Verify Token API call
    verifyToken: async () => {
        try {
            const response = await apiClient.get('/me');

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Token verification error:', error);

            // Clear invalid token
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');

            return {
                success: false,
                error: 'Token verification failed',
            };
        }
    },

    // Get current user data from API
    getCurrentUserData: async () => {
        try {
            const response = await apiClient.get('/me');
            
            // Update localStorage with fresh user data
            localStorage.setItem('user', JSON.stringify(response.data));
            
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Get current user error:', error);

            // Clear invalid token
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');

            return {
                success: false,
                error: 'Failed to fetch user data',
            };
        }
    },

    // Logout API call
    logout: async () => {
        try {
            await apiClient.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear local storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        return !!(token && user);
    },
};
