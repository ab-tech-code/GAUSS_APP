// src/pages/admin/RiderApprovalsPage.js
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card";
import "./RiderApprovalsPage.css";

export default function RiderApprovalsPage() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await api.get("/admin/riders/pending");
      setPending(res.data.riders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const approve = async (id) => {
    try {
      await api.put(`/admin/riders/${id}/approve`);
      setPending(p => p.filter(r => r.id !== id));
      alert("Rider approved");
    } catch {
      alert("Failed to approve");
    }
  };

  const reject = async (id) => {
    try {
      await api.put(`/admin/riders/${id}/reject`);
      setPending(p => p.filter(r => r.id !== id));
      alert("Rider rejected");
    } catch {
      alert("Failed to reject");
    }
  };

  return (
    <div>
      <h2>Rider Approvals</h2>
      {loading ? <p>Loading...</p> : pending.length === 0 ? <Card><p>No pending riders</p></Card> :
        <div className="rider-list">
          {pending.map(r => (
            <Card key={r.id}>
              <div className="rider-row">
                <div>
                  <div className="rider-name">{r.name}</div>
                  <div className="rider-phone">{r.phone}</div>
                </div>

                <div className="rider-actions">
                  <button className="btn btn-primary" onClick={() => approve(r.id)}>Approve</button>
                  <button className="btn btn-outline" onClick={() => reject(r.id)}>Reject</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      }
    </div>
  );
}
