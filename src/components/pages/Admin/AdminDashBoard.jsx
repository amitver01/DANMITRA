import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
 // const [donations, setDonations] = useState([]);
const donations=[
  {
    "_id": "donation_1",
    "donorName": "Amit Verma",
    "amount": 2500,
    "createdAt": "2024-09-25T10:30:00Z",
    "status": "Completed"
  },
  {
    "_id": "donation_2",
    "donorName": "Priya Patel",
    "amount": 1800,
    "createdAt": "2024-09-22T14:45:00Z",
    "status": "Pending"
  },
  {
    "_id": "donation_3",
    "donorName": "Rohan Singh",
    "amount": 3200,
    "createdAt": "2024-09-20T09:15:00Z",
    "status": "Failed"
  },
  {
    "_id": "donation_4",
    "donorName": "Neha Sharma",
    "amount": 1500,
    "createdAt": "2024-09-18T12:30:00Z",
    "status": "Completed"
  },
  {
    "_id": "donation_5",
    "donorName": "Ankit Mehta",
    "amount": 4000,
    "createdAt": "2024-09-17T08:20:00Z",
    "status": "Completed"
  },
  {
    "_id": "donation_6",
    "donorName": "Rahul Gupta",
    "amount": 2750,
    "createdAt": "2024-09-15T11:00:00Z",
    "status": "Pending"
  },
  {
    "_id": "donation_7",
    "donorName": "Shivani Roy",
    "amount": 500,
    "createdAt": "2024-09-14T16:40:00Z",
    "status": "Failed"
  },
  {
    "_id": "donation_8",
    "donorName": "Meena Iyer",
    "amount": 3500,
    "createdAt": "2024-09-13T13:55:00Z",
    "status": "Completed"
  },
  {
    "_id": "donation_9",
    "donorName": "Aditya Kumar",
    "amount": 2200,
    "createdAt": "2024-09-12T15:25:00Z",
    "status": "Pending"
  },
  {
    "_id": "donation_10",
    "donorName": "Kavita Joshi",
    "amount": 2900,
    "createdAt": "2024-09-10T10:50:00Z",
    "status": "Completed"
  }
];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/admin/donations");
  //       setDonations(response.data);
  //     } catch (error) {
  //       console.error("Error fetching donations", error);
  //       navigate("/login");
  //     }
  //   };

  //   fetchData();
  // }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto mt-20 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-2 mb-4">Admin Dashboard</h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Donations</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-center text-gray-600 font-medium">Donor</th>
                <th className="py-2 px-4 border-b text-center text-gray-600 font-medium">Amount</th>
                <th className="py-2 px-4 border-b text-center text-gray-600 font-medium">Date</th>
                <th className="py-2 px-4 border-b text-center text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{donation.donorName}</td>
                  <td className="py-2 px-4 border-b">₹{donation.amount}</td>
                  <td className="py-2 px-4 border-b">{new Date(donation.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{donation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
