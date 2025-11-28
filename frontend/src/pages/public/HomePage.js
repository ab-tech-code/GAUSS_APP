// src/pages/public/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import heroImg from "../../assets/logo.png";
import appstore from "../../assets/appstore.svg";
import playstore from "../../assets/playstore.svg";

export default function HomePage() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Manage Your Business with <span>GAUSS Vendor App</span>
          </h1>

          <p className="hero-subtitle">
            Upload products, track orders, analyze sales, and grow your business — all in one dashboard.
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
      <section className="features-section">
        <h2 className="section-title">Why Vendors Love GAUSS</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Product Management</h3>
            <p>Upload, edit, and manage your products with just a few clicks.</p>
          </div>

          <div className="feature-card">
            <h3>Track Orders in Real-Time</h3>
            <p>Always know when customers place orders or request updates.</p>
          </div>

          <div className="feature-card">
            <h3>Sales Analytics</h3>
            <p>Powerful insights to help you understand and grow your business.</p>
          </div>

          <div className="feature-card">
            <h3>Secure Payments</h3>
            <p>Paystack-powered fast and secure transaction processing.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <h2>Start Managing Your Business Smarter</h2>
        <p>Join thousands of vendors using GAUSS to grow their business efficiently.</p>

        <Link to="/register" className="cta-btn">Create Vendor Account</Link>
      </section>

    </div>
  );
}
