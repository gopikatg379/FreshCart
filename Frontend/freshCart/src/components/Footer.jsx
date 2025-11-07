import React from 'react';
import '../assets/css/Footer.css';
import { CiInstagram } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div>
          <h4>Categories</h4>
          <ul>
            <li>Vegetables & Fruits</li>
            <li>Breakfast & instant food</li>
            <li>Bakery & Biscuits</li>
            <li>Atta, rice & dal</li>
            <li>Sauces & spreads</li>
            <li>Organic & gourmet</li>
            <li>Baby care</li>
            <li>Cleaning essentials</li>
            <li>Personal care</li>
            <li>Dairy, bread & eggs</li>
            <li>Cold drinks & juices</li>
            <li>Tea, coffee & drinks</li>
            <li>Masala, oil & more</li>
            <li>Chicken, meat & fish</li>
            <li>Paan corner</li>
            <li>Pharma & wellness</li>
            <li>Home & office</li>
            <li>Pet care</li>
          </ul>
        </div>

        <div>
          <h4>Get to know us</h4>
          <ul>
            <li>Company</li>
            <li>About</li>
            <li>Blog</li>
            <li>Help Center</li>
            <li>Our Value</li>
          </ul>
        </div>

        <div>
          <h4>For Consumers</h4>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Product Returns</li>
            <li>FAQ</li>
            <li>Shop Checkout</li>
          </ul>
        </div>

        <div>
          <h4>Become a Shopper</h4>
          <ul>
            <li>Shopper Opportunities</li>
            <li>Become a Shopper</li>
            <li>Earnings</li>
            <li>Ideas & Guides</li>
            <li>New Retailers</li>
          </ul>
        </div>

        <div>
          <h4>Freshcart programs</h4>
          <ul>
            <li>Freshcart programs</li>
            <li>Gift Cards</li>
            <li>Promos & Coupons</li>
            <li>Freshcart Ads</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="payment-partners">
          <strong>Payment Partners</strong>
          <div className="partners-icons" style={{marginTop:'10px'}}>
            <img src="/images/amazon.png" alt="Amazon Pay" />
            <img src="/images/american.png" alt="American Express" />
            <img src="/images/mastercard.jpg" alt="MasterCard" />
            <img src="/images/paypal.webp" alt="PayPal" />
            <img src="/images/visa.png" alt="Visa" />
          </div>
        </div>

        <div className="footer-right">
          <p>Get deliveries with FreshCart</p>
          <div className="app-links">
            <img src="/images/appstore.png" alt="App Store" />
            <img src="/images/playstore.jpg" alt="Google Play" />
          </div>
        </div>
      </div>

      <div className="footer-bottom-text">
        <p>© 2025 FreshCart Powered by <span>XCodes</span>.</p>
        <div className="social-icons">
          <button><FaFacebookF /></button>
          <button><FaXTwitter /></button>
          <button><CiInstagram /></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
