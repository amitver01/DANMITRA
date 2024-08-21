// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../src/components/NavBar';
import Home from '../src/components/pages/Home'; // Adjust path as needed
import Footer from './components/Footer';


function App() {
  return (
    <div className='w-full h-screen  text-white'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes here */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
