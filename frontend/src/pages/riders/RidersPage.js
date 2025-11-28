// src/pages/riders/RidersPage.js
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card";
import RiderCard from "../../components/RiderCard";

export default function RidersPage() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRiders = async () => {
    try {
      const res = await api.get("/riders");
      setRiders(res.data.riders || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load riders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const approve = async (rider) => {
    try {
      await api.put(`/riders/${rider.id}/approve`);
      setRiders((prev) => prev.map(r => r.id === rider.id ? {...r, is_approved: true, is_active:true} : r));
    } catch (err) {
      console.error(err);
      alert("Failed to approve rider");
    }
  };

  const suspend = async (rider) => {
    try {
      await api.put(`/riders/${rider.id}/suspend`);
      setRiders((prev) => prev.map(r => r.id === rider.id ? {...r, is_active: false} : r));
    } catch (err) {
      console.error(err);
      alert("Failed to suspend rider");
    }
  };

  const viewRider = (rider) => {
    // open map in new tab using coordinates if available
    if (rider.last_location && rider.last_location.lat && rider.last_location.lng) {
      const url = `https://www.google.com/maps?q=${rider.last_location.lat},${rider.last_location.lng}`;
      window.open(url, "_blank");
    } else {
      alert("No location available for this rider.");
    }
  };

  return (
    <div>
      <h2 className="page-title">Rider Management</h2>

      <Card>
        <p>Overview: approve riders, suspend, and view their last known location.</p>
      </Card>

      {loading ? (
        <p>Loading riders...</p>
      ) : riders.length === 0 ? (
        <Card>
          <p>No riders registered yet.</p>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {riders.map((rider) => (
            <RiderCard
              key={rider.id}
              rider={rider}
              onApprove={approve}
              onSuspend={suspend}
              onView={viewRider}
            />
          ))}
        </div>
      )}
    </div>
  );
}
