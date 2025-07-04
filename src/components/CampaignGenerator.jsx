import React, { useState } from 'react';
import { generateCampaign } from '../services/campaignService';

const CampaignGenerator = () => {
  const [form, setForm] = useState({
    product_description: '',
    business_type: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');

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
      setCampaign(data);
    } catch (err) {
      setError('Failed to generate campaign.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 overflow-hidden ">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
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
      {campaign && (
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl mt-12 flex flex-col items-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-4 text-purple-700">📢 {campaign.title || '3-Month Social Media Campaign'}</h1>
          <div className="mb-2 w-full"><span className="font-bold">🔖 Title:</span> {campaign.campaign_title}</div>
          <div className="mb-2 w-full"><span className="font-bold">🔑 Key Message:</span> {campaign.key_message}</div>
          <div className="mb-2 w-full"><span className="font-bold">🧑‍💼 Target Audience:</span> {campaign.target_audience}</div>
          <div className="mb-2 w-full"><span className="font-bold">💡 Key Features:</span>
            <ul className="list-disc ml-6">
              {Array.isArray(campaign.key_features) ? campaign.key_features.map((f, i) => <li key={i}>{f}</li>) : <li>{campaign.key_features}</li>}
            </ul>
          </div>
          <div className="mb-2 w-full"><span className="font-bold">🎨 Aesthetic:</span> {campaign.aesthetic}</div>
          <div className="mb-2 w-full"><span className="font-bold">📅 Campaign Phases:</span>
            <ul className="list-disc ml-6">
              {Array.isArray(campaign.campaign_phases) ? campaign.campaign_phases.map((p, i) => <li key={i}>{p}</li>) : <li>{campaign.campaign_phases}</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignGenerator;
