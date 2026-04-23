import React, { useState } from 'react';
import Slider from 'react-slick';
import { ShoppingCart, Sprout } from 'lucide-react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from '../../context/CartContext';

import dashboardSlider1 from '../../assets/bgImages/dashboardSlider1.jpg';
import dashboardSlider2 from '../../assets/bgImages/dashboardSlider2.jpg';
import dashboardSlider3 from '../../assets/bgImages/dashboardSlider3.jpg';
import dashboardSlider4 from '../../assets/bgImages/dashboardSlider4.jpg';
import dashboardSlider5 from '../../assets/bgImages/dashboardSlider5.jpg';
import { useUser } from '../../context/UserContext';

const carouselSlides = [
  {
    image: dashboardSlider1,
    title: "What's new?",
    subtitle: "Check out our latest products"
  },
  {
    image: dashboardSlider2,
    title: "Fresh from the farm",
    subtitle: "Organic and healthy picks"
  },
  {
    image: dashboardSlider3,
    title: "Seasonal Specials",
    subtitle: "Limited time offers"
  },
  {
    image: dashboardSlider4,
    title: "Tomato Bonanza",
    subtitle: "Juicy and fresh tomatoes"
  },
  {
    image: dashboardSlider5,
    title: "Berry Delight",
    subtitle: "Sweet strawberries just for you"
  },
];

const DashboardPage = () => {
  const { cartItems, navigateToCart, currentPage, setCurrentPage, calculateTotalQuantity } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { username } = useUser();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true,
    focusOnSelect: true,
    swipeToSlide: true,
    adaptiveHeight: true,
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <>
      <style>{`
        /* Position dots at the top inside the carousel container */
        .slick-dots {
          position: absolute !important;
          top: 0.75rem; 
          left: 0;
          right: 0;
          margin: 0 auto !important;
          padding: 0 !important;
          width: 100%;
          display: flex !important;
          justify-content: center;
          z-index: 20;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: white;
          opacity: 0.7;
        }
        .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
      `}</style>

      <div className="flex-1 bg-gray-50 p-6 min-h-screen space-y-6 overflow-y-auto">

        {/* Greeting Section */}
        <div className="flex items-center mb-6 space-x-3">
          <span className="text-emerald-600 font-extrabold text-3xl">binhi.</span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 text-xl font-medium">Welcome back, {username}</span>
            <Sprout size={24} className="text-emerald-600" />
          </div>
        </div>

        {/* What's New Carousel */}
        <div className="relative h-[360px] rounded-lg overflow-hidden shadow-lg">
        <Slider {...settings}>
          {carouselSlides.map((slide, index) => (
            <div key={index} className="relative h-[360px] w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  filter: 'brightness(0.6)',
                }}
              />

              {/* Yellow to Green Gradient Overlay */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(to right, rgba(255, 255, 0, 0.4), rgba(34, 197, 94, 0.4))',
                  pointerEvents: 'none',
                }}
              />

              {/* Text Content */}
              <div className="absolute bottom-6 left-6 z-20 text-white max-w-lg">
                <h2 className="text-3xl font-extrabold mb-1">{slide.title}</h2>
                <p className="text-lg opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>

        </div>

        {/* Widgets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  slide-in-bottom">
          {/* Market Widget */}
          <div className="bg-white/80 backdrop-blur-md border border-yellow-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-yellow-600">Market</h2>
              <Sprout size={28} className="text-yellow-500" />
            </div>
            <p className="text-gray-700 text-sm mb-3">
              Discover farm-fresh produce curated just for you.
            </p>
            <button className="mt-2 inline-block bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition" onClick={() => setCurrentPage('market')}>
              Explore Market
            </button>
          </div>

          {/* Shopping Cart Widget */}
          <div className="bg-white/80 backdrop-blur-md border border-emerald-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-emerald-600">Shopping Cart</h2>
              <ShoppingCart size={28} className="text-emerald-500" />
            </div>
            <p className="text-gray-700 text-sm mb-3">You have items waiting to be checked out.</p>
            <div className="text-4xl font-extrabold text-emerald-700">{calculateTotalQuantity()}</div>
            <p className="text-sm text-gray-600 mt-1">item{calculateTotalQuantity().length !== 1 ? 's' : ''} in cart</p>
            <button className="mt-4 inline-block bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition" onClick={()=>setCurrentPage('cart')}>
              Go to Cart
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default DashboardPage;
