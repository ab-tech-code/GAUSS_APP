// src/pages/admin/AdminVendorApprovals.js
import React, { useEffect, useState } from "react";
import "./AdminVendorApprovals.css";
import api from "../../services/api";

export default function AdminVendorApprovals() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending vendors
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/pending-vendors");
        setVendors(res.data || []);
      } catch (err) {
        // demo fallback data
        setVendors([
          {
            id: 1,
            name: "John Mark",
            email: "john@shop.com",
            business_name: "John Kitchen",
            category: "Food",
            created_at: "2025-01-10",
            logo: null,
          },
          {
            id: 2,
            name: "Blessing Store",
            email: "blessing@shop.com",
            business_name: "Blessing Supermart",
            category: "Groceries",
            created_at: "2025-01-12",
            logo: null,
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Approve vendor
  const approveVendor = async (id) => {
    try {
      await api.put(`/admin/vendors/${id}/approve`);
      alert("Vendor approved");
      setVendors((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      alert("Failed to approve vendor");
    }
  };

  // Reject vendor
  const rejectVendor = async (id) => {
    const reason = prompt("Reason for rejection?");
    if (!reason) return;

    try {
      await api.put(`/admin/vendors/${id}/reject`, { reason });
      alert("Vendor rejected");
      setVendors((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      alert("Failed to reject vendor");
    }
  };

  if (loading) return <div className="ava-root">Loading...</div>;

  return (
    <div className="ava-root">
      <h2>Pending Vendor Approvals</h2>

      {vendors.length === 0 ? (
        <div className="ava-empty">No pending vendors 🎉</div>
      ) : (
        <div className="ava-table">
          <table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Email</th>
                <th>Business</th>
                <th>Category</th>
                <th>Joined</th>
                <th>Logo</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((v) => (
                <tr key={v.id}>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.business_name}</td>
                  <td>{v.category}</td>
                  <td>{v.created_at}</td>
                  <td>
                    {v.logo ? (
                      <img src={v.logo} alt="logo" className="ava-logo" />
                    ) : (
                      "No logo"
                    )}
                  </td>
                  <td>
                    <button
                      className="ava-btn approve"
                      onClick={() => approveVendor(v.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="ava-btn reject"
                      onClick={() => rejectVendor(v.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
