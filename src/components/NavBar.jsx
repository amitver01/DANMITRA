import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for client-side navigation

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 px-4 py-4 md:px-8 md:py-6 flex justify-between items-center bg-zinc-900  backdrop-blur-md z-50 transition-all ease-in-out duration-300">
      <div 
        className="text-white text-2xl font-bold cursor-pointer"
        onClick={handleLogoClick}
      >
        दानमित्र
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>
      <div className="hidden md:flex md:items-center md:gap-8">
        <div className="flex flex-col md:flex-row items-center md:gap-8">
          {["Campaigns", "About", "Contact"].map((item, index) => (
            <Link 
              key={index} 
              to={`#${item.toLowerCase()}`} 
              className="text-white text-base md:text-lg font-light hover:underline"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <div className={`md:hidden fixed top-0 left-0 w-full bg-zinc-900 bg-opacity-70 backdrop-blur-md transition-transform ease-in-out duration-300 ${isOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
        <div className="flex flex-col items-center p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl mb-4"
          >
            ×
          </button>
          {["Campaign", "About", "Contact"].map((item, index) => (
            <Link 
              key={index} 
              to={`#${item.toLowerCase()}`} 
              className="text-white text-lg font-light hover:underline mb-4"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
