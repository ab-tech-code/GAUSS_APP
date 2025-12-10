// src/components/AdminHeader.js
import React from "react";
import "./AdminHeader.css";

export default function AdminHeader({ collapsed, toggle }) {
  return (
    <header className={`admin-header ${collapsed ? "collapsed" : ""}`}>
      <div className="ah-left">
        <button className="ah-toggle" onClick={toggle} aria-label="Toggle sidebar">
          <span className={`bar ${collapsed ? "open" : ""}`}></span>
          <span className={`bar ${collapsed ? "open" : ""}`}></span>
          <span className={`bar ${collapsed ? "open" : ""}`}></span>
        </button>
        <h3 className="ah-title">GAUSS Admin</h3>
      </div>

      <div className="ah-right">
        <div className="ah-item">🔔</div>
        <div className="ah-item">admin@gauss.com</div>
      </div>
    </header>
  );
}
