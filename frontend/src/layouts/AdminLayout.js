// src/layouts/AdminLayout.js
import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import "../components/AdminSidebar.css";
import "../components/AdminHeader.css";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);

  return (
    <div className={`admin-layout ${collapsed ? "collapsed" : ""}`}>
      <AdminSidebar collapsed={collapsed} toggle={toggle} />

      <div className="admin-main">
        <AdminHeader collapsed={collapsed} toggle={toggle} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
