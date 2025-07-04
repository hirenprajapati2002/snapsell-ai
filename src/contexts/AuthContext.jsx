// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch user data from API
    const fetchUserData = async () => {
        try {
            const result = await authService.getCurrentUserData();
            if (result.success) {
                setUser(result.data);
                return result.data;
            } else {
                setUser(null);
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
            return null;
        }
    };

    // Check for existing user session on app load
    useEffect(() => {
        const initializeAuth = async () => {
            const currentUser = authService.getCurrentUser();
            const token = localStorage.getItem('authToken');
            
            if (token && authService.isAuthenticated()) {
                // Fetch fresh user data from API
                await fetchUserData();
            } else {
                setUser(null);
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const result = await authService.login(email, password);

            if (result.success) {
                setUser(result.data.user);
                setIsLoginModalOpen(false);

                // Show welcome message and redirect to create page
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 500);

                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const result = await authService.register(name, email, password);

            if (result.success) {
                setUser(result.data.user);
                setIsRegisterModalOpen(false);

                // Show welcome tooltip and redirect to create page
                setTimeout(() => {
                    alert("Welcome! Let's create your first product poster!");
                    window.location.href = '/dashboard';
                }, 500);

                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    };

    const forgotPassword = async (email) => {
        try {
            const result = await authService.forgotPassword(email);

            if (result.success) {
                setIsForgotPasswordModalOpen(false);
                setIsLoginModalOpen(true);

                // Show success message
                setTimeout(() => {
                    alert(result.message);
                }, 500);

                return { success: true, message: result.message };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            console.log("insid finaly context")
            setUser(null);
        }
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsRegisterModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsLoginModalOpen(false);
    };

    const openForgotPasswordModal = () => {
        setIsForgotPasswordModalOpen(true);
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
    };

    const closeModals = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
        setIsForgotPasswordModalOpen(false);
    };

    const value = {
        user,
        isLoading,
        login,
        register,
        forgotPassword,
        logout,
        fetchUserData,
        isLoginModalOpen,
        isRegisterModalOpen,
        isForgotPasswordModalOpen,
        openLoginModal,
        openRegisterModal,
        openForgotPasswordModal,
        closeModals,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
