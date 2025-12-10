// src/components/PublicFooter.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PublicFooter.css";
import appstore from "../assets/appstore.svg";
import playstore from "../assets/playstore.svg";

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="public-footer">
      <div className="pf-container">

        {/* BRAND SECTION */}
        <div className="pf-col pf-brand">
          <h3 className="pf-title">GAUSS Vendor App</h3>
          <p className="pf-desc">
            Manage your business, track orders, upload products, and monitor analytics — all in one platform.
          </p>

          <div className="pf-stores">
            <a href="#">
              <img src={appstore} alt="App Store" className="pf-store-icon" />
            </a>
            <a href="#">
              <img src={playstore} alt="Play Store" className="pf-store-icon" />
            </a>
          </div>
        </div>

        {/* COMPANY LINKS */}
        <div className="pf-col">
          <h4 className="pf-heading">Company</h4>
          <Link to="/about" className="pf-link">About Us</Link>
          <Link to="/features" className="pf-link">Features</Link>
          <Link to="/contact" className="pf-link">Contact</Link>
        </div>

        {/* SUPPORT LINKS */}
        <div className="pf-col">
          <h4 className="pf-heading">Support</h4>
          <Link to="/faq" className="pf-link">FAQs</Link>
          <Link to="/privacy-policy" className="pf-link">Privacy Policy</Link>
          <Link to="/terms" className="pf-link">Terms of Service</Link>
        </div>
      </div>

      <div className="pf-bottom">
        © {year} GAUSS Vendor App — All rights reserved.
      </div>
    </footer>
  );
}
