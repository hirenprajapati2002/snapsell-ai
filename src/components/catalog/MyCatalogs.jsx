import React, { useState, useEffect } from 'react';
import { Check, Trash2 } from 'lucide-react';
import './MyCatalogs.css';
import Button from '../common/Button';
import { Download as DownloadIcon, Share2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getMyCatalogs, deleteCatalog } from '../../services/catalogService';
import whatsappIcon from '../../assets/images/social-icons/whatsapp.svg';
import instagramIcon from '../../assets/images/social-icons/instagram.svg';
import facebookIcon from '../../assets/images/social-icons/facebook.svg';
//import { useToast } from '../../contexts/ToastContext';

const MyCatalogs = () => {
  const [primaryId, setPrimaryId] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [catalogToDelete, setCatalogToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const location = useLocation();
  const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '', whatsapp: '' });
  //const { showError } = useToast();

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        setLoading(true);
        const data = await getMyCatalogs();
        console.log('API Response:', data); // Debug log
        
        // Ensure data is an array
        const catalogsArray = Array.isArray(data) ? data : (data?.data || data?.catalogs || []);
        setCatalogs(catalogsArray);
        
        // Set QR code data from the first catalog (or you can choose which one)
        if (catalogsArray && catalogsArray.length > 0) {
          setQrCodeData(catalogsArray[0]);
        }
      } catch (error) {
        console.error('Error fetching catalogs:', error);
       // showError('Failed to load catalogs. Please try again.');
        setCatalogs([]); // Ensure it's an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/profile', { credentials: 'include' });
        const data = await res.json();
        setSocialLinks({
          instagram: data.instagram || '',
          facebook: data.facebook || '',
          whatsapp: data.whatsapp || '',
        });
      } catch (e) {
        // ignore
      }
    }
    fetchProfile();
  }, []);

  // Get the thumbnail image URL from template object
    const getFirstImageUrl = (catalog) => {
      if (!catalog || !catalog.template || !catalog.template.thumbnail_image) {
        return null;
      }
      return catalog.template.thumbnail_image;
    };

  // Get clean template name from catalog object
  const getCleanName = (catalog) => {
    if (!catalog || !catalog.template || !catalog.template.name) {
      return 'Catalog';
    }
    
    const name = catalog.template.name;
    // Remove timestamp pattern: "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD"
    const cleanName = name.replace(/\s+\d{4}-\d{2}-\d{2}(\s+\d{2}:\d{2}:\d{2})?$/, '');
    return cleanName || 'Catalog';
  };

  // Handle delete button click
  const handleDeleteClick = (catalog) => {
    setCatalogToDelete(catalog);
    setShowDeleteConfirm(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!catalogToDelete) return;
    
    try {
      setDeleting(true);
      await deleteCatalog(catalogToDelete.id);
      
      // Remove the deleted catalog from the list
      setCatalogs(prevCatalogs => prevCatalogs.filter(cat => cat.id !== catalogToDelete.id));
      
      // If the deleted catalog was the primary one, clear primary selection
      if (primaryId === catalogToDelete.id) {
        setPrimaryId(null);
      }
      
      // If the deleted catalog was the QR code data source, update QR code data
      if (qrCodeData && qrCodeData.id === catalogToDelete.id) {
        const remainingCatalogs = catalogs.filter(cat => cat.id !== catalogToDelete.id);
        if (remainingCatalogs.length > 0) {
          setQrCodeData(remainingCatalogs[0]);
        } else {
          setQrCodeData(null);
        }
      }
      
      setShowDeleteConfirm(false);
      setCatalogToDelete(null);
    } catch (error) {
      console.error('Error deleting catalog:', error);
      // showError('Failed to delete catalog. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setCatalogToDelete(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6">Your Catalogs</h2>
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading catalogs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6">Your Catalogs</h2>
      
      {catalogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No catalogs found. Create your first catalog to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {Array.isArray(catalogs) && catalogs.map((cat, idx) => {
            const isPrimary = primaryId === cat.id;
            const imageUrl = getFirstImageUrl(cat);
            const cleanName = getCleanName(cat);
            
            const cardContent = (
              <div
                className={`bg-white/70 rounded-xl shadow-sm border-2 transition-shadow transition-transform duration-300 cursor-pointer flex flex-col min-h-[240px] relative group z-10 w-64 ${isPrimary ? 'border-transparent scale-105 shadow-2xl' : 'border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:scale-105'}`}
              >
                {/* Checkmark icon if primary, with animation and glow */}
                {isPrimary && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                    <div className="bg-white rounded-full border-2 border-purple-600 p-2 shadow-lg ring-4 ring-purple-300/40
                      transition-all duration-300 ease-out
                      scale-100 opacity-100 animate-bounce"
                    >
                      <Check className="w-7 h-7 text-purple-600 drop-shadow" />
                    </div>
                  </div>
                )}
                {/* Image */}
                <div className="bg-gray-900 rounded-t-xl h-32 flex items-center justify-center relative overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={cleanName}
                      className="h-full w-full object-cover rounded-t-xl"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No Image</div>
                  )}
                </div>
                {/* Footer title */}
                <div className="py-3 text-center text-gray-900 font-medium bg-white rounded-b-xl z-10 relative">
                  {cleanName}
                </div>
                {/* Social icons: always visible, immediately below the name */}
                <div className="flex justify-center gap-4 mt-4 mb-3 z-30">
                  <a
                    href={socialLinks.instagram || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Instagram"
                    className="hover:text-pink-500 text-gray-500 text-xl"
                  >
                    <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
                  </a>
                  <a
                    href={`https://wa.me/?text=Check%20out%20this%20catalog!%20${encodeURIComponent(cat.qr_code_url || cat.pdf_url || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on WhatsApp"
                    className="hover:text-green-500 text-gray-500 text-xl"
                  >
                    <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cat.qr_code_url || cat.pdf_url || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Facebook"
                    className="hover:text-blue-600 text-gray-500 text-xl"
                  >
                    <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
                  </a>
                </div>
                {/* Action buttons: only visible on hover, below the social icons */}
                <div className="flex justify-center items-center gap-2 mb-3 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                  <button
                    className="relative z-10 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs font-medium shadow transition-all duration-300 ease-out pointer-events-auto"
                    onClick={() => setPrimaryId(cat.id)}
                  >
                    Set as Primary
                  </button>
                  <button
                    className="relative z-10 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-medium shadow transition-all duration-300 ease-out pointer-events-auto"
                    onClick={() => handleDeleteClick(cat)}
                  >
                    <Trash2 className="w-3 h-3 inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            );
            
            return isPrimary ? (
              <div key={cat.id} className="p-[0.2rem] bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 rounded-2xl animate-gradient-spin w-full h-full relative">
                <div className="bg-white rounded-xl shadow-lg w-full h-full flex flex-col min-h-[240px] relative group w-64">
                  {/* Checkmark icon if primary, with animation and glow */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                    <div className="bg-white rounded-full border-2 border-purple-600 p-2 shadow-2xl ring-4 ring-purple-300/40
                      transition-all duration-300 ease-out
                      scale-100 opacity-100 animate-bounce"
                    >
                      <Check className="w-7 h-7 text-purple-600 drop-shadow" />
                    </div>
                  </div>
                  {/* Image */}
                  <div className="bg-gray-900 rounded-t-xl h-32 flex items-center justify-center relative overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={cleanName}
                        className="h-full w-full object-cover rounded-t-xl"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No Image</div>
                    )}
                  </div>
                  {/* Footer title */}
                  <div className="py-3 text-center text-gray-900 font-medium bg-white rounded-b-xl z-10 relative">
                    {cleanName}
                  </div>
                  {/* Social icons: always visible, immediately below the name */}
                  <div className="flex justify-center gap-4 mt-4 mb-3 z-30">
                    <a
                      href={socialLinks.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on Instagram"
                      className="hover:text-pink-500 text-gray-500 text-xl"
                    >
                      <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
                    </a>
                    <a
                      href={`https://wa.me/?text=Check%20out%20this%20catalog!%20${encodeURIComponent(cat.qr_code_url || cat.pdf_url || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on WhatsApp"
                      className="hover:text-green-500 text-gray-500 text-xl"
                    >
                      <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cat.qr_code_url || cat.pdf_url || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on Facebook"
                      className="hover:text-blue-600 text-gray-500 text-xl"
                    >
                      <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
                    </a>
                  </div>
                  {/* Action buttons: only visible on hover, below the social icons */}
                  <div className="flex justify-center items-center gap-2 mb-3 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <button
                      className="relative z-10 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs font-medium shadow transition-all duration-300 ease-out pointer-events-auto"
                      onClick={() => setPrimaryId(cat.id)}
                    >
                      Set as Primary
                    </button>
                    <button
                      className="relative z-10 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-medium shadow transition-all duration-300 ease-out pointer-events-auto"
                      onClick={() => handleDeleteClick(cat)}
                    >
                      <Trash2 className="w-3 h-3 inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div key={cat.id}>{cardContent}</div>
            );
          })}
        </div>
      )}

      <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6">Your Catalog QR Code</h2>
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center w-full max-w-md">
          {qrCodeData && qrCodeData.qr_code_url ? (
            <img
              src={qrCodeData.qr_code_url}
              alt="QR Code"
              className="w-32 h-32 rounded mb-4"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400 mb-4">
              QR Code
            </div>
          )}
          <div className="text-gray-800 font-medium mb-1">Catalog QR Code</div>
          <div className="text-gray-500 text-sm mb-4">Scan to view all catalogs</div>
          <div className="flex flex-row gap-3 w-full justify-center">
            <Button
              variant="primary"
              className="bg-[#181c29] text-white rounded-full font-bold flex items-center px-6 py-2 text-base shadow-none hover:bg-[#10121a]"
              onClick={() => {
                if (qrCodeData && qrCodeData.pdf_download_url) {
                  window.open(qrCodeData.pdf_download_url, '_blank');
                }
              }}
            >
              <DownloadIcon className="w-5 h-5 mr-2" />
              Download
            </Button>
            <Button
              variant="secondary"
              className="bg-white text-[#181c29] border border-[#e5e7eb] rounded-full font-bold flex items-center px-6 py-2 text-base shadow-none hover:bg-gray-100"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Catalog</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{catalogToDelete ? getCleanName(catalogToDelete) : 'this catalog'}"? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deleting}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCatalogs;