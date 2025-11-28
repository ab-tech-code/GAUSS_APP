// src/pages/dashboard/DashboardPage.js
import React from 'react';
import Card from '../../components/Card';

export default function DashboardPage() {
  return (
    <div>
      <h2 className="page-title">Dashboard Overview</h2>

      <div className="grid">
        <Card title="Today's Orders">
          <p>Number of orders placed today will appear here.</p>
        </Card>

        <Card title="Revenue Summary">
          <p>Your earnings summary for today/this week.</p>
        </Card>

        <Card title="Pending Items">
          <p>Pending orders, items low in stock, or flagged issues.</p>
        </Card>

        <Card title="Real-time Order Status">
          <p>Live updates appear here using WebSocket in future steps.</p>
        </Card>
      </div>

      <div className="grid" style={{ marginTop: '20px' }}>
        <Card title="Quick Actions">
          <ul style={{ lineHeight: '1.8' }}>
            <li>Manage Products</li>
            <li>View Active Orders</li>
            <li>Store Settings</li>
          </ul>
        </Card>

        <Card title="Performance Insights">
          <p>Chart insights will appear here (sales, cancellations, etc.).</p>
        </Card>
      </div>
    </div>
  );
}
