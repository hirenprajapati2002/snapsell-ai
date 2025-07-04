// src/components/DashboardMain.jsx
import React, { useState } from 'react';
import { Plus, Calendar, Star, TrendingUp, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal';

const DashboardMain = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    const handleProductCreated = (productData) => {
        // Handle successful product creation
        console.log('Product created successfully:', productData);
        setIsAddProductModalOpen(false);
        // You can add additional logic here like refreshing the product list,
        // showing a success toast, or redirecting to the product management page
    };

    // Sample festival templates data
    const festivalTemplates = [
        {
            id: 1,
            name: "Diwali Special",
            image: "/src/assets/images/templates.jpg",
            category: "Festival",
            trending: true
        },
        {
            id: 2,
            name: "Christmas Sale",
            image: "/src/assets/images/socialMediaGraphic.webp",
            category: "Holiday",
            trending: false
        },
        {
            id: 3,
            name: "New Year Celebration",
            image: "/src/assets/images/photoShot.webp",
            category: "Festival",
            trending: true
        },
        {
            id: 4,
            name: "Valentine's Day",
            image: "/src/assets/images/replaceBg.webp",
            category: "Holiday",
            trending: false
        }
    ];

    // Quick stats data
    const quickStats = [
        {
            label: "Total Catalogs",
            value: "24",
            icon: FileText,
            color: "bg-blue-500"
        },
        {
            label: "Active Campaigns",
            value: "8",
            icon: TrendingUp,
            color: "bg-green-500"
        },
        {
            label: "Total Views",
            value: "1.2K",
            icon: Users,
            color: "bg-purple-500"
        },
        {
            label: "This Month",
            value: "342",
            icon: Calendar,
            color: "bg-orange-500"
        }
    ];

    return (
        <div className="flex-1 ml-60 p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome back! 👋
                </h1>
                <p className="text-gray-600">
                    Let's create something amazing today
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {quickStats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main CTAs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Start Catalog CTA */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Start Your Catalog</h3>
                        <p className="text-purple-100 mb-6">
                            Create professional product catalogs in minutes
                        </p>
                        <Link
                            to="/catalogs"
                            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Catalog
                        </Link>
                    </div>
                    <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
                </div>

                {/* Create Poster CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Create Poster</h3>
                        <p className="text-blue-100 mb-6">
                            Design stunning posters with AI assistance
                        </p>
                        <Link
                            to="/custom-ads"
                            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Poster
                        </Link>
                    </div>
                    <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
                </div>
            </div>

            {/* Featured Festival Templates */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Featured Festival Templates</h2>
                        <p className="text-gray-600">Ready-to-use templates for upcoming festivals</p>
                    </div>
                    <Link
                        to="/templates"
                        className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {festivalTemplates.map((template) => (
                        <div key={template.id} className="group cursor-pointer">
                            <div className="relative rounded-lg overflow-hidden mb-3">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {template.trending && (
                                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                                        <Star className="w-3 h-3 mr-1" />
                                        Trending
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                            </div>
                            <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                {template.name}
                            </h4>
                            <p className="text-sm text-gray-500">{template.category}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <button
                        onClick={() => setIsAddProductModalOpen(true)}
                        className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <Plus className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Add Product</span>
                    </button>

                    <Link to="/campaigns" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">New Campaign</span>
                    </Link>

                    <Link to="/shared-content" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Share Content</span>
                    </Link>

                    <Link to="/local-events" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Local Events</span>
                    </Link>

                    <Link to="/insights" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">View Insights</span>
                    </Link>

                    <Link to="/brand" className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <Star className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Brand Settings</span>
                    </Link>
                </div>
            </div>

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={isAddProductModalOpen}
                onClose={() => setIsAddProductModalOpen(false)}
                onSubmit={handleProductCreated}
            />
        </div>
    );
};

export default DashboardMain;
