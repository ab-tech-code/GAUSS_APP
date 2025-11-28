// src/pages/auth/PendingApprovalPage.js
import React from "react";
import "./PendingApprovalPage.css";
import logo from "../../assets/logo.png";

export default function PendingApprovalPage() {
  return (
    <div className="pending-root">
      <div className="pending-card">
        <img src={logo} alt="GAUSS" className="pending-logo" />

        <h2>Your Account Is Under Review</h2>

        <p>
          Thank you for submitting your vendor application.
          <br />
          Our admin team is reviewing your details.
        </p>

        <p className="pending-note">
          You will receive an email once your account is approved.
        </p>

        <a href="/" className="pending-btn">Return Home</a>
      </div>
    </div>
  );
}
