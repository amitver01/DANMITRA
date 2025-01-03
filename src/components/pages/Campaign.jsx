import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Loader from '../Loader';

const stripePromise = loadStripe('pk_test_51Kq34DAAUyqQ9D2Qg3e4RhwFrtsK8QtUkg28KOZ5CRFFUa50BBkzjZaulWLvd058TbrophUGRZtrPjk25Ploh9To00vXLv8YD'); // Replace with your Stripe publishable key

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigate = useNavigate();

  // Fetch campaigns based on category
  const fetchCampaigns = async (category) => {
    try {
      const url =
        category === 'All'
          ? 'https://danamitra-backend.vercel.app/api/campaign/campaign'
          : `https://danamitra-backend.vercel.app/api/campaign/searchCategory?category=${category}`;
      const response = await axios.get(url);
      setCampaigns(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch campaigns');
      setLoading(false);
    }
  };

  // Handle donation click
  const handleClick = async (campaignId, amount) => {
    try {
      console.log('Initiating request to backend');
      const stripe = await stripePromise;
 
      const response = await axios.post('https://danamitra-backend.vercel.app/api/payment/checkout_session', {
        campaignId,
        amount,
      });
      console.log('Backend response:', response.data);
      const { url } = response.data;
      window.location.href = url;
    } catch (err) {
      console.error('Failed to redirect to payment', err);
    }
  };
  

  // Delete a campaign
  const deleteCampaign = async (campaignId) => {
    try {
      const response = await axios.post('https://danamitra-backend.vercel.app/api/campaign/delete', {
        _id: campaignId,
      });

      console.log(response.data); // Debugging: Check response from server
      setCampaigns((prevCampaigns) =>
        prevCampaigns.filter((campaign) => campaign._id !== campaignId)
      );
    } catch (err) {
      console.error('Failed to delete campaign', err.response ? err.response.data : err.message);
    }
  };

  // Handle completed campaigns
  const handleCompleteCampaigns = async () => {
    campaigns.forEach((campaign) => {
      if (campaign.moneyCollected >= campaign.goalAmount) {
        deleteCampaign(campaign._id);
      }
    });
  };

  // Fetch campaigns on category change
  useEffect(() => {
    fetchCampaigns(selectedCategory);
  }, [selectedCategory]);

  // Check completed campaigns
  useEffect(() => {
    handleCompleteCampaigns();
  }, [campaigns]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-slate-400">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="w-full h-full bg-zinc-900 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-full bg-zinc-700 text-slate-400 p-8">
      <h1 className="m-20 text-5xl font-bold text-white mb-8 text-center">Campaigns</h1>

      {/* Dropdown for category selection */}
      <div className="mb-8 text-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-zinc-800 text-white p-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Animals">Animals</option>
          <option value="Misc">Miscellaneous</option>
        </select>
      </div>

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
              onClick={() => handleClick(campaign._id, campaign.goalAmount - campaign.moneyCollected)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
            >
              Donate Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaign;
