// src/pages/public/ContactPage.js
import React, { useState } from "react";
import "./ContactPage.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! (Frontend only)");
  };

  return (
    <div className="contact-page">

      {/* HEADER */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We're here to help! Contact GAUSS Vendor Support anytime.</p>
      </div>

      {/* CONTACT GRID */}
      <div className="contact-grid">

        {/* FORM SECTION */}
        <div className="contact-form-box">
          <h2>Send us a message</h2>
          <form onSubmit={handleSubmit} className="contact-form">

            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Your Message</label>
            <textarea
              name="message"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="contact-btn">
              Submit
            </button>
          </form>
        </div>

        {/* CONTACT INFO */}
        <div className="contact-info">
          <h2>Vendor Support</h2>

          <p><strong>Email:</strong> support@gaussapp.com</p>
          <p><strong>Phone:</strong> +234 906 548 8271</p>

          <h3>Office Address</h3>
          <p>GAUSS HQ, Abuja, Nigeria 🌍</p>

          <h3>Working Hours</h3>
          <p>Monday - Friday: 9:00am - 6:00pm</p>
          <p>Saturday: 10:00am - 4:00pm</p>
        </div>

      </div>
    </div>
  );
}
