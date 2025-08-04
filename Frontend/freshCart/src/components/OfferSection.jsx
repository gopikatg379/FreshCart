import React from "react";
import "../assets/css/OfferSection.css";

const OffersSection = () => {
  return (
    <div className="offers-container">
      <div className="offer-card fruits">
        <div className="offer-text">
          <h2>Fruits & Vegetables</h2>
          <p>Get Upto <strong>30%</strong> Off</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </div>

      <div className="offer-card buns">
        <div className="offer-text">
          <h2>Freshly Baked Buns</h2>
          <p>Get Upto <strong>25%</strong> Off</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;