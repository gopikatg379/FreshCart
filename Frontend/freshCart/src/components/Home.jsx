import React from 'react'
import Carousel from './Carousel'
import Navbar from './Navbar'
import OffersSection from './OfferSection'
import Category from './Category'
import FeaturedProduct from './FeaturedProduct'
import BestDeals from './BestDeals'
import InfoStrip from './InfoStrip'
import Footer from './Footer'
import '../assets/css/Home.css'
const Home = () => {
  return (
    <div>
      <div className='main-container'>
      <Carousel></Carousel>
      <Category></Category>
      <OffersSection></OffersSection>
      <FeaturedProduct></FeaturedProduct>
      <BestDeals></BestDeals>
      <InfoStrip></InfoStrip>
      </div>
    </div>
  )
}

export default Home
