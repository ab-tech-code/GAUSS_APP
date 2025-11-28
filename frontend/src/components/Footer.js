// src/components/Footer.js
import React from 'react';
import appstore from '../assets/appstore.svg';
import playstore from '../assets/playstore.svg';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        © {new Date().getFullYear()} GAUSS — Vendor Platform
      </div>

      <div className="footer-center">
        <a href="/terms" className="footer-link">Terms</a>
        <a href="/privacy" className="footer-link">Privacy</a>
        <a href="/help" className="footer-link">Help</a>
      </div>

      <div className="footer-right">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="store-link"
        >
          <img src={playstore} alt="Download on Play Store" />
          <span>Android App</span>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="store-link"
        >
          <img src={appstore} alt="Download on App Store" />
          <span>iOS App</span>
        </a>
      </div>
    </footer>
  );
}
