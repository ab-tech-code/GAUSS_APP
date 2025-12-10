// src/components/PublicHeader.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./PublicHeader.css";
import logo from "../assets/logo.png";

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="public-header">
      <div className="ph-container">
        {/* LOGO */}
        <Link to="/" className="ph-logo-box" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="GAUSS" className="ph-logo" />
          <span className="ph-title">GAUSS</span>
        </Link>

        {/* HAMBURGER BUTTON (Mobile) */}
        <button
          className={`ph-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* NAVIGATION */}
        <nav className={`ph-nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={`ph-link ${isActive("/")}`} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className={`ph-link ${isActive("/about")}`} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/features" className={`ph-link ${isActive("/features")}`} onClick={() => setMenuOpen(false)}>Features</Link>
          <Link to="/contact" className={`ph-link ${isActive("/contact")}`} onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/faq" className={`ph-link ${isActive("/faq")}`} onClick={() => setMenuOpen(false)}>FAQ</Link>

          <Link to="/login" className="ph-btn ph-login" onClick={() => setMenuOpen(false)}>Login</Link>

          <Link to="/register" className="ph-btn ph-register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>

          <Link to="/register-closed" className="ph-btn ph-vendor" onClick={() => setMenuOpen(false)}>
            Become a Vendor
          </Link>
        </nav>
      </div>
    </header>
  );
}
