// src/pages/public/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

import heroImg from "../../assets/logo.png";
import appstore from "../../assets/appstore.svg";
import playstore from "../../assets/playstore.svg";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaChartLine,
  FaLock,
  FaClock,
  FaChartPie,
  FaShieldAlt
} from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section fade-in">
        <div className="hero-content">
          <h1 className="hero-title">
            Manage Your Business with <span>GAUSS Vendor App</span>
          </h1>

          <p className="hero-subtitle">
            Upload products, track orders, monitor performance, and manage transactions — 
            all from one powerful dashboard.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="hero-btn primary">Get Started</Link>
            <Link to="/login" className="hero-btn secondary">Login</Link>
          </div>

          <div className="hero-stores">
            <img src={appstore} alt="App Store" className="store-icon" />
            <img src={playstore} alt="Play Store" className="store-icon" />
          </div>
        </div>

        <div className="hero-image-box">
          <img src={heroImg} alt="Vendor Dashboard" className="hero-image" />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section fade-in">
        <h2 className="section-title">Why Vendors Love GAUSS</h2>

        <div className="features-grid">

          <div className="feature-card">
            <FaBoxOpen className="f-icon" />
            <h3>Easy Product Management</h3>
            <p>Upload, modify, categorize, and organize your items effortlessly.</p>
          </div>

          <div className="feature-card">
            <FaShoppingCart className="f-icon" />
            <h3>Real-Time Order Tracking</h3>
            <p>Instant alerts when customers place or update orders.</p>
          </div>

          <div className="feature-card">
            <FaChartLine className="f-icon" />
            <h3>Smart Sales Analytics</h3>
            <p>Visual insights to help you take better business decisions.</p>
          </div>

          <div className="feature-card">
            <FaLock className="f-icon" />
            <h3>Secure Payments</h3>
            <p>Built-in payment protection powered by Paystack.</p>
          </div>

        </div>
      </section>

      {/* SECOND FEATURE LIST */}
      <section className="why-section fade-in">
        <h2>Why Choose GAUSS?</h2>

        <div className="why-grid">
          <div className="why-item">
            <FaClock className="why-icon" />
            <p><strong>Real-time Order Tracking:</strong> Stay updated every second.</p>
          </div>

          <div className="why-item">
            <FaChartPie className="why-icon" />
            <p><strong>Powerful Analytics:</strong> Know what sells, when, and why.</p>
          </div>

          <div className="why-item">
            <FaShieldAlt className="why-icon" />
            <p><strong>Secure Payments:</strong> Accept multiple payment methods with confidence.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section fade-in">
        <h2>Start Managing Your Business Smarter</h2>
        <p>Join thousands of vendors using GAUSS to scale and manage their operations.</p>

        <Link to="/register" className="cta-btn">Create Vendor Account</Link>
      </section>

    </div>
  );
}
