// src/pages/admin/VendorApprovalsPage.js
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card";
import "./VendorApprovalsPage.css";

export default function VendorApprovalsPage() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await api.get("/admin/vendors/pending");
      setPending(res.data.vendors || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const approve = async (id) => {
    try {
      await api.put(`/admin/vendors/${id}/approve`);
      setPending(p => p.filter(v => v.id !== id));
      alert("Vendor approved");
    } catch {
      alert("Failed to approve");
    }
  };

  const reject = async (id) => {
    try {
      await api.put(`/admin/vendors/${id}/reject`);
      setPending(p => p.filter(v => v.id !== id));
      alert("Vendor rejected");
    } catch {
      alert("Failed to reject");
    }
  };

  return (
    <div>
      <h2>Vendor Approvals</h2>
      {loading ? <p>Loading...</p> : pending.length === 0 ? <Card><p>No pending vendors</p></Card> :
        <div className="vendor-list">
          {pending.map(v => (
            <Card key={v.id}>
              <div className="vendor-row">
                <div>
                  <div className="vendor-name">{v.business_name}</div>
                  <div className="vendor-email">{v.email}</div>
                </div>

                <div className="vendor-actions">
                  <button className="btn btn-primary" onClick={() => approve(v.id)}>Approve</button>
                  <button className="btn btn-outline" onClick={() => reject(v.id)}>Reject</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      }
    </div>
  );
}
