import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from "js-cookie";
import './App.css';
import Navbar from './components/NavBar.jsx';
import Login from './components/Login.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => { // NOVO: Provjeri kolačiće prilikom učitavanja
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setIsLoggedIn(true); // NOVO: Ako kolačić postoji, postavi stanje na prijavljen
    }
  }, []);

  
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  )
}

export default App;
