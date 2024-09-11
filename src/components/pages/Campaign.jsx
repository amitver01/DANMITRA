import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/campaign/campaign'); // Replace with your actual API endpoint
      setCampaigns(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch campaigns');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className='w-full h-full bg-zinc-900 text-slate-400'>Loading campaigns...</div>;
  }

  if (error) {
    return <div className='w-full h-full bg-zinc-900 text-red-500'>{error}</div>;
  }

  return (
    <div className='w-full h-full bg-zinc-700 text-slate-400 p-8'>
      <h1 className='m-20  text-5xl font-bold text-white mb-8 text-center '>Campaigns</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {campaigns.map((campaign) => (
          <div key={campaign.id} className='bg-zinc-800 rounded-lg shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-white mb-4'>{campaign.name}</h2>
            <p className='text-slate-400 mb-4'>{campaign.description}</p>
            <div className='text-slate-400'>
              <span className='font-semibold'>Goal:</span> ₹{campaign.goalAmount}
            </div>
            <div className='text-slate-400'>
              <span className='font-semibold'>Raised:</span> ₹{campaign.moneyCollected}
            </div>
            <button className='mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500'>
              Donate Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaign;
