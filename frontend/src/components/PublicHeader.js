// src/components/PublicHeader.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./PublicHeader.css";
import logo from "../assets/logo.png";

export default function PublicHeader() {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="public-header">
      <div className="ph-container">
        <Link to="/" className="ph-logo-box">
          <img src={logo} alt="GAUSS" className="ph-logo" />
          <span className="ph-title">GAUSS</span>
        </Link>

        <nav className="ph-nav">
          <Link to="/" className={`ph-link ${isActive("/")}`}>Home</Link>
          <Link to="/about" className={`ph-link ${isActive("/about")}`}>About</Link>
          <Link to="/features" className={`ph-link ${isActive("/features")}`}>Features</Link>
          <Link to="/contact" className={`ph-link ${isActive("/contact")}`}>Contact</Link>

          <Link to="/login" className="ph-btn ph-login">Login</Link>
          <Link to="/register" className="ph-btn ph-register">Register</Link>
          <li><Link to="/register-closed">Become a Vendor</Link></li>
        </nav>
      </div>
    </header>
  );
}
