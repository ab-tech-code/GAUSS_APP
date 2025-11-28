// src/pages/public/PrivacyPolicyPage.js
import React from "react";
import "./PrivacyPolicyPage.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. Please read this policy carefully.</p>
      </div>

      <div className="privacy-content">
        
        <section>
          <h2>1. Introduction</h2>
          <p>
            GAUSS Vendor App is committed to protecting your personal information 
            and respecting your privacy. This Privacy Policy explains how we collect, 
            use, and safeguard your data.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following data:</p>
          <ul>
            <li>Personal details (name, email, phone number)</li>
            <li>Business details (store name, business category)</li>
            <li>Uploaded media (logo, product images)</li>
            <li>Order and transaction data</li>
            <li>Device and usage information</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul>
            <li>Create and manage vendor accounts</li>
            <li>Process and track orders</li>
            <li>Verify payments</li>
            <li>Improve app performance and security</li>
            <li>Provide customer and vendor support</li>
          </ul>
        </section>

        <section>
          <h2>4. How We Protect Your Data</h2>
          <p>
            We use encryption, secure servers, authentication, and best security 
            practices to ensure your data remains safe.
          </p>
        </section>

        <section>
          <h2>5. Sharing of Information</h2>
          <p>
            We never sell your personal data. We only share essential info with:
          </p>
          <ul>
            <li>Payment processors (e.g., Paystack)</li>
            <li>Delivery partners (if applicable)</li>
            <li>Government authorities (only when legally required)</li>
          </ul>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>You can request to:</p>
          <ul>
            <li>Update or edit your information</li>
            <li>Request account deletion</li>
            <li>Request a copy of your data</li>
          </ul>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions, please contact us at <br />
            <strong>support@gaussapp.com</strong>
          </p>
        </section>

      </div>
    </div>
  );
}
