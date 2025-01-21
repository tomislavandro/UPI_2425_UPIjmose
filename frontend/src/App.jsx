import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from "js-cookie";
import './App.css';
import Categories from './Categories.jsx';
import Navbar from './components/NavBar.jsx';
import Login from './components/Login.jsx';
import Register from "./components/Signup.jsx"
import Profile from './components/Profile.jsx';
import Reviews from './components/CategoryReview.jsx';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // NOVO: Stanje za prijavu

  useEffect(() => { // NOVO: Provjeri kolačiće prilikom učitavanja
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setIsLoggedIn(true); // NOVO: Ako kolačić postoji, postavi stanje na prijavljen
    }
  }, []);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/reviews" element={<h1>Recenzije</h1>} /> {/* Ovo možeš zamijeniti s komponentom za recenzije */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews/:categoryId" element={<Reviews/>} />

      </Routes>
    </Router>
  );
}

export default App;


