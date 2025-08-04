import React from 'react';
import { FaBell } from 'react-icons/fa';
import '../assets/css/AdminNav.css';

const AdminNav = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-content">
        <div className="search-bar1">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
          />
        </div>

        <div className="right-section">
          <div className="notification-icon">
            <FaBell className="bell-icon" />
            <span className="notification-badge">2</span>
          </div>
          <img
            src="/src/assets/images/vaiga.jpeg"
            alt="Profile"
            className="profile-pic"
          />
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
