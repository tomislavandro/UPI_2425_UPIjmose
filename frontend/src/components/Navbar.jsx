import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-item">Početna stranica</Link>
                <div className="navbar-right">
                    <Link to="/login" className="navbar-item">Prijava</Link>
                    <Link to="/profile" className="navbar-item">👤</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
