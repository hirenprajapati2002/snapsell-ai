// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/common/FeaturesSection';
import SectionDivider from '../components/common/SectionDivider';
import SectionDividerDown from '../components/common/SectionDividerDown';
import PhotHero from '../components/photHero/PhotHero';
import ToolsSection from '../components/ToolSection/ToolsSection';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <FeaturesSection />
      <SectionDividerDown />
      <PhotHero />
      <SectionDivider />
      <ToolsSection />
    </>
  );
};

export default HomePage;
