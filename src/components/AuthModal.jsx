// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, validateName } from '../utils/errorHandler';
import LoadingSpinner from './LoadingSpinner';

const AuthModal = () => {
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        isForgotPasswordModalOpen,
        closeModals,
        login,
        register,
        forgotPassword,
        openLoginModal,
        openRegisterModal,
        openForgotPasswordModal,
    } = useAuth();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        // Enhanced validation
        if (!loginData.email || !loginData.password) {
            setErrors({ general: 'Please fill in all fields' });
            setIsLoading(false);
            return;
        }

        if (!validateEmail(loginData.email)) {
            setErrors({ email: 'Please enter a valid email address' });
            setIsLoading(false);
            return;
        }

        const result = await login(loginData.email, loginData.password);

        if (!result.success) {
            setErrors({ general: result.error });
        }

        setIsLoading(false);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        // Enhanced validation
        if (!registerData.fullName || !registerData.email || !registerData.password) {
            setErrors({ general: 'Please fill in all fields' });
            setIsLoading(false);
            return;
        }

        const nameValidation = validateName(registerData.fullName);
        if (!nameValidation.isValid) {
            setErrors({ fullName: nameValidation.error });
            setIsLoading(false);
            return;
        }

        if (!validateEmail(registerData.email)) {
            setErrors({ email: 'Please enter a valid email address' });
            setIsLoading(false);
            return;
        }

        const passwordValidation = validatePassword(registerData.password);
        if (!passwordValidation.isValid) {
            setErrors({ password: passwordValidation.errors[0] });
            setIsLoading(false);
            return;
        }

        const result = await register(registerData.fullName, registerData.email, registerData.password);

        if (!result.success) {
            setErrors({ general: result.error });
        }

        setIsLoading(false);
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        // Enhanced validation
        if (!forgotPasswordData.email) {
            setErrors({ general: 'Please enter your email address' });
            setIsLoading(false);
            return;
        }

        if (!validateEmail(forgotPasswordData.email)) {
            setErrors({ email: 'Please enter a valid email address' });
            setIsLoading(false);
            return;
        }

        const result = await forgotPassword(forgotPasswordData.email);

        if (!result.success) {
            setErrors({ general: result.error });
        }

        setIsLoading(false);
    };

    const handleModalClose = () => {
        closeModals();
        setErrors({});
        setLoginData({ email: '', password: '' });
        setRegisterData({ fullName: '', email: '', password: '' });
        setForgotPasswordData({ email: '' });
    };

    if (!isLoginModalOpen && !isRegisterModalOpen && !isForgotPasswordModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md relative overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={handleModalClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-gray-900 font-semibold text-xl">SnapSell.AI</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {isLoginModalOpen ? 'Welcome Back' :
                            isForgotPasswordModalOpen ? 'Reset Password' :
                                'Get Started'}
                    </h2>
                    <p className="text-gray-600">
                        {isLoginModalOpen
                            ? 'Sign in to your account to continue'
                            : isForgotPasswordModalOpen
                                ? 'Enter your email address and we\'ll send you a link to reset your password'
                                : "Let's get started with your free account"
                        }
                    </p>
                </div>

                {/* Forms */}
                <div className="px-8 pb-8">
                    {isLoginModalOpen ? (
                        // Login Form
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 bg-white ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none pr-12 text-gray-900 bg-white"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {errors.general && (
                                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                    {errors.general}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={openForgotPasswordModal}
                                    className="text-purple-600 hover:text-purple-700 text-sm"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={openRegisterModal}
                                    className="text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    ) : isForgotPasswordModalOpen ? (
                        // Forgot Password Form
                        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={forgotPasswordData.email}
                                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 bg-white ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your email address"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {errors.general && (
                                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                    {errors.general}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Sending Reset Link...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>

                            <div className="text-center text-sm text-gray-600">
                                Remember your password?{' '}
                                <button
                                    type="button"
                                    onClick={openLoginModal}
                                    className="text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        </form>
                    ) : (
                        // Register Form
                        <form onSubmit={handleRegisterSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={registerData.fullName}
                                    onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 bg-white ${errors.fullName ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your full name"
                                    required
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 bg-white ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none pr-12 text-gray-900 bg-white"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>

                            {errors.general && (
                                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                    {errors.general}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={openLoginModal}
                                    className="text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-6 text-center text-xs text-gray-500">
                        By continuing, you agree to Terms of Service and Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
