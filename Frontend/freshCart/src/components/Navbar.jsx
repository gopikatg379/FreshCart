import React, { useState, useEffect, useSyncExternalStore ,useContext } from "react";
import { FaSearch, FaMapMarkerAlt, FaHeart, FaUser, FaShoppingCart, FaTh, FaChevronDown, FaBars, FaTimes,FaSignOutAlt } from "react-icons/fa";
import "../assets/css/Navbar.css";
import img1 from '../assets/images/img1.jpg';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments,setDepartments]=useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDepartments = () => {
    setIsDepartmentsOpen(!isDepartmentsOpen);
    if (!isDepartmentsOpen) {
      setIsMegaMenuOpen(false);
    }
  };

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
    if (!isMegaMenuOpen) {
      setIsDepartmentsOpen(false);
    }
  };
  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
    if (!isAccountMenuOpen) {
      setIsDepartmentsOpen(false);
      setIsMegaMenuOpen(false);
    }
  };
  const toggleDropdowns = () => {
    setShowDropdown(prev => !prev);
  };
  const closeAllDropdowns = () => {
    setIsDepartmentsOpen(false);
    setIsMegaMenuOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
    setIsSignInMode(false);
  };
  const closeModal = () => setIsModalOpen(false); 
  const fetchCategories = async()=>{
    const response = await axios.get('http://127.0.0.1:8000/get_category')
    setDepartments(response.data)
  }
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const accountItems = [
    "Sign In",
    "Sign Up",
    "Forgot Password"
  ]
  const megaMenuCategories = [
    {
      title: "Dairy, Bread & Eggs",
      items: [
        "Butter", "Milk Drinks", "Curd & Yogurt", "Eggs", 
        "Buns & Bakery", "Cheese", "Condensed Milk", "Dairy Products"
      ]
    },
    {
      title: "Breakfast & Instant Food",
      items: [
        "Breakfast Cereal", "Noodles, Pasta & Soup", "Frozen Veg Snacks", 
        "Frozen Non-Veg Snacks", "Vermicelli", "Instant Mixes", 
        "Butter", "Fruit and Juices"
      ]
    },
    {
      title: "Cold Drinks & Juices",
      items: [
        "Soft Drinks", "Fruit Juices", "Coldpress", "Water & Ice Cubes", 
        "Soda & Mixers", "Health Drinks", "Herbal Drinks", "Milk Drinks"
      ]
    }
  ];

  
  const handleLogout = () => {
    logout();  
    navigate("/signin");
  };
  const fetchCartItem=async(token)=>{
    try{
      const res = await axios.get('http://127.0.0.1:8000/view_cart',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      setCartItems(res.data)
    }catch(error){
      console.log("There was an error",error)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('access');
    console.log('Token found:', token);
    if (token) {
      fetchCartItem(token);
    } else {
      console.log('No token found, redirecting to login');
      navigate('/signin');
    }
  
    fetchCategories();  
    
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-top">
          <div className="left-section">
            <h1 className="logo">
              <FaShoppingCart className="logo-icon" />
              <span>FreshCart</span>
            </h1>
            
            <div className="search-location-container">
              <div className="search-bar">
                <input type="text" placeholder="Search for products" className="search-input" />
                <button className="search-btn">
                  <FaSearch className="search-icon" />
                </button>
              </div>
              <button className="location-btn">
                <FaMapMarkerAlt className="icon" /> Location
              </button>
            </div>
          </div>

          <div className="right-section">
            <div className="nav-icons">
              
                {user ? (
                  <div className="user-icons-group">
                 <div className="icon-container">
                  <FaHeart className="icon" />
                  <span className="badge">5</span>
                </div> 
                <div className="user-icon-container" onClick={toggleDropdowns}>
                  {user.user_image ? (
                    <img
                      src={`http://127.0.0.1:8000${user.user_image}`}
                      alt="User Profile"
                      className="usericon1"
                      style={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <div className="placeholder-icon" />
                  )}
                  {showDropdown && (
                    <div className="dropdown-menu1">
                      <a href="#" onClick={() => navigate('/profile')}>My Profile</a>
                      <button onClick={handleLogout}>Logout <FaSignOutAlt /></button>
                    </div>
                  )}
                </div>
                <div className="icon-container">
                  <FaShoppingCart className="icon" />
                  <span className="badge">{cartItems?.length > 0 ? cartItems.length : 0}</span>
                </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/signup')}
                  className="usericon"
                  style={{ cursor: 'pointer' }}
                >Signup</button>
              )}

              
            </div>

            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-top-elements">
            <div className="mobile-search-bar">
              <input type="text" placeholder="Search products..." />
              <button className="mobile-search-btn">
                <FaSearch />
              </button>
            </div>
            <button className="mobile-location-btn">
              <FaMapMarkerAlt /> Location
            </button>
            <div className="mobile-nav-icons">
              <div className="mobile-icon-container">
                <FaHeart />
                <span className="mobile-badge">5</span>
              </div>
              <div className="mobile-icon-container">
                <FaUser />
              </div>
              <div className="mobile-icon-container">
                <FaShoppingCart />
                <span className="mobile-badge">0</span>
              </div>
            </div>
          </div>
        )}
        <div className={`navbar-bottom ${isMobileMenuOpen ? "mobile-visible" : ""}`}>
          <div className="departments-container">
            <button 
              className="departments-btn"
              onClick={toggleDepartments}
            >
              <FaTh className="icon" style={{ color: 'white' }} /> All Departments
              <FaChevronDown className="dropdown-arrow" />
            </button>
            
            {isDepartmentsOpen && (
              <div className="departments-dropdown">
                {departments.map((item, index) => (
                  <Link to={`/details/${item.category_id}`} key={index} className="dropdown-item" onClick={closeAllDropdowns}>{item.category_name}</Link>
                ))}
              </div>
            )}
          </div>

          <div className="nav-links">
            <Link to={'/'} onClick={closeAllDropdowns}>Home</Link>
            <a href="#" onClick={closeAllDropdowns}>Stores</a>
            
            <div className="mega-menu-container">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                toggleMegaMenu();
              }}>
                Mega menu <FaChevronDown className="down-arrow" />
              </a>
              
              {isMegaMenuOpen && (
                <>
                  <div className="mega-menu-dropdown">
                    <div className="mega-menu-columns">
                      {megaMenuCategories.map((category, index) => (
                        <div className="mega-menu-column" key={index}>
                          <h4>{category.title}</h4>
                          <div className="mega-menu-items">
                            {category.items.map((item, i) => (
                              <a href="#" key={i} className="mega-menu-item" onClick={closeAllDropdowns}>
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mega-menu-offer" style={{
                        backgroundImage: `url(${img1})`,
                        backgroundSize: 'cover',
                        height: '300px',
                    }}>
                        <div className="offer-overlay">
                      <p>Don't miss <span style={{color:'white'}}>this</span> offer today.</p>
                      <h3>25% Off</h3>
                      <button className="offer-button" onClick={closeAllDropdowns}>Shop Now</button>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="dropdown-backdrop"
                    onClick={closeAllDropdowns}
                  />
                </>
              )}
            </div>
            
            <a href="#" onClick={closeAllDropdowns}>Pages</a>
            <div className="account-container">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                toggleAccountMenu();
              }}>
                Account <FaChevronDown className="down-arrow" />
              </a>
              
              {isAccountMenuOpen && (
                <div className="account-dropdown">
                  {accountItems.map((item, index) => (
                    <a href="#" key={index} className="dropdown-item" onClick={closeAllDropdowns}>{item}</a>
                  ))}
                </div>
              )}
            </div>
            <Link to='/admin' onClick={closeAllDropdowns}>Dashboard</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;