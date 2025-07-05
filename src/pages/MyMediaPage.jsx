// src/pages/MyMediaPage.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Image, Video, FileText, Download, Trash2, Star, Images } from 'lucide-react';
import StudioNavbar from '../components/StudioNavbar';
import StudioSidebar from '../components/StudioSidebar';
import { mediaService } from '../services/mediaService';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import usePrivateRoutes from '../hooks/usePrivateRoutes';
import instagramIcon from '../assets/images/social-icons/instagram.svg';
import facebookIcon from '../assets/images/social-icons/facebook.svg';
import twitterIcon from '../assets/images/social-icons/twitter.svg';
import whatsappIcon from '../assets/images/social-icons/whatsapp.svg';

const MyMediaPage = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    usePrivateRoutes(); // Protected route

    // Fetch media from API
    useEffect(() => {
        const fetchMedia = async () => {
            try {
                setLoading(true);
                const response = await mediaService.getMyMedia();
                
                if (response.success) {
                    // Transform API data to match component structure
                    const transformedMedia = response.data.map(item => ({
                        id: item.id,
                        name: item.filename,
                        type: 'image', // Assuming all are images based on API response
                        uploadDate: item.created_at.split(' ')[0], // Extract date only
                        thumbnail: item.url,
                        url: item.url,
                        favorite: false
                    }));
                    
                    setMediaItems(transformedMedia);
                } else {
                    setError('Failed to fetch media');
                }
            } catch (err) {
                console.error('Error fetching media:', err);
                setError('Failed to load media. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();
    }, []);

    const handleDeleteMedia = async (mediaId) => {
        try {
            await mediaService.deleteMedia(mediaId);
            setMediaItems(prev => prev.filter(item => item.id !== mediaId));
        } catch (error) {
            console.error('Error deleting media:', error);
            alert('Failed to delete media. Please try again.');
        }
    };

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

    const getUserSocialLinks = () => {
        // Replace with actual user profile data if available
        const user = JSON.parse(localStorage.getItem('user')) || {};
        return {
            instagram: user.instagram || '',
            facebook: user.facebook || '',
            twitter: user.twitter || '',
            whatsapp: user.whatsapp || '',
        };
    };

    const filteredMedia = mediaItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Auto download when modalImage is set
    useEffect(() => {
        if (modalImage) {
            const link = document.createElement('a');
            link.href = modalImage.url;
            link.download = modalImage.name || 'media-image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [modalImage]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <StudioNavbar />
                <div className="flex pt-16">
                    <StudioSidebar />
                    <div className="flex-1 ml-60 p-6 flex items-center justify-center">
                        <LoadingSpinner />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <StudioNavbar />
                <div className="flex pt-16">
                    <StudioSidebar />
                    <div className="flex-1 ml-60 p-6 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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

                    </div>

                    {/* Media Files Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Media</h2>
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
                        {filteredMedia.length === 0 ? (
                            <div className="text-center py-12">
                                <Images className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
                                <p className="text-gray-500 mb-6">
                                    {searchTerm || selectedCategory !== 'all' 
                                        ? 'Try adjusting your search or filter criteria.' 
                                        : 'Start by generating some AI banners to see them here.'}
                                </p>
                                {!searchTerm && selectedCategory === 'all' && (
                                    <Link 
                                        to="/custom-ads" 
                                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        Generate Your First Banner
                                    </Link>
                                )}
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {filteredMedia.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm border hover:shadow-md transition-shadow cursor-pointer group">
                                        <div className="relative mb-2">
                                            <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                                                <img
                                                    src={item.url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover cursor-pointer"
                                                    onClick={() => {
                                                        setModalImage(item);
                                                        setShowImageModal(true);
                                                    }}
                                                    onError={(e) => {
                                                        e.target.src = '/src/assets/images/1n.webp'; // Fallback image
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                                                <button 
                                                    className={`p-1 rounded-full ${item.favorite ? 'bg-yellow-100 text-yellow-600' : 'bg-white text-gray-600'} shadow-sm hover:bg-yellow-100 hover:text-yellow-600`}
                                                >
                                                    <Star className="w-3 h-3" fill={item.favorite ? 'currentColor' : 'none'} />
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteMedia(item.id);
                                                    }}
                                                    className="p-1 rounded-full bg-white text-gray-600 shadow-sm hover:bg-red-100 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-3 h-3" />
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
                                            <p className="text-xs text-gray-500">{item.uploadDate}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            {getUserSocialLinks().instagram && (
                                                <a href={getUserSocialLinks().instagram} target="_blank" rel="noopener noreferrer" title="Share on Instagram">
                                                    <img src={instagramIcon} alt="Instagram" className="w-5 h-5 hover:scale-110 transition-transform" />
                                                </a>
                                            )}
                                            {getUserSocialLinks().facebook && (
                                                <a href={getUserSocialLinks().facebook} target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                                                    <img src={facebookIcon} alt="Facebook" className="w-5 h-5 hover:scale-110 transition-transform" />
                                                </a>
                                            )}
                                            {getUserSocialLinks().twitter && (
                                                <a href={getUserSocialLinks().twitter} target="_blank" rel="noopener noreferrer" title="Share on X (Twitter)">
                                                    <img src={twitterIcon} alt="X (Twitter)" className="w-5 h-5 hover:scale-110 transition-transform" />
                                                </a>
                                            )}
                                            {getUserSocialLinks().whatsapp && (
                                                <a href={`https://wa.me/?text=${encodeURIComponent(getUserSocialLinks().whatsapp)}`} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp">
                                                    <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 hover:scale-110 transition-transform" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                {filteredMedia.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Images className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
                                        <p className="text-gray-500 mb-6">
                                            {searchTerm || selectedCategory !== 'all' 
                                                ? 'Try adjusting your search or filter criteria.' 
                                                : 'Start by generating some AI banners to see them here.'}
                                        </p>
                                        {!searchTerm && selectedCategory === 'all' && (
                                            <Link 
                                                to="/custom-ads" 
                                                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                            >
                                                Generate Your First Banner
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead className="bg-gray-50 text-left">
                                            <tr className="border-b">
                                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                                                <th className="px-6 py-3 text-sm font-medium text-gray-500">Type</th>
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
                                                                    src={item.url}
                                                                    alt={item.name}
                                                                    className="h-full w-full object-cover object-center"
                                                                    onError={(e) => {
                                                                        e.target.src = '/src/assets/images/1n.webp'; // Fallback image
                                                                    }}
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
                                                        <div className="text-sm text-gray-900">{item.uploadDate}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex space-x-3">
                                                            <button className={`p-1.5 rounded-full transition-colors ${item.favorite ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`}>
                                                                <Star className="w-4 h-4" fill={item.favorite ? 'currentColor' : 'none'} />
                                                            </button>
                                                            <a 
                                                                href={item.url}
                                                                download={item.name}
                                                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                            </a>
                                                            <button 
                                                                onClick={() => handleDeleteMedia(item.id)}
                                                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Image Modal */}
                    {showImageModal && modalImage && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
                            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full flex flex-col items-center relative">
                                <button
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                                    onClick={() => setShowImageModal(false)}
                                >
                                    &times;
                                </button>
                                <img
                                    src={modalImage.url}
                                    alt={modalImage.name}
                                    className="max-w-full max-h-[80vh] rounded-lg shadow-lg object-contain"
                                />
                                <a
                                    href={modalImage.url}
                                    download={modalImage.name || 'media-image.jpg'}
                                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyMediaPage;
