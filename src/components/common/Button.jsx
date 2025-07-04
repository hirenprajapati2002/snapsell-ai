import React from 'react';

const Button = ({ onClick, children, variant = 'primary', className = '' }) => {
  const base =
    'px-6 py-2 rounded font-semibold transition-all focus:outline-none';

  const styles = {
    primary: `${base} bg-[#9333ea] text-white hover:bg-purple-800`,
    secondary: `${base} bg-gray-200 text-black hover:bg-gray-300`,
  };

  return (
    <button className={`${styles[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
