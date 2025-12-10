// src/components/AdminSidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar({ collapsed = false, toggle }) {
  const loc = useLocation();

  const menu = [
    { key: "dashboard", label: "Dashboard", path: "/admin" },
    { key: "vendors", label: "Vendors", path: "/admin/vendors" },
    { key: "vendor-approvals", label: "Vendor Approvals", path: "/admin/approvals/vendors" },
    { key: "rider-approvals", label: "Rider Approvals", path: "/admin/approvals/riders" },
    { key: "riders", label: "Riders", path: "/admin/riders" },
    { key: "settings", label: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="as-top">
        <div className="as-brand">
          <div className="as-logo">G</div>
          {!collapsed && <div className="as-name">GAUSS Admin</div>}
        </div>
      </div>

      <nav className="as-menu">
        {menu.map((m) => (
          <Link
            key={m.key}
            to={m.path}
            className={`as-item ${loc.pathname.startsWith(m.path) ? "active" : ""}`}
            onClick={() => {}}
          >
            <span className="as-item-icon">{/* icon placeholder */}●</span>
            {!collapsed && <span className="as-item-label">{m.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="as-bottom">
        <button className="as-logout">Logout</button>
      </div>
    </aside>
  );
}
