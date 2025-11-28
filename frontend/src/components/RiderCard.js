// src/components/RiderCard.js
import React from "react";
import Button from "./Button";

export default function RiderCard({ rider, onApprove, onSuspend, onView }) {
  return (
    <div className="card">
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img
          src={rider.avatar_url || "/logo192.png"}
          alt={rider.name}
          style={{ width: 72, height: 72, borderRadius: 8, objectFit: "cover" }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>{rider.name}</div>
          <div style={{ color: "#666", fontSize: 14 }}>{rider.phone}</div>
          <div style={{ color: "#666", fontSize: 13, marginTop: 6 }}>
            Status: <strong>{rider.is_active ? "Active" : "Inactive"}</strong>
          </div>
          <div style={{ color: "#666", fontSize: 13 }}>
            Deliveries: {rider.deliveries_completed || 0}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Button variant="outline" onClick={() => onView(rider)}>
            View
          </Button>

          {rider.is_approved ? (
            <Button variant="danger" onClick={() => onSuspend(rider)}>
              Suspend
            </Button>
          ) : (
            <Button variant="primary" onClick={() => onApprove(rider)}>
              Approve
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
