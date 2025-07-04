// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CreatePage from '../pages/CreatePage';
import DashboardPage from '../pages/DashboardPage';
import ProductEcomAds from '../pages/ProductEcomAds';
import SocialAds from '../pages/SocialAds';
import CustomAds from '../pages/CustomAds';
import MyMediaPage from '../pages/MyMediaPage';
import FestivalTemplatesPage from '../pages/FestivalTemplatesPage';
import PredefinedTemplatesPage from '../pages/PredefinedTemplatesPage';
import CatalogPage from '../pages/CatalogPage';
import CampaignsPage from '../pages/CampaignsPage';
import TemplateSelectionPage from '../pages/TemplateSelectionPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/my-media" element={<MyMediaPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/product-ecom-ads" element={<ProductEcomAds />} />
      <Route path="/social-ads" element={<SocialAds />} />
      <Route path="/custom-ads" element={<CustomAds />} />
      <Route path="/festival-templates" element={<FestivalTemplatesPage />} />
      <Route path="/predefined-templates" element={<PredefinedTemplatesPage />} />
      <Route path="/my-catalogs" element={<CatalogPage />} />
      <Route path="/catalogs" element={<CatalogPage />} />
      <Route path="/create-catalog" element={<CreatePage />} />
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/select-template" element={<TemplateSelectionPage />} />
    </Routes>
  );
};

export default AppRoutes;
