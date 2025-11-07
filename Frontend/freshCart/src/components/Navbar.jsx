import React, { useState, useEffect, useContext } from "react";
import { FaSearch, FaMapMarkerAlt, FaHeart, FaShoppingCart, FaTh, FaChevronDown, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "../assets/css/Navbar.css";
import img1 from '../assets/images/img1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import config from "../config";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const megaMenuCategories = [
    { title: "Dairy, Bread & Eggs", items: ["Butter", "Milk Drinks", "Curd & Yogurt", "Eggs", "Buns & Bakery", "Cheese", "Condensed Milk", "Dairy Products"] },
    { title: "Breakfast & Instant Food", items: ["Breakfast Cereal", "Noodles, Pasta & Soup", "Frozen Veg Snacks", "Frozen Non-Veg Snacks", "Vermicelli", "Instant Mixes", "Butter", "Fruit and Juices"] },
    { title: "Cold Drinks & Juices", items: ["Soft Drinks", "Fruit Juices", "Coldpress", "Water & Ice Cubes", "Soda & Mixers", "Health Drinks", "Herbal Drinks", "Milk Drinks"] },
  ];

  const accountItems = ["Sign In", "Sign Up", "Forgot Password"];

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/get_category`);
      setDepartments(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  const fetchCartItems = async () => {
    try {
      if (!user) return;
      const token = localStorage.getItem('access');
      if (!token) return;
      const res = await axios.get(`${config.BASE_URL}/view_cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.log("Error fetching cart items:", err);
    }
  };
  const handleSearchChange = async (query) => {
    setSearchTerm(query);
    if (query.trim().length > 1) {
      try {
        const res = await axios.get(`${config.BASE_URL}/search_products?search=${query}`);
        setSuggestions(res.data.slice(0, 5)); // show top 5
      } catch (err) {
        console.log("Search error:", err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (query) => {
    if (!query) return;
    setSuggestions([]);
    navigate(`/search/${query}`);
  };

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchCartItems(); }, [user]);

  const handleLogout = () => { logout(); navigate("/signin"); };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Top bar */}
        <div className="navbar-top">
          <div className="left-section">
            <h1 className="logo"><FaShoppingCart className="logo-icon" /> FreshCart</h1>
            <div className="search-location-container">
              <div className="search-bar">
              <input
                type="text"
                placeholder="Search for products"
                className="search-input"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <button className="search-btn" onClick={() => handleSearchSubmit(searchTerm)}>
                <FaSearch />
              </button>

              {suggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSearchSubmit(item.product_name)}
                    >
                      {item.product_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

              <button className="location-btn"><FaMapMarkerAlt /> Location</button>
            </div>
          </div>

          <div className="right-section">
            <div className="nav-icons">
              {user ? (
                <div className="user-icons-group">
                  <div className="icon-container"><FaHeart /> <span className="badge">5</span></div>

                  <div className="user-icon-container" onClick={() => setShowDropdown(!showDropdown)}>
                    {user.user_image ? <img src={`${config.BASE_URL}${user.user_image}`} alt="User" className="usericon1" /> : <div className="placeholder-icon" />}
                    {showDropdown && (
                      <div className="profile-dropdown">
                        <div className="profile-header">
                          <img src={`${config.BASE_URL}${user.user_image}`} alt="Profile" className="dropdown-avatar" />
                          <div><h4>{user.username}</h4><p>{user.email}</p></div>
                        </div>
                        <hr />
                        <a onClick={() => navigate('/profile')} className="dropdown-item">My Profile</a>
                        <a onClick={() => navigate('/orders')} className="dropdown-item">My Orders</a>
                        <button className="dropdown-item logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
                      </div>
                    )}
                  </div>

                  <div className="icon-container">
                    <FaShoppingCart /> <span className="badge">{cartItems.length}</span>
                  </div>
                </div>
              ) : (
                <button onClick={() => navigate('/signup')} className="usericon">Signup</button>
              )}
            </div>

            <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Bottom navbar */}
        <div className={`navbar-bottom ${isMobileMenuOpen ? "mobile-visible" : ""}`}>
          <div className="departments-container">
            <button className="departments-btn" onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}>
              <FaTh /> All Departments <FaChevronDown />
            </button>
            {isDepartmentsOpen && (
              <div className="departments-dropdown">
                {departments.map(d => <Link key={d.category_id} to={`/details/${d.category_id}`}>{d.category_name}</Link>)}
              </div>
            )}
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <a href="#">Stores</a>

            {/* Mega Menu */}
            <div className="mega-menu-container">
              <a href="#" onClick={e => { e.preventDefault(); setIsMegaMenuOpen(!isMegaMenuOpen); }}>
                Mega Menu <FaChevronDown />
              </a>
              {isMegaMenuOpen && (
                <div className="mega-menu-dropdown">
                  <div className="mega-menu-columns">
                    {megaMenuCategories.map((cat, i) => (
                      <div className="mega-menu-column" key={i}>
                        <h4>{cat.title}</h4>
                        {cat.items.map((item, j) => <a href="#" key={j}>{item}</a>)}
                      </div>
                    ))}
                  </div>
                  <div className="mega-menu-offer" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', height: '300px' }}>
                    <div className="offer-overlay">
                      <p>Don't miss <span style={{ color: 'white' }}>this</span> offer today.</p>
                      <h3>25% Off</h3>
                      <button>Shop Now</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#">Pages</a>
            <Link to="/admin">Dashboard</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
