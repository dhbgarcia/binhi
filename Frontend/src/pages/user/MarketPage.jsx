import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';


import Slider from 'react-slick';
import productImages from '../../assets/products/productImages';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import marketAd1 from '../../assets/bgImages/marketAd1.jpg';
import marketAd2 from '../../assets/bgImages/marketAd2.jpg';
import marketAd3 from '../../assets/bgImages/marketAd3.jpg';
import marketAd4 from '../../assets/bgImages/marketAd4.jpg';
import marketAd5 from '../../assets/bgImages/marketAd5.jpg';
import { useUser } from '../../context/UserContext';
import { useSales } from '../../context/OrderContext';


const adSlides = [
  {
    image: marketAd1,
    title: "Get 10% Off!",
    subtitle: "On all fruits this week only.",
  },
  {
    image: marketAd2,
    title: "Healthy Eating Starts Here",
    subtitle: "Stock up on your greens today.",
  },
  {
    image: marketAd3,
    title: "Fresh Picks Daily",
    subtitle: "Locally sourced produce available now.",
  },
  {
    image: marketAd4,
    title: "Support Local Farmers",
    subtitle: "Your purchases help small businesses thrive.",
  },
  {
    image: marketAd5,
    title: "Sweet & Juicy Strawberries",
    subtitle: "Fresh from the farm to your table.",
  },
];


const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
dots: false,


  customPaging: () => (
    <div className="w-2 h-2 bg-white/70 rounded-full"></div>
  )
};

const MarketPage = () => {
  const { setErrorMessage } = useUser();
  const {addToCart} = useCart();
  const { products, categories } = useSales();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedItems, setAddedItems] = useState({});


  const handleAddToCart = (product) => {
    setAddedItems(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product._id]: false }));
    }, 1000);
    addToCart(product);
    console.log(product);
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto">

        {/* Ad Slider */}
        <div className="relative mb-6">
        <Slider {...sliderSettings}>
          {adSlides.map((slide, index) => (
            <div key={index} className="relative h-48 rounded-lg overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  filter: "brightness(0.6)",
                }}
              />
              
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(to right, rgba(255, 255, 0, 0.5), rgba(34, 197, 94, 0.5))',
                  pointerEvents: 'none',
                }}
              />

              {/* Text Content */}
              <div className="absolute bottom-4 left-6 z-10 text-white">
                <h3 className="text-xl font-bold">{slide.title}</h3>
                <p className="text-sm opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>

        </div>

        {/* Header */}
        <div className='slide-in-bottom'>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Marketplace</h1>
        <p className="text-gray-600 mb-6">
          Browse our selection of fresh produce and pantry essentials.
        </p>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-6 slide-in-bottom">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 border rounded-md text-sm transition ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
              }`}
            >
              {category[0].toUpperCase()+category.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.filter(
              (product) =>
                selectedCategory === 'All' || product.type === selectedCategory
            )
            .map((product) => (
              <div
                key={product._id}
                className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {addedItems[product._id] && (
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md z-10">
                    Added!
                  </div>
                )}

                <div className="relative">
                  <img
                    src={product.image || ''}
                    alt={product.pname}
                    className="w-full h-36 object-contain rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{product.pname}</h3>
                  <p className="text-emerald-600 font-semibold mt-1">
                    ₱{product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 inline-block w-full text-sm py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
