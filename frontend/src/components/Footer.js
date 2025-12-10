// src/components/Footer.js
import React from "react";
import appstore from "../assets/appstore.svg";
import playstore from "../assets/playstore.svg";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="dashboard-footer">
      {/* LEFT */}
      <div className="df-left">
        © {new Date().getFullYear()} GAUSS — Vendor Platform
      </div>

      {/* CENTER LINKS */}
      <div className="df-center">
        <a href="/terms" className="df-link">Terms</a>
        <a href="/privacy-policy" className="df-link">Privacy</a>
        <a href="/help" className="df-link">Help</a>
      </div>

      {/* RIGHT SIDE — STORE BUTTONS */}
      <div className="df-right">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="df-store"
        >
          <img src={playstore} alt="Play Store" className="df-store-icon" />
          <span>Android</span>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="df-store"
        >
          <img src={appstore} alt="App Store" className="df-store-icon" />
          <span>iOS</span>
        </a>
      </div>
    </footer>
  );
}
