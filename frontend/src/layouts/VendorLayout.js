import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <div className={`page-content ${collapsed ? 'collapsed' : ''}`}>
        {children}
        <Footer />
      </div>
    </div>
  );
}
