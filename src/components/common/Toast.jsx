/**
 * Toast Component - Global notification system
 * 
 * Usage in any component:
 * import { useToast } from '../../contexts/ToastContext';
 * 
 * const { showSuccess, showError, showInfo } = useToast();
 * 
 * // Show success message
 * showSuccess('Operation completed successfully!');
 * 
 * // Show error message
 * showError('Something went wrong!');
 * 
 * // Show info message
 * showInfo('Please check your email.');
 * 
 * // Custom duration (in milliseconds)
 * showSuccess('Custom duration', 5000);
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-[#9333ea]';
      case 'error':
        return 'bg-red-400'; // Light red color for errors
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-[#9333ea]';
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className={`${getBgColor()} text-white rounded-lg shadow-lg p-4 min-w-80 max-w-md`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                onClose();
              }, 300);
            }}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast; 