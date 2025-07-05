import React, { useState } from 'react';
import Button from './common/Button';
import { updateProfile } from '../services/profileService';
import whatsappIcon from '../assets/images/social-icons/whatsapp.svg';
import instagramIcon from '../assets/images/social-icons/instagram.svg';
import facebookIcon from '../assets/images/social-icons/facebook.svg';

const ProfileUpdateModal = ({ isOpen, onClose, user }) => {
  const [email] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [storeName, setStoreName] = useState(user?.store_name || '');
  const [storeDescription, setStoreDescription] = useState(user?.store_description || '');
  const [storeImage, setStoreImage] = useState(user?.store_image || null);
  const [storeImageFile, setStoreImageFile] = useState(null);
  const [facebook, setFacebook] = useState(user?.facebook || '');
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp || '');
  const [instagram, setInstagram] = useState(user?.instagram || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleStoreImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoreImageFile(file);
      setStoreImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('email', email);
      if (profileImageFile) formData.append('profile_image', profileImageFile);
      formData.append('store_name', storeName);
      formData.append('store_description', storeDescription);
      if (storeImageFile) formData.append('store_image', storeImageFile);
      formData.append('facebook', facebook);
      formData.append('whatsapp', whatsapp);
      formData.append('instagram', instagram);

      const response = await updateProfile(formData);
      if (!response || response.success === false) throw new Error(response?.message || 'Failed to update profile');
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          disabled={loading}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800 cursor-not-allowed placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Profile Image</label>
            <input type="file" accept="image/*" onChange={handleProfileImageChange} />
            {profileImage && (
              <img src={profileImage} alt="Profile Preview" className="mt-2 w-16 h-16 rounded-full object-cover border" />
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Store Description</label>
            <textarea
              value={storeDescription}
              onChange={e => setStoreDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-800 placeholder-gray-400"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Store Image</label>
            <input type="file" accept="image/*" onChange={handleStoreImageChange} />
            {storeImage && (
              <img src={storeImage} alt="Store Preview" className="mt-2 w-20 h-12 rounded object-cover border" />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5 inline-block" /> Facebook
              </label>
              <input
                type="text"
                value={facebook}
                onChange={e => setFacebook(e.target.value)}
                className="w-full border rounded px-3 py-2 text-gray-800 placeholder-gray-400"
                placeholder="Facebook link"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 inline-block" /> WhatsApp
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full border rounded px-3 py-2 text-gray-800 placeholder-gray-400"
                placeholder="WhatsApp number or link"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5 inline-block" /> Instagram
              </label>
              <input
                type="text"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                className="w-full border rounded px-3 py-2 text-gray-800 placeholder-gray-400"
                placeholder="Instagram link"
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">Profile updated!</div>}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded font-bold"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;