// src/pages/public/TermsPage.js
import React from "react";
import "./TermsPage.css";

export default function TermsPage() {
  return (
    <div className="terms-page">

      <div className="terms-header">
        <h1>Terms of Service</h1>
        <p>Please read these terms carefully before using GAUSS Vendor App.</p>
      </div>

      <div className="terms-content">

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using GAUSS Vendor App, you agree to comply with and be bound by these Terms of Service.
          </p>
        </section>

        <section>
          <h2>2. Vendor Responsibilities</h2>
          <p>Vendors are responsible for:</p>
          <ul>
            <li>Providing accurate business information</li>
            <li>Ensuring product quality and availability</li>
            <li>Managing orders promptly</li>
            <li>Complying with local business laws</li>
          </ul>
        </section>

        <section>
          <h2>3. Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your login details.
            GAUSS is not liable for unauthorized access resulting from weak passwords.
          </p>
        </section>

        <section>
          <h2>4. Payments & Transactions</h2>
          <p>
            All payments are processed securely through trusted payment gateways such as Paystack.
            Vendors must ensure their bank details are correct.
          </p>
        </section>

        <section>
          <h2>5. Prohibited Actions</h2>
          <ul>
            <li>Uploading illegal or counterfeit products</li>
            <li>Using GAUSS for fraudulent activity</li>
            <li>Manipulating orders or payment records</li>
          </ul>
        </section>

        <section>
          <h2>6. Termination of Account</h2>
          <p>
            GAUSS reserves the right to suspend or terminate accounts violating our policies or laws.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            GAUSS is not responsible for business losses, missed orders, or external system failures.
          </p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We may update these Terms of Service at any time. Vendors will be notified of significant changes.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have questions regarding these terms, contact us at <br />
            <strong>support@gaussapp.com</strong>
          </p>
        </section>

      </div>
    </div>
  );
}
