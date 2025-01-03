import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false); // Updated: Initial state is false
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchCampaigns = async (category) => {
    setLoading(true); // Show loader when the fetch starts
    try {
      const url =
        category === 'All'
          ? 'https://danamitra-backend.vercel.app/api/campaign/campaign'
          : `https://danamitra-backend.vercel.app/api/campaign/searchCategory?category=${category}`;
      const response = await axios.get(url);
      setCampaigns(response.data);
    } catch (err) {
      setError('Failed to fetch campaigns');
    } finally {
      setLoading(false); // Hide loader after the fetch is complete
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    fetchCampaigns(e.target.value);
  };

  const handleClickCampaigns = () => {
    fetchCampaigns(selectedCategory); // Fetch campaigns on button click
  };

  useEffect(() => {
    fetchCampaigns(selectedCategory); // Initial fetch on component mount
  }, []);

  return (
    <div className="w-full h-full bg-zinc-700 text-slate-400 p-8">
      <h1 className="m-20 text-5xl font-bold text-white mb-8 text-center">Campaigns</h1>

      <div className="mb-8 text-center">
        <button
          onClick={handleClickCampaigns}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
        >
          Load Campaigns
        </button>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="ml-4 bg-zinc-800 text-white p-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Animals">Animals</option>
          <option value="Misc">Miscellaneous</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader /> {/* Show loader while fetching */}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="bg-zinc-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">{campaign.name}</h2>
              <p className="text-slate-400 mb-4">{campaign.description}</p>
              <div className="text-slate-400">
                <span className="font-semibold">Goal:</span> ₹{campaign.goalAmount}
              </div>
              <div className="text-slate-400">
                <span className="font-semibold">Raised:</span> ₹{campaign.moneyCollected}
              </div>
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
              >
                Donate Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaign;
