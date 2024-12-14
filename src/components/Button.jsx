import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

// Reusable Button Component
const Button = ({
  text = 'Click Me',    // Default text for the button
  onClick,              // Function to be called on button click
  type = 'button',      // Default type
  color = 'blue',       // Default color
  size = 'medium',      // Button size (small, medium, large)
  disabled = false,     // Disabled state
  className = '',       // Additional custom classes
  to = null,            // Optional link destination
}) => {
  // Set classNames for button based on size and color props
  const sizeClass = size === 'small' ? 'py-1 px-3 text-sm' :
                   size === 'large' ? 'py-3 px-6 text-lg' : 
                   'py-2 px-4';  

  if (to) {
    return (
      <Link
        to={to}
        className={`rounded-lg shadow-md font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 transition-all duration-300 ${sizeClass} ${className}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg shadow-md font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 transition-all duration-300 ${sizeClass} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
