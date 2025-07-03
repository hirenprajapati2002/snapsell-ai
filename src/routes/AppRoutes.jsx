// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import ProductEcomAds from '../pages/ProductEcomAds';
import SocialAds from '../pages/SocialAds';
import CustomAds from '../pages/CustomAds';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/product-ecom-ads" element={<ProductEcomAds />} />
      <Route path="/social-ads" element={<SocialAds />} />
      <Route path="/custom-ads" element={<CustomAds />} />
    </Routes>
  );
};

export default AppRoutes;
