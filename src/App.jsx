// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
     <div className="bg-gray-900 min-h-screen text-white">
      <AppRoutes />
    </div>
  );
};

export default App;
