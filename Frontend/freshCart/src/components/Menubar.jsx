import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/css/Menubar.css'
import config from "../config";
const Menubar = () => {
    const [data,setData]=useState([])
    const fetchCategory = async()=>{
        try{
            const response = await axios.get(`${config.BASE_URL}/get_category`)
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    useEffect(()=>{
        fetchCategory()
    },[])
  return (
    <>
 <div className="menubar-container">
      <div className="category-section">
        <h3 className="category-title">Categories</h3>
        {data.map((x, index) => (
          <p
            key={index}
            className="category-item"
            onClick={() => navigate(`/details/${x.category_id}`)}
          >
            {x.category_name}
          </p>
        ))}
      </div>

      <div className="promo-card1">
        <h3>100% Organic Coffee Beans.</h3>
        <p>Get the best deal before close.</p>
        <button className="shop-btn">Shop Now →</button>
      </div>
    </div>
    </>
  )
}

export default Menubar
