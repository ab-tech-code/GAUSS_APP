// src/pages/public/FeaturesPage.js
import React from "react";
import "./FeaturesPage.css";

export default function FeaturesPage() {
  const features = [
    {
      title: "Product Management",
      desc: "Add, edit, and organize your products with ease.",
    },
    {
      title: "Real-Time Orders",
      desc: "Get instant notifications when new orders arrive.",
    },
    {
      title: "Sales Analytics",
      desc: "Track revenue, best-selling items, and business performance.",
    },
    {
      title: "Vendor Dashboard",
      desc: "Manage everything in one simple dashboard.",
    },
    {
      title: "Secure Payments",
      desc: "Powered by trusted gateways like Paystack & Flutterwave.",
    },
    {
      title: "Fast Support",
      desc: "24/7 vendor support to ensure smooth operations.",
    },
  ];

  return (
    <div className="features-page">
      <div className="features-header">
        <h1>Features</h1>
        <p>
          Everything you need to run your business smoothly and efficiently.
        </p>
      </div>

      <div className="features-grid">
        {features.map((f, index) => (
          <div key={index} className="feature-box">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
