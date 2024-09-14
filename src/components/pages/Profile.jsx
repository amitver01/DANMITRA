import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [donor, setDonor] = useState(null); // State to store donor data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDonorDetails = async () => {
      const token = Cookies.get('token');
      const donorId = Cookies.get('userID'); // Get donor ID from context
     // console.log(donorId);
      if (!donorId) {
        navigate('/login')
        setError('Authentication details are missing');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/api/donors/searchDonor', 
          { _id: donorId }, 
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
          }
        );

        setDonor(response.data.donor); // Update state with the fetched donor data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donor details:', error);
        setError('Failed to fetch donor details');
        setLoading(false);
      }
    };

    fetchDonorDetails();
  }, []); // Add user details as dependencies

  if (loading) {
    return (
      <div className='w-full h-full bg-fixed bg-zinc-900 pt-20 text-white text-center'>
        Loading donor details...
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full h-full bg-fixed bg-zinc-900 pt-20 text-white text-center'>
        {error}
      </div>
    );
  }

  if (!donor) {
    return (
      <div className='w-full h-full bg-fixed bg-zinc-900 pt-20 text-white text-center'>
        No donor details available.
      </div>
    );
  }
  const handleLogout = () => {
    Cookies.remove('token'); // Remove the token cookie
    Cookies.remove('userID'); // Remove the userID cookie
    navigate('/'); // Optionally navigate to the homepage after logout
  };

  return (
    <div className='w-full h-full bg-fixed bg-zinc-900 pt-20'>
      <div className='text-blue-800 text-center text-4xl font-semibold mb-4'>Profile</div>
      <div className='max-w-md mx-auto bg-zinc-800 rounded-lg shadow-lg text-white p-4'>
        <h2 className='text-2xl text-center font-semibold mb-4'>Donor Information</h2>
        <div className='mb-3'>
          <strong>Name: </strong> {donor.name}
        </div>
        <div className='mb-3'>
          <strong>Email: </strong> {donor.email}
        </div>
        <div className='mb-3'>
          <strong>Created At: </strong> {donor.createdAt}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-white text-lg font-light hover:underline">
        Logout
       </button>
    </div>
  );
};

export default Profile;
