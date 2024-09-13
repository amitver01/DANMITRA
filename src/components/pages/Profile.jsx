import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [donor, setDonor] = useState(null); // State to store donor data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchDonorDetails = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const donorId = localStorage.getItem('donorId'); // Get donor _id from localStorage

      if (!token || !donorId) {
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
  }, []); // Empty dependency array ensures it only runs once

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
    </div>
  );
};

export default Profile;
