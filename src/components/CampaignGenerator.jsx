import React, { useState, useEffect } from 'react';
import { generateCampaign, getCampaigns, getCampaignById } from '../services/campaignService';
import CampaignList from './common/CampaignList';

const CampaignGenerator = () => {
  const [form, setForm] = useState({
    product_description: '',
    business_type: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      setCampaigns([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCampaign(null);
    try {
      const data = await generateCampaign(form);
      setShowModal(false);
      setForm({ product_description: '', business_type: '', image: null });
      fetchCampaigns();
    } catch (err) {
      setError('Failed to generate campaign.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCampaign = async (id) => {
    setShowCampaignModal(true);
    setSelectedCampaign(null);
    try {
      const data = await getCampaignById(id);
      setSelectedCampaign(data);
    } catch {
      setSelectedCampaign(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 overflow-hidden ">
      <div className="w-full flex flex-col md:flex-row md:items-start gap-8 max-w-6xl">
        {/* Left: Generate Campaign Button & Modal */}
        <div className="flex-1">
          <button
            className="mb-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all text-lg float-right"
            onClick={() => setShowModal(true)}
          >
            Generate Campaign
          </button>
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-auto">
              <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">Generate Marketing Campaign</h2>
                <form onSubmit={handleSubmit} className="space-y-7 w-full">
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">Product Description</label>
                    <input
                      type="text"
                      name="product_description"
                      value={form.product_description || ''}
                      autoComplete="off"
                      onChange={e => setForm(f => ({ ...f, product_description: e.target.value }))}
                      className="w-full border border-purple-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg bg-gray-50 text-gray-800 transition-all duration-200 focus:bg-white"
                      placeholder="e.g. I am tvshop owner"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">Business Type</label>
                    <input
                      type="text"
                      name="business_type"
                      value={form.business_type || ''}
                      autoComplete="off"
                      onChange={e => setForm(f => ({ ...f, business_type: e.target.value }))}
                      className="w-full border border-purple-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg bg-gray-50 text-gray-800 transition-all duration-200 focus:bg-white"
                      placeholder="e.g. tv seller"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">Upload Product Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full text-gray-600"
                    />
                    {form.image && (
                      <div className="mt-2 flex items-center space-x-2">
                        <img src={URL.createObjectURL(form.image)} alt="preview" className="h-14 w-14 object-cover rounded-lg border" />
                        <span className="text-sm text-gray-600">{form.image.name}</span>
                        <button type="button" onClick={() => setForm({ ...form, image: null })} className="ml-2 text-red-500 hover:underline text-xs">Remove</button>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all text-lg disabled:opacity-60 mt-2"
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Generate Campaign'}
                  </button>
                  {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                </form>
              </div>
            </div>
          )}
          {/* Campaign List */}
          <CampaignList campaigns={campaigns} onSelect={handleSelectCampaign} />
        </div>
        {/* Right: Campaign Modal */}
        {showCampaignModal && selectedCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-auto">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowCampaignModal(false)}
              >
                &times;
              </button>
              <h1 className="text-4xl font-extrabold mb-6 text-purple-700 flex items-center gap-2">
                <span role="img" aria-label="megaphone">📢</span> <span className="text-purple-700">{selectedCampaign.title || '3-Month Social Media Campaign'}</span>
              </h1>
              <div className="w-full space-y-4 text-lg text-gray-800">
                <div className="flex items-start gap-2">
                  <span className="mt-1">📝</span>
                  <div><span className="font-bold text-purple-700">Title:</span> <span className="text-gray-900">{selectedCampaign.title}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">🔑</span>
                  <div><span className="font-bold text-yellow-600">Key Message:</span> <span className="text-gray-900">{selectedCampaign.keyMessage}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">🧑‍💼</span>
                  <div><span className="font-bold text-amber-800">Target Audience:</span> <span className="text-gray-900">{selectedCampaign.targetAudience}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">💡</span>
                  <div>
                    <span className="font-bold text-yellow-500">Key Features:</span>
                    <ul className="list-disc ml-6 mt-1 text-gray-900">
                      {Array.isArray(selectedCampaign.keyFeatures) ? selectedCampaign.keyFeatures.map((f, i) => <li key={i}>{f}</li>) : <li>{selectedCampaign.keyFeatures}</li>}
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">🎨</span>
                  <div><span className="font-bold text-pink-600">Aesthetic:</span> <span className="text-gray-900">{selectedCampaign.aesthetic}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">🗓️</span>
                  <div>
                    <span className="font-bold text-red-500">Campaign Phases:</span>
                    <ul className="list-disc ml-6 mt-1 text-gray-900">
                      {selectedCampaign.phases && Object.entries(selectedCampaign.phases).map(([phase, details], i) => (
                        <li key={i}>
                          <span className="font-semibold capitalize text-blue-700">{phase}:</span> {details.objective} <span className="text-gray-500">({details.startDate} to {details.endDate})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">💡</span>
                  <div>
                    <span className="font-bold text-yellow-500">Tips:</span>
                    <ul className="list-disc ml-6 mt-1 text-gray-900">
                      {Array.isArray(selectedCampaign.tips) ? selectedCampaign.tips.map((tip, i) => <li key={i}>{tip}</li>) : <li>{selectedCampaign.tips}</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignGenerator;
