import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/BestDeals.css'
import { useNavigate } from 'react-router-dom';
import config from "../config"; 
const BestDeals = () => {
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/get_best`);
      const currentTime = new Date().getTime();

      const updatedDeals = res.data.map(deal => {
        const targetTime = currentTime + deal.deal_duration * 1000;
        return { ...deal, targetTime };
      });

      setDeals(updatedDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };
  const addCart = async(id)=>{
        try{
          const token = localStorage.getItem('access')
          if (!token) {
            navigate('/signin')
            return
          }
          await axios.post(`${config.BASE_URL}/add_cart/${id}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          alert("Product added to cart successfully!")
        }catch(error){
          console.log("There was an error",error)
        }
      }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeals(prevDeals =>
        prevDeals.map(deal => {
          const now = new Date().getTime();
          const distance = deal.targetTime - now;

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          return {
            ...deal,
            countdown: distance > 0 ? { days, hours, minutes, seconds } : { days: 0, hours: 0, minutes: 0, seconds: 0 }
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [deals]);

  return (
    <div className="best-deals-container">
      <h2 className="section-title">Daily Best Deals</h2>
      <div className="best-deals-wrapper">
        <div className="promo-card">
          <h3>100% Organic Coffee Beans.</h3>
          <p>Get the best deal before close.</p>
          <button className="shop-btn">Shop Now →</button>
        </div>
      <div className="product-list1">
        {deals.map((deal, index) => {
          const item = deal.deal_items;
          const countdown = deal.countdown || { days: 0, hours: 0, minutes: 0, seconds: 0 };
          return (
            <div className="product-card2" key={index}>
              <img src={item.product_image} alt={item.product_name} className="product-image1" />
              <p className="category1">{item.product_category.category_name}</p>
              <h4 className="product-name1">{item.product_name}</h4>
              <p className="vendor1">By {item.vendor}</p>
              <div className="price-rating1">
                <span className="new-price1">₹{item.product_price}</span>
                <span className="stars1">⭐ {item.average_rating}</span>
              </div>
              <div className="timer1">
                <div className='count1'><strong>{countdown.days}</strong><span>Days</span></div>
                <div className='count1'><strong>{countdown.hours}</strong><span>Hours</span></div>
                <div className='count1'><strong>{countdown.minutes}</strong><span>Mins</span></div>
                <div className='count1'><strong>{countdown.seconds}</strong><span>Sec</span></div>
              </div>
              <button className="add-btn2" onClick={() => addCart(item.product_id)}>+ Add to Cart</button>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default BestDeals;
