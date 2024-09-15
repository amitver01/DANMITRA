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
import Profile from './components/pages/Profile';
import Payment from './components/pages/Payment';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign" element={<Campaign/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
