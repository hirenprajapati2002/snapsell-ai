// src/pages/DashboardPage.jsx
import React from 'react';
import StudioNavbar from '../components/StudioNavbar';
import StudioSidebar from '../components/StudioSidebar';
import DashboardMain from '../components/DashboardMain';
import usePrivateRoutes from '../hooks/usePrivateRoutes';

const DashboardPage = () => {
    usePrivateRoutes();

    return (
        <div className="min-h-screen bg-gray-50">
            <StudioNavbar />
            <div className="flex pt-16">
                <StudioSidebar />
                <DashboardMain />
            </div>
        </div>
    );
};

export default DashboardPage;
