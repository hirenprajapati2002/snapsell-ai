// src/pages/UploadProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, ArrowDown, Package, Edit, Trash2 } from 'lucide-react';
import StudioNavbar from '../components/StudioNavbar';
import StudioSidebar from '../components/StudioSidebar';
import AddProductModal from '../components/AddProductModal';

const UploadProductsPage = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Sample data for demonstration
    useEffect(() => {
        // This would typically be an API call
        const sampleProducts = [
            {
                id: 1,
                name: 'Ergonomic Desk Chair',
                image: '/src/assets/images/templates.jpg',
                price: 199.99,
                stock: 24,
                category: 'Furniture'
            },
            {
                id: 2,
                name: 'Wireless Earbuds Pro',
                image: '/src/assets/images/photoShot.webp',
                price: 89.99,
                stock: 156,
                category: 'Electronics'
            },
            {
                id: 3,
                name: 'Organic Cotton T-Shirt',
                image: '/src/assets/images/replaceBg.webp',
                price: 29.99,
                stock: 75,
                category: 'Apparel'
            }
        ];
        setProducts(sampleProducts);
    }, []);

    const handleCloseModal = () => {
        setIsAddProductModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsAddProductModalOpen(true);
    };

    const handleProductCreated = (newProduct) => {
        // In a real app, this would be replaced with an API call
        const productWithId = {
            ...newProduct,
            id: Date.now(), // Simple ID generation
            image: newProduct.images && newProduct.images.length > 0
                ? newProduct.images[0].preview
                : '/src/assets/images/templates.jpg'
        };

        setProducts([productWithId, ...products]);
        setIsAddProductModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <StudioNavbar />
            <div className="flex">
                <StudioSidebar />
                <div className="flex-1 ml-60 p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                Products
                            </h1>
                            <p className="text-gray-600">
                                Add and manage your product inventory
                            </p>
                        </div>
                        <button
                            onClick={handleOpenModal}
                            className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center font-medium"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Product
                        </button>
                    </div>

                    {products.length === 0 ? (
                        // Empty state - prompt to add products
                        <div className="bg-white rounded-xl p-12 shadow-sm border flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                <Package className="w-10 h-10 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No products added yet</h2>
                            <p className="text-gray-600 max-w-md mb-8">
                                Start adding your products to create catalogs, manage inventory, and generate AI-powered marketing materials.
                            </p>
                            <button
                                onClick={handleOpenModal}
                                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center font-medium"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add Your First Product
                            </button>
                        </div>
                    ) : (
                        // Products list view
                        <>
                            {/* Search and filter */}
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex-1 min-w-[240px] relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                </div>
                                <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 inline-flex items-center">
                                    <Filter className="w-5 h-5 mr-2 text-gray-600" />
                                    <span>Filters</span>
                                </button>
                                <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 inline-flex items-center">
                                    <span>Latest</span>
                                    <ArrowDown className="w-4 h-4 ml-2 text-gray-600" />
                                </button>
                            </div>

                            {/* Products grid */}
                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left">
                                        <tr className="border-b">
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Product</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Price</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Stock</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Category</th>
                                            <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="font-medium text-gray-900">{product.name}</div>
                                                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{product.stock}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{product.category}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-3">
                                                        <button className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                                            <Edit className="w-4 h-4" />
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
                        </>
                    )}

                    {/* Add Product Modal */}
                    <AddProductModal
                        isOpen={isAddProductModalOpen}
                        onClose={handleCloseModal}
                        onSubmit={handleProductCreated}
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadProductsPage;
