// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Sidebar.css";

export default function Sidebar({ collapsed, toggleSidebar }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Orders", path: "/orders", icon: "🛒" },
    { name: "Products", path: "/products", icon: "📦" },
    { name: "Analytics", path: "/analytics", icon: "📈" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>
      {/* Logo */}
      <div className="sidebar-header">
        <img src={logo} alt="GAUSS" className="sidebar-logo" />
        {!collapsed && <span className="sidebar-title">GAUSS Vendor</span>}
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        {menu.map((item, index) => (
          <li
            key={index}
            className={`sidebar-item ${
              location.pathname.startsWith(item.path) ? "active" : ""
            }`}
            onClick={toggleSidebar}
          >
            <Link to={item.path} className="sidebar-link">
              <span className="sidebar-icon">{item.icon}</span>
              {!collapsed && <span className="sidebar-text">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
