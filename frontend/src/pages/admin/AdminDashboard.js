// src/pages/admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch dashboard metrics from backend
    const load = async () => {
      try {
        const res = await api.get("/admin/dashboard"); // backend endpoint
        setStats(res.data);
      } catch (err) {
        // fallback demo values
        setStats({
          totalVendors: 12,
          pendingVendors: 3,
          totalRiders: 8,
          totalOrdersToday: 54,
          totalRevenueToday: 125400,
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="admin-dashboard">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="ad-grid">
        <div className="ad-card">
          <div className="ad-card-title">Total Vendors</div>
          <div className="ad-card-value">{stats.totalVendors}</div>
        </div>

        <div className="ad-card">
          <div className="ad-card-title">Pending Vendors</div>
          <div className="ad-card-value">{stats.pendingVendors}</div>
        </div>

        <div className="ad-card">
          <div className="ad-card-title">Total Riders</div>
          <div className="ad-card-value">{stats.totalRiders}</div>
        </div>

        <div className="ad-card">
          <div className="ad-card-title">Orders Today</div>
          <div className="ad-card-value">{stats.totalOrdersToday}</div>
        </div>

        <div className="ad-card wide">
          <div className="ad-card-title">Revenue Today</div>
          <div className="ad-card-value">₦{stats.totalRevenueToday.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
