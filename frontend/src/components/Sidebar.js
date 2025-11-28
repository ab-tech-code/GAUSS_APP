import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Sidebar({ collapsed, toggleSidebar }) {
  const location = useLocation();

  return (
    <div
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${
        collapsed === false ? 'open' : ''
      }`}
    >
      <div className="sidebar-header">
        <img src={logo} alt="logo" className="sidebar-logo" />
        {!collapsed && <span>GAUSS Vendor</span>}
      </div>

      <ul className="sidebar-menu">
        {[
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Orders', path: '/orders' },
          { name: 'Products', path: '/products' },
          { name: 'Analytics', path: '/analytics' },
          { name: 'Settings', path: '/settings' },
          { name: 'Profile', path: '/profile' },
        ].map((item, i) => (
          <li
            key={i}
            className={`sidebar-item ${
              location.pathname.startsWith(item.path) ? 'active' : ''
            }`}
            onClick={toggleSidebar}
          >
            <Link to={item.path}>{!collapsed ? item.name : item.name[0]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
