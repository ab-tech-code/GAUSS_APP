// src/components/RiderCard.js
import React from "react";
import Button from "./Button";
import "./RiderCard.css";

export default function RiderCard({ rider, onApprove, onSuspend, onView }) {
  return (
    <div className="rider-card">
      {/* Rider Image */}
      <div className="rider-image-box">
        <img
          src={rider.avatar_url || "/logo192.png"}
          alt={rider.name}
          className="rider-img"
        />
      </div>

      {/* Rider Info */}
      <div className="rider-info">
        <h3 className="rider-name">{rider.name}</h3>
        <p className="rider-phone">{rider.phone}</p>

        <p className="rider-status">
          Status:{" "}
          <span className={rider.is_active ? "active" : "inactive"}>
            {rider.is_active ? "Active" : "Inactive"}
          </span>
        </p>

        <p className="rider-deliveries">
          Deliveries Completed:{" "}
          <strong>{rider.deliveries_completed || 0}</strong>
        </p>
      </div>

      {/* Actions */}
      <div className="rider-actions">
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
  );
}
