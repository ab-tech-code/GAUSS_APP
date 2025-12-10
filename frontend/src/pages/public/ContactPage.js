// src/pages/public/ContactPage.js
import React, { useState } from "react";
import "./ContactPage.css";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaRegEnvelope,
} from "react-icons/fa";

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
    <div className="contact-page fade-in">

      {/* HEADER */}
      <div className="contact-header">
        <h1>Contact GAUSS Support</h1>
        <p>
          Our vendor support team is available to assist you with anything you need.
        </p>
      </div>

      {/* CONTACT GRID */}
      <div className="contact-grid">

        {/* FORM SECTION */}
        <div className="contact-form-box">
          <h2>Send us a message</h2>

          <form onSubmit={handleSubmit} className="contact-form">

            {/* NAME FIELD */}
            <div className="input-wrap">
              <FaUser className="field-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL FIELD */}
            <div className="input-wrap">
              <FaRegEnvelope className="field-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* MESSAGE FIELD (icon inside top-left corner) */}
            <div className="textarea-wrap">
              <textarea
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* CONTACT INFO SECTION */}
        <div className="contact-info">

          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <div>
              <h3>Email Support</h3>
              <p>support@gaussapp.com</p>
            </div>
          </div>

          <div className="info-card">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h3>Phone Support</h3>
              <p>+234 906 548 8271</p>
            </div>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Office Address</h3>
              <p>GAUSS Headquarters, Abuja, Nigeria</p>
            </div>
          </div>

          <div className="info-card">
            <FaClock className="info-icon" />
            <div>
              <h3>Working Hours</h3>
              <p>Mon–Fri: 9:00am – 6:00pm</p>
              <p>Sat: 10:00am – 4:00pm</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
