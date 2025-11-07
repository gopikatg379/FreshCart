import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../assets/css/FeaturedProduct.css'
import { FaPlus,FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import config from "../config";

const FeaturedProduct = () => {
    const [data,setData]=useState([])
    const navigate = useNavigate()
    const fetchData = async()=>{
      try{
        const response = await axios.get(`${config.BASE_URL}/get_featured`)
        setData(response.data)
      }catch(error){
        console.log("there was an error",error)
      }
    }
    const addCart = async(id)=>{
      try{
        const token = localStorage.getItem('access')
        if (!token) {
          navigate('/signin')
          return
        }
        await axios.post(`${config.BASE_URL}/add_cart/${id}`,null,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        alert("Product added to cart successfully!")
      }catch(error){
        console.log("There was an error",error)
      }
    }
    useEffect(()=>{
      fetchData()
    },[])
  return (
    <div className="featured-container">
      <h2 className="featured-title">Popular Products</h2>
      <div className="product-grid">
      {data.map((item, index) => {
  const product = item.featured_items;
  return (
    <div className="product-card" key={index}>
      <span className={item?.badge?.badge_name ? 'badge2' : ''}>
        {item?.badge?.badge_name ?? ''}
      </span>
      <img src={product.product_image} alt={product.product_name} className="product-img" />
      <p className="category">{product.product_category?.category_name || 'No Category'}</p>
      <h3 className="product-name">{product.product_name}</h3>
      <div className="rating">
        {'★'.repeat(Math.floor(product.average_rating))}
        {'☆'.repeat(5 - Math.floor(product.average_rating))}
        <span className="rating-value"> {product.average_rating.toFixed(1)} ({product.rating_count || 0})</span>
      </div>
      <div class="price-section">
      <div>
        <span class="price"><FaRupeeSign style={{fontSize:'10px'}}/>{item.our_price}</span>
        <span class="original-price"><FaRupeeSign style={{fontSize:'10px'}}/>{product.product_price}</span>
      </div>
      <button class="add-btn" onClick={() => addCart(product.product_id)}><FaPlus size={10} style={{ cursor: 'pointer', color: 'white',paddingRight:'5px' }} />Add</button>
    </div>
    </div>
  );
})}
      </div>
    </div>
  )
}

export default FeaturedProduct
