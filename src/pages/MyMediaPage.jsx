// src/pages/MyMediaPage.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Grid, List, Upload, FolderPlus, Image, Video, FileText, Download, Trash2, Star } from 'lucide-react';
import StudioNavbar from '../components/StudioNavbar';
import StudioSidebar from '../components/StudioSidebar';

const MyMediaPage = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [mediaItems, setMediaItems] = useState([]);
    const [collections, setCollections] = useState([]);

    // Sample data for demonstration
    useEffect(() => {
        const sampleCollections = [
            {
                id: 1,
                name: 'Product Photos',
                itemCount: 24,
                thumbnail: '/src/assets/images/1n.webp',
                color: 'bg-blue-500'
            },
            {
                id: 2,
                name: 'Social Media',
                itemCount: 18,
                thumbnail: '/src/assets/images/2n.webp',
                color: 'bg-purple-500'
            },
            {
                id: 3,
                name: 'Backgrounds',
                itemCount: 32,
                thumbnail: '/src/assets/images/3n.webp',
                color: 'bg-green-500'
            },
            {
                id: 4,
                name: 'Templates',
                itemCount: 15,
                thumbnail: '/src/assets/images/4n.webp',
                color: 'bg-orange-500'
            }
        ];

        const sampleMediaItems = [
            {
                id: 1,
                name: 'product-photo-1.jpg',
                type: 'image',
                size: '2.4 MB',
                uploadDate: '2024-01-15',
                thumbnail: '/src/assets/images/1n.webp',
                collection: 'Product Photos',
                favorite: true
            },
            {
                id: 2,
                name: 'background-removed.png',
                type: 'image',
                size: '1.8 MB',
                uploadDate: '2024-01-14',
                thumbnail: '/src/assets/images/bgRemover.webp',
                collection: 'Backgrounds',
                favorite: false
            },
            {
                id: 3,
                name: 'social-post.mp4',
                type: 'video',
                size: '12.5 MB',
                uploadDate: '2024-01-13',
                thumbnail: '/src/assets/videos/bg_replacer.mp4',
                collection: 'Social Media',
                favorite: true
            },
            {
                id: 4,
                name: 'enhanced-photo.jpg',
                type: 'image',
                size: '3.1 MB',
                uploadDate: '2024-01-12',
                thumbnail: '/src/assets/images/photoShot.webp',
                collection: 'Product Photos',
                favorite: false
            }
        ];

        setCollections(sampleCollections);
        setMediaItems(sampleMediaItems);
    }, []);

    const getFileIcon = (type) => {
        switch (type) {
            case 'image':
                return <Image className="w-4 h-4" />;
            case 'video':
                return <Video className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    const filteredMedia = mediaItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <StudioNavbar />
            <div className="flex pt-16">
                <StudioSidebar />
                <div className="flex-1 ml-60 p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                My Media
                            </h1>
                            <p className="text-gray-600">
                                Organize and manage your media collections
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center font-medium">
                                <FolderPlus className="w-5 h-5 mr-2" />
                                New Collection
                            </button>
                            <button className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center font-medium">
                                <Upload className="w-5 h-5 mr-2" />
                                Upload Media
                            </button>
                        </div>
                    </div>

                    {/* Collections Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Collections</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {collections.map((collection) => (
                                <div key={collection.id} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex items-center mb-3">
                                        <div className={`w-10 h-10 ${collection.color} rounded-lg flex items-center justify-center mr-3`}>
                                            <FolderPlus className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">{collection.name}</h3>
                                            <p className="text-sm text-gray-500">{collection.itemCount} items</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-20 bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={collection.thumbnail}
                                            alt={collection.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Media Files Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Recent Media</h2>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Search and filters */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex-1 min-w-[240px] relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search media..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="all">All Media</option>
                                <option value="image">Images</option>
                                <option value="video">Videos</option>
                            </select>
                        </div>

                        {/* Media Grid/List */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {filteredMedia.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm border hover:shadow-md transition-shadow cursor-pointer group">
                                        <div className="relative mb-2">
                                            <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className={`p-1 rounded-full ${item.favorite ? 'bg-yellow-100 text-yellow-600' : 'bg-white text-gray-600'} shadow-sm hover:bg-yellow-100 hover:text-yellow-600`}>
                                                    <Star className="w-3 h-3" fill={item.favorite ? 'currentColor' : 'none'} />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-2 left-2">
                                                <div className="bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded flex items-center">
                                                    {getFileIcon(item.type)}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                                            <p className="text-xs text-gray-500">{item.size}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left">
                                        <tr className="border-b">
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Type</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Size</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Collection</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Date</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredMedia.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={item.thumbnail}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="font-medium text-gray-900">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center text-sm text-gray-900">
                                                        {getFileIcon(item.type)}
                                                        <span className="ml-2 capitalize">{item.type}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{item.size}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{item.collection}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{item.uploadDate}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-3">
                                                        <button className={`p-1.5 rounded-full transition-colors ${item.favorite ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`}>
                                                            <Star className="w-4 h-4" fill={item.favorite ? 'currentColor' : 'none'} />
                                                        </button>
                                                        <button className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyMediaPage;
