import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Menubar from './Menubar'
import Navbar from './Navbar'
import '../assets/css/Details.css'
import Footer from './Footer'
import {FaRupeeSign } from "react-icons/fa";
import config from "../config"; 

const Details = () => {
    const {id}=useParams()
    const navigate = useNavigate()
    const [cat,setCat]=useState({})
    const [data,setData]=useState([])
    const fetchCategory = async()=>{
        try{
            const response = await axios.get(`${config.BASE_URL}/one_category/${id}`)
            setCat(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const fetchData=async()=>{
        try{
            const response = await axios.get(`${config.BASE_URL}/get_category_product/${id}`)
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const addCart = async()=>{
      try{
        const token = localStorage.getItem('access')
        if (!token) {
          navigate('/signin')
          return
        }
        await axios.post(`${config.BASE_URL}/add_cart/${id}`,{},{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        alert("Product added to cart successfully!")
      }catch(error){
        console.log("There was an error",error)
        if (error.response && error.response.status === 401) {
        // Token invalid or expired
        localStorage.removeItem('access')  // clear old token
        navigate('/signin')
    }
      }
      
    }
    useEffect(()=>{
        fetchData(),
        fetchCategory()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[id])
  return (
    <div>
    <div className="details-container">
      <Menubar></Menubar>
      <div className="content-area">
    <div className="category-content">
      <h2>{cat.category_name}</h2>
    </div>

    <div className="product-grid">
      {data.map((product, index) => (
        <div className="product-card1" key={index}>
          <img src={`${config.BASE_URL}${product.product_image}`} alt={product.flower_name} />
          <p className="category-text">{cat.category_name}</p>
          <h3>{product.product_name}</h3>
          <div className="rating">
            <span>⭐</span> {product.average_rating || "4.5"} ({product.reviews || "100"})
          </div>
          <div className="price">
            <FaRupeeSign style={{fontSize:'10px'}}/>{product.product_price}
          </div>
          <button className="add-btn" onClick={addCart}>+ Add</button>
        </div>
      ))}
    </div>
  </div>
    </div>
    </div>
  )
}

export default Details
