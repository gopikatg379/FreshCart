import React from 'react';
import '../assets/css/InfoStrip.css';
import { FaClock, FaGift, FaCube, FaRedo } from 'react-icons/fa';

const InfoStrip = () => {
  const items = [
    {
      icon: <FaClock size={28} color="green" />,
      title: '10 minute grocery now',
      description: 'Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.',
    },
    {
      icon: <FaGift size={28} color="green" />,
      title: 'Best Prices & Offers',
      description: 'Cheaper prices than your local supermarket, great cashback offers to top it off. Get best prices & offers.',
    },
    {
      icon: <FaCube size={28} color="green" />,
      title: 'Wide Assortment',
      description: 'Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg & other categories.',
    },
    {
      icon: <FaRedo size={28} color="green" />,
      title: 'Easy Returns',
      description: 'Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked policy.',
    },
  ];

  return (
    <div className="info-strip">
      {items.map((item, index) => (
        <div key={index} className="info-item">
          <div className="info-icon">{item.icon}</div>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoStrip;
