import React from 'react';
import './Homepage.scss';
import { buds, pixel, xbox } from '../../assets';
import { ArrowRightOutlined } from '@ant-design/icons';
import CategoriesSection from '../../Components/CategoriesSection/CategoriesSection';
import Bestdeals from '../../Components/Bestdeals/Bestdeals';
// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Homepage = () => {  
  // Create an array of slides
  const slides = [
    {
      title: "Xbox Consoles",
      text: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
      price: "$299",
      image: xbox,
    },
    {
      title: "PlayStation 5",
      text: "Next-gen gaming experience with lightning-fast loading.",
      price: "$499",
      image: xbox, // Replace with actual image
    },
    {
      title: "Nintendo Switch",
      text: "Hybrid gaming console for home and on-the-go play.",
      price: "$299",
      image: xbox, // Replace with actual image
    }
  ];

  return (
    <div className='home-page'>
      <div className="section-1">
       {/* Left Side: Swiper Slider */}
        <div className="left-side">
          <Swiper
            modules={[Pagination, Navigation,Autoplay]}
            spaceBetween={50}
             autoplay={{
    delay: 3000, // 5 seconds between slides
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  }}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            loop={true}
          className="mySwiper">
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="left-content">
                  <div className="text-section">
                    <p className="small-text">THE BEST PLACE TO PLAY</p>
                    <h1 className="main-heading">{slide.title}</h1>
                    <p className="description1">{slide.text}</p>
                    <button className="shop-btn">SHOP NOW <ArrowRightOutlined /></button>
                  </div> 
                  <div className="image-section">
                    <div className="price-tag">{slide.price}</div>
                    <img src={slide.image} alt={slide.title} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* Custom pagination container */}
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
        {/* Right Side: Promo Cards */}
        <div className="right-side">
          <div className="promo-card with-image-layout"> 
            <div className="promo-left">
              <p>SUMMER SALES</p>
              <h3>New Google Pixel 6 Pro</h3>
              <button className="shop-btn" style={{marginBottom:'40px'}}>SHOP NOW <ArrowRightOutlined /> </button>
            </div>
            <div className="promo-right">
              <div className="image-overlay">29% OFF</div>
              <img src={pixel} alt="Google Pixel" />
            </div>
          </div>

          <div className="promo-card custom-layout">
            <div className="custom-left">
              <img src={buds} alt="Xiaomi FlipBuds Pro" className="flipbuds-img" />
            </div>
            <div className="custom-right">
              <h3>Xiaomi FlipBuds Pro</h3>
              <p className="description2">$299 USD</p>
              <button className="shop-btn">SHOP NOW <ArrowRightOutlined /></button>
            </div>
          </div>
        </div>
      </div>
      <Bestdeals />
      <CategoriesSection />
    </div>
  );
};

export default Homepage;
