import React from 'react';

export default function Header({ collapsed, toggleSidebar }) {
  return (
    <header className={`header ${collapsed ? 'collapsed' : ''}`}>
      <div className="hamburger" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h3>GAUSS</h3>
    </header>
  );
}
