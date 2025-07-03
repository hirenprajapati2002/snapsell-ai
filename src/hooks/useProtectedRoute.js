// src/hooks/useProtectedRoute.js
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useProtectedRoute = () => {
    const { user, isLoading, openLoginModal } = useAuth();

    useEffect(() => {
        if (!isLoading && !user) {
            openLoginModal();
        }
    }, [user, isLoading, openLoginModal]);

    return {
        isAuthenticated: !!user,
        isLoading,
        user,
    };
};

export default useProtectedRoute;
