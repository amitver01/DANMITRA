import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function CreateCampaignPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [moneyCollected , setCollectedAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const organizationId = Cookies.get('userID'); 

  async function createCampaign(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post(
        'https://danamitra-backend.vercel.app/api/campaign/create', 
        {
          name,
          description,
          goalAmount,
          moneyCollected,
          startDate,
          endDate,
        },
        { withCredentials: true }
      );
        console.log(response.data);
      if (response.status === 201) {
        // Redirect to the campaigns list or success page after successful creation
        navigate('/campaign');
      }
    } catch (e) {
      console.error('Error creating campaign:', e.response ? e.response.data : e.message);
      alert('Failed to create campaign');
    }
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-zinc-900">
      <div className="bg-white shadow-lg w-full sm:w-full md:w-2/3 lg:w-1/3 px-8 py-10 rounded-xl mt-8 flex flex-col items-center">
        <form className="flex flex-col w-full" onSubmit={createCampaign}>
          <h1 className="text-3xl font-extrabold text-black mb-6 text-center">Create Campaign</h1>

          {/* Campaign Title */}
          <input
            type="text"
            placeholder="Campaign Title"
            className="mb-4 p-3 border rounded-lg w-full"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            required
          />

          {/* Description */}
          <textarea
            placeholder="Campaign Description"
            className="mb-4 p-3 border rounded-lg w-full"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            required
          />

          {/* Target Amount */}
          <input
            type="number"
            placeholder="Target Amount (e.g., 10000)"
            className="mb-4 p-3 border rounded-lg w-full"
            value={goalAmount}
            onChange={(ev) => setGoalAmount(ev.target.value)}
            required
          />
            <input
            type="number"
            placeholder="Collected Amount (e.g., 10000)"
            className="mb-4 p-3 border rounded-lg w-full"
            value={moneyCollected}
            onChange={(ev) => setCollectedAmount(ev.target.value)}
            required
          />
          {/* Start Date */}
          <input
            type="date"
            className="mb-4 p-3 border rounded-lg w-full"
            value={startDate}
            onChange={(ev) => setStartDate(ev.target.value)}
            required
          />

          {/* End Date */}
          <input
            type="date"
            className="mb-4 p-3 border rounded-lg w-full"
            value={endDate}
            onChange={(ev) => setEndDate(ev.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
}
