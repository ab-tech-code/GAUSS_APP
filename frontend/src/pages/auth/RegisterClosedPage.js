// src/pages/auth/RegisterClosedPage.js
import React from "react";
import "./RegisterClosedPage.css";
import logo from "../../assets/logo.png";

export default function RegisterClosedPage() {
  return (
    <div className="closed-root">
      <div className="closed-card">
        <img src={logo} className="closed-logo" alt="logo" />

        <h2>Vendor Registration Is Closed</h2>

        <p>
          Our vendor onboarding is currently <strong>invite-only</strong>.
          Only approved and verified businesses can join the GAUSS Vendor
          Network.
        </p>

        <p className="closed-small">
          If you believe this is a mistake or you want to partner with us,
          please reach out to our team.
        </p>

        <a
          href="https://wa.me/2348100000000"
          target="_blank"
          rel="noopener noreferrer"
          className="closed-btn"
        >
          Contact Support on WhatsApp
        </a>

        <a href="/" className="closed-home">
          ← Return Home
        </a>
      </div>
    </div>
  );
}
