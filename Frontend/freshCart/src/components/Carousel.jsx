import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../assets/css/Carousel.css"; 

const Carousel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        320: { slidesPerView: 1 },  
        768: { slidesPerView: 1 }, 
        1024: { slidesPerView: 1 }, 
      }}
      className="custom-carousel"
    >
     
      <SwiperSlide>
        <div className="carousel-slide">
          <img
            src="/images/img5.jpg"
            alt="Grocery Sale"
            className="carousel-image"
          />
          <div className="carousel-content">
            <span className="badge1">Opening Sale Discount 50%</span>
            <h2>SuperMarket For Fresh Grocery</h2>
            <p className="para1">Introduced a new model for online grocery shopping and convenient home delivery.</p>
            <button className="shop-now">Shop Now →</button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="carousel-slide">
          <img
            src="/images/img3.jpg"
            alt="Fresh Fruits"
            className="carousel-image"
          />
          <div className="carousel-content">
            <span className="badge1">Fresh Fruits Available</span>
            <h2>Get Organic Fruits At Best Prices</h2>
            <p className="para1">100% fresh and organic fruits, delivered at your doorstep.</p>
            <button className="shop-now">Shop Now →</button>
          </div>
        </div>
      </SwiperSlide>

    </Swiper>
  );
};

export default Carousel;
