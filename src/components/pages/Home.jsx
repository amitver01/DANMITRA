import React from 'react';
import Footer from '../Footer';
const Home = () => {
  return (
    <div className="w-full h-screen mt-10 flex flex-col items-center justify-center bg-zinc-900 text-white">
      {/* Hero Section */}
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Dānamitra</h1>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Join us in making a difference. Dānamitra is your platform for contributing to meaningful causes and campaigns. Together, we can create a better future.
        </p>
        <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md">
          Donate !!
        </button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Campaigns</h2>
          <p className="text-sm">
            Discover various campaigns that align with your values and contribute to the causes you care about.
          </p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Community</h2>
          <p className="text-sm">
            Connect with like-minded individuals and become a part of a community driven by a shared purpose.
          </p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Impact</h2>
          <p className="text-sm">
            Track the impact of your contributions and see how you’re making a difference in real-time.
          </p>
        </div>
      </div>
  
    </div>
  );
};

export default Home;
