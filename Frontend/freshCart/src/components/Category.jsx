import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../assets/css/Category.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import config from "../config"; 

const Category = () => {
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/get_category`);
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <h2 className="category-title">Featured Categories</h2>
        <div className="arrow-group">
          <button className="arrow-btn" onClick={() => scroll('left')}>
            <ChevronLeftIcon className="icon" />
          </button>
          <button className="arrow-btn" onClick={() => scroll('right')}>
            <ChevronRightIcon className="icon" />
          </button>
        </div>
      </div>

      <div className="category-scroll" ref={scrollRef}>
        {data.map((category, index) => (
          <div key={index} className="category-card" onClick={() => navigate(`/details/${category.category_id}`)}>
            <img src={category.category_image} alt={category.category_name} />
            <p>{category.category_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
