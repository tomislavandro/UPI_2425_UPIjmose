import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // za pozadinu
import Cookies from "js-cookie";
import './App.css';
import Categories from './Categories.jsx';
import Navbar from './components/NavBar.jsx';
import Login from './components/Login.jsx';
import Register from "./components/Signup.jsx"
import Profile from './components/Profile.jsx';
import Reviews from './components/CategoryReview.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <BackgroundWrapper>
      <Navbar />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/reviews" element={<h1>Recenzije</h1>} /> {/* Ovo možeš zamijeniti s komponentom za recenzije */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews/:categoryId" element={<Reviews />} />
      </Routes>
      </BackgroundWrapper>
    </Router>
  );
}

function BackgroundWrapper({ children }) {
  const location = useLocation();
  const hasBackground = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={hasBackground ? "with-background" : "without-background"}>
      {children}
    </div>
  );
}

export default App;
