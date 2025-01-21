import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <Link to="/" className="navbar-item">Početna stranica</Link>
                    <Link to="/login" className="navbar-item">Prijava</Link>
                    <Link to="/register" className="navbar-item">Registracija</Link>
                </div>
                <div className="navbar-right">
                    
                    <Link to="/profile" className="navbar-item profile-icon">👤</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
