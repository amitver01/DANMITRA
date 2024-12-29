import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Button from "../../Button";

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donations from API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("https://your-api-domain.com/api/donations");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDonations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Prepare data for the chart
  const chartData = [
    ["Date", "Donation Amount"],
    ...donations.map((don) => [new Date(don.createdAt).toLocaleDateString(), don.amount]),
  ];

  const chartOptions = {
    title: "Donations Over Time",
    hAxis: { title: "Date" },
    vAxis: { title: "Donation Amount (₹)" },
    legend: "none",
    colors: ["#4285F4"],
    lineWidth: 3,
  };

  const handleApproveClick = () => {
    console.log("Approve action triggered!");
  };

  const handleDeleteClick = () => {
    console.log("Delete campaign triggered!");
  };

  const handleBlacklistClick = () => {
    console.log("Blacklist organization triggered!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto mt-20 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-2 mb-4">Admin Dashboard</h1>

        {/* Show loading or error */}
        {loading ? (
          <p className="text-center text-gray-600">Loading donations...</p>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : (
          <>
            {/* Layout: Grid with 2 columns on top for chart and buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Chart on the left */}
              <div className="lg:col-span-1">
                <div className="p-4 bg-white shadow-md rounded-lg">
                  <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Donation Analytics</h2>
                  <Chart chartType="ColumnChart" width="100%" height="400px" data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* Admin buttons on the right */}
              <div className="lg:col-span-1">
                <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col">
                  <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Admin Actions</h2>
                  <div className="space-y-4 flex flex-col items-center">
                    {/* Create Campaign Button */}
                    <Button 
                      text="Create Campaign" 
                      onClick={handleDeleteClick} 
                      to="/campaignadd"
                      size="medium" 
                    />
                    
                    {/* Delete Campaign Button */}
                    <Button 
                      text="Delete Campaign" 
                      onClick={handleDeleteClick} 
                      size="medium" 
                    />

                    {/* Blacklist Organization Button */}
                    <Button 
                      text="Blacklist Organization" 
                      onClick={handleBlacklistClick} 
                      size="medium" 
                    />
                  </div>
                </div>
              </div>
            </div>

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
                  {donations.map((don) => (
                    <tr key={don._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{don.donorName}</td>
                      <td className="py-2 px-4 border-b">₹{don.amount}</td>
                      <td className="py-2 px-4 border-b">{new Date(don.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">{don.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
