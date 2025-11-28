// src/components/PublicFooter.js
import React from "react";
import { Link } from "react-router-dom";
import "./PublicFooter.css";
import appstore from "../assets/appstore.svg";
import playstore from "../assets/playstore.svg";

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="pf-container">
        {/* Column 1 */}
        <div className="pf-col">
          <h3 className="pf-title">GAUSS Vendor App</h3>
          <p className="pf-desc">
            Manage your business, products, orders, and analytics easily.
          </p>
          <div className="pf-stores">
            <img src={appstore} alt="App Store" className="pf-store-icon" />
            <img src={playstore} alt="Play Store" className="pf-store-icon" />
          </div>
        </div>

        {/* Column 2 */}
        <div className="pf-col">
          <h4 className="pf-heading">Company</h4>
          <Link to="/about" className="pf-link">About</Link>
          <Link to="/features" className="pf-link">Features</Link>
          <Link to="/contact" className="pf-link">Contact</Link>
        </div>

        {/* Column 3 */}
        <div className="pf-col">
          <h4 className="pf-heading">Support</h4>
          <Link to="/faq" className="pf-link">FAQs</Link>
          <Link to="/privacy-policy" className="pf-link">Privacy Policy</Link>
          <Link to="/terms" className="pf-link">Terms of Service</Link>
        </div>
      </div>

      <div className="pf-bottom">
        © {new Date().getFullYear()} GAUSS Vendor App — All rights reserved.
      </div>
    </footer>
  );
}
