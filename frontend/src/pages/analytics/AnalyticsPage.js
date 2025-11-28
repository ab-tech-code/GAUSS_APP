// src/pages/analytics/AnalyticsPage.js
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  Tooltip as ReTooltip,
} from 'recharts';
import api from '../../services/api';

export default function AnalyticsPage() {
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);

  // Fallback sample data so charts render before backend exists
  const sampleSales = [
    { date: '2025-10-22', total: 12000 },
    { date: '2025-10-23', total: 8000 },
    { date: '2025-10-24', total: 14000 },
    { date: '2025-10-25', total: 9000 },
    { date: '2025-10-26', total: 16000 },
    { date: '2025-10-27', total: 20000 },
    { date: '2025-10-28', total: 18000 },
  ];

  const sampleTop = [
    { name: 'Jollof Rice', sold: 150 },
    { name: 'Fried Plantain', sold: 120 },
    { name: 'Chicken Suya', sold: 95 },
    { name: 'Eba & Soup', sold: 80 },
    { name: 'Vegetable Salad', sold: 60 },
  ];

  useEffect(() => {
    const fetchSales = async () => {
      setLoadingSales(true);
      try {
        const res = await api.get('/vendor/analytics/sales?range=30');
        // Expecting res.data = [{date: '2025-11-01', total: 12345}, ...]
        if (res.data && Array.isArray(res.data)) {
          setSalesData(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          setSalesData(res.data.data);
        } else {
          setSalesData(sampleSales);
        }
      } catch (err) {
        console.warn('Failed to load sales analytics, using sample data', err);
        setSalesData(sampleSales);
      } finally {
        setLoadingSales(false);
      }
    };

    const fetchTop = async () => {
      setLoadingTop(true);
      try {
        const res = await api.get('/vendor/analytics/top-products');
        // Expecting res.data = [{ name: 'X', sold: 123 }, ...]
        if (res.data && Array.isArray(res.data)) {
          setTopProducts(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          setTopProducts(res.data.data);
        } else {
          setTopProducts(sampleTop);
        }
      } catch (err) {
        console.warn('Failed to load top products, using sample data', err);
        setTopProducts(sampleTop);
      } finally {
        setLoadingTop(false);
      }
    };

    fetchSales();
    fetchTop();
  }, []);

  return (
    <div>
      <h2 className="page-title">Analytics & Performance</h2>

      <div className="grid">
        <Card title="Sales (Last 30 days)">
          {loadingSales ? (
            <p>Loading sales data...</p>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={salesData}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="date" tickFormatter={(d) => d} />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#ff4d4f"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Top Selling Products">
          {loadingTop ? (
            <p>Loading top products...</p>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="sold" fill="#ff4d4f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <Card title="Revenue Breakdown (by category)">
          <p>
            Add a category breakdown chart here (pie/donut). Backend endpoint:
            <code> GET /vendor/analytics/revenue-by-category </code>
          </p>
        </Card>

        <Card title="Orders vs Cancellations">
          <p>
            Add a comparative chart here. Backend endpoint:
            <code> GET /vendor/analytics/orders-summary </code>
          </p>
        </Card>
      </div>
    </div>
  );
}
