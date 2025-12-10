// src/pages/public/FeaturesPage.js
import React from "react";
import "./FeaturesPage.css";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaChartLine,
  FaTachometerAlt,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

export default function FeaturesPage() {
  const features = [
    {
      icon: <FaBoxOpen />,
      title: "Product Management",
      desc: "Add, edit, organize, and categorize your products effortlessly.",
    },
    {
      icon: <FaShoppingCart />,
      title: "Real-Time Orders",
      desc: "Instant alerts when new orders arrive or status changes.",
    },
    {
      icon: <FaChartLine />,
      title: "Sales Analytics",
      desc: "Insights to track revenue, trends, and business growth.",
    },
    {
      icon: <FaTachometerAlt />,
      title: "Vendor Dashboard",
      desc: "Everything you need is available in one beautiful dashboard.",
    },
    {
      icon: <FaLock />,
      title: "Secure Payments",
      desc: "Integrated with Paystack, Flutterwave, and secure APIs.",
    },
    {
      icon: <FaHeadset />,
      title: "Fast Support",
      desc: "24/7 vendor assistance to ensure business continuity.",
    },
  ];

  return (
    <div className="features-page fade-in">

      {/* PAGE HEADER */}
      <div className="features-header">
        <h1>Our Features</h1>
        <p>
          Powerful tools designed to help vendors manage and scale their businesses effortlessly.
        </p>
      </div>

      {/* FEATURES GRID */}
      <div className="features-grid">
        {features.map((f, index) => (
          <div key={index} className="feature-box">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
