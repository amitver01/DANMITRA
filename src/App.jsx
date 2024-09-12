// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../src/components/NavBar';
import Home from '../src/components/pages/Home';
import Campaign from '../src/components/pages/Campaign';
import About from './components/pages/About';
import Contact from './components/pages/Conatct'
import Footer from './components/Footer';
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'

function App() {
  return (
    <div className='w-full h-screen  text-white'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign" element={<Campaign/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
