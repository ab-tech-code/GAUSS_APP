// src/pages/public/AboutPage.js
import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <h1>About GAUSS Vendor App</h1>
        <p>
          GAUSS helps vendors manage products, orders, analytics, and business operations
          through a simple and powerful dashboard.
        </p>
      </div>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower vendors with digital tools that simplify business
          management. GAUSS enables vendors to grow faster, stay organized, and deliver
          better customer experiences.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>Simple product management and inventory tracking</li>
          <li>Real-time order notifications and tracking</li>
          <li>Business analytics for informed decisions</li>
          <li>Secure payment handling powered by trusted gateways</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Vendors Trust Us</h2>
        <p>
          GAUSS is built with reliability, security, and vendor experience in mind.
          Thousands of vendors rely on our tools to run their businesses daily.
        </p>
      </section>

    </div>
  );
}
