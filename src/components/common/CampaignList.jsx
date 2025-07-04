import React from 'react';

const CampaignList = ({ campaigns, onSelect }) => {
  if (!campaigns.length) {
    return <div className="text-center text-gray-500 py-8">No campaigns found.</div>;
  }
  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      {campaigns.map((c) => (
        <div
          key={c.id}
          className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-lg transition cursor-pointer border border-gray-100"
        >
          <div>
            <div className="font-bold text-lg text-purple-700 flex items-center gap-2">
              <span role="img" aria-label="megaphone">📢</span> {c.title || 'Untitled Campaign'}
            </div>
            <div className="text-gray-700 mt-1 text-sm max-w-xl truncate">{c.keyMessage}</div>
          </div>
          <button
            className="mt-4 md:mt-0 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow hover:from-purple-700 hover:to-pink-600 transition-all text-sm"
            onClick={() => onSelect(c.id)}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
