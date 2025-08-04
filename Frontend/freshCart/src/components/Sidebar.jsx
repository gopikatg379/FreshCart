import React from 'react';
import '../assets/css/Sidebar.css';
import { FaHome, FaBox, FaList,FaShoppingCart, FaShoppingBag, FaStore, FaUsers, FaStar, FaCogs, FaBlog, FaImage, FaChevronDown } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3">
      <div className="brand mb-4">
        <FaShoppingCart className="icon" />
        <span className="brand-name">FreshCart</span>
      </div>

      <ul className="nav flex-column">
        <li><a href="#" className="nav-link"><FaHome className="icon1" /> Dashboard</a></li>
        
        <p className="section-title">Store Managements</p>
        <li><a href="#" className="nav-link"><FaBox className="icon1" /> Products</a></li>
        <li><a href="#" className="nav-link"><FaList className="icon1" /> Categories</a></li>
        <li><a href="#" className="nav-link"><FaShoppingBag className="icon1" /> Orders <FaChevronDown className="float-end" /></a></li>
        <li><a href="#" className="nav-link"><FaStore className="icon1" /> Sellers / Vendors</a></li>
        <li><a href="#" className="nav-link"><FaUsers className="icon1" /> Customers <FaChevronDown className="float-end" /></a></li>
        <li><a href="#" className="nav-link"><FaStar className="icon1" /> Reviews</a></li>
        <li><a href="#" className="nav-link"><FaCogs className="icon1" /> Menu Level <FaChevronDown className="float-end" /></a></li>

        <p className="section-title">Site Settings</p>
        <li><a href="#" className="nav-link"><FaBlog className="icon1" /> Blog <FaChevronDown className="float-end" /></a></li>
        <li><a href="#" className="nav-link disabled"><FaImage className="icon" /> Media</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
