// src/pages/orders/OrdersPage.js
import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import {
  listenToOrderUpdates,
  listenToNewOrder,
} from '../../services/socket';
import { AuthContext } from '../../contexts/AuthContext';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { vendor } = useContext(AuthContext);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 Real-time listeners
  useEffect(() => {
    // New order added
    listenToNewOrder((newOrder) => {
      setOrders((prev) => [newOrder, ...prev]);
    });

    // Order status updated
    listenToOrderUpdates((updatedOrder) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    });
  }, [vendor]);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      // realtime will update ui automatically
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const statusColors = {
    pending: "#999",
    accepted: "#1890FF",
    preparing: "#FF9900",
    ready: "#52C41A",
    completed: "#00AA55",
    cancelled: "#FF4D4F",
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Orders</h2>
      </div>

      <Card title="All Orders">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total (₦)</th>
                <th>Status</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.total_amount}</td>

                  <td>
                    <span
                      style={{
                        padding: "6px 10px",
                        background: "#f5f5f5",
                        borderRadius: "6px",
                        color: statusColors[order.status],
                        textTransform: "capitalize",
                        fontWeight: 600,
                      }}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>{new Date(order.created_at).toLocaleString()}</td>

                  <td style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {order.status !== 'accepted' && (
                      <Button onClick={() => updateStatus(order.id, "accepted")}>
                        Accept
                      </Button>
                    )}

                    {order.status !== 'preparing' && (
                      <Button variant="outline"
                        onClick={() => updateStatus(order.id, "preparing")}
                      >
                        Preparing
                      </Button>
                    )}

                    {order.status !== 'ready' && (
                      <Button onClick={() => updateStatus(order.id, "ready")}>
                        Ready
                      </Button>
                    )}

                    {order.status !== 'completed' && (
                      <Button variant="success"
                        onClick={() => updateStatus(order.id, "completed")}
                      >
                        Complete
                      </Button>
                    )}

                    {order.status !== 'cancelled' && (
                      <Button variant="danger"
                        onClick={() => updateStatus(order.id, "cancelled")}
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
