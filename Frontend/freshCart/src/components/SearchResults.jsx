import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/SearchResults.css";
import { FaPlus,FaRupeeSign } from "react-icons/fa";
import config from "../config";

const SearchResults = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/search_products?search=${query}`);
        setProducts(res.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="search-results-container">
      <h2>Results for "{query}"</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={`${config.BASE_URL}${p.product_image}`} alt={p.product_name} />
            <p className="category">{p.product_category?.category_name || 'No Category'}</p>
            <h3 className="product-name">{p.product_name}</h3>
            <div className="rating">
              {'★'.repeat(Math.floor(p.average_rating))}
              {'☆'.repeat(5 - Math.floor(p.average_rating))}
              <span className="rating-value"> {p.average_rating.toFixed(1)} ({p.rating_count || 0})</span>
            </div>
            <div class="price-section">
            <div>
              <span class="price"><FaRupeeSign style={{fontSize:'10px'}}/>{p.product_price}</span>
            </div>
             <button class="add-btn" onClick={() => addCart(p.product_id)}><FaPlus size={10} style={{ cursor: 'pointer', color: 'white',paddingRight:'5px' }} />Add</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
