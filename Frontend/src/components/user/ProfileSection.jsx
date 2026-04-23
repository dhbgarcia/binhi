import React from 'react';
import { ShoppingCart, LogOut } from 'lucide-react';
import bgImage from '../../assets/bgImages/profile-bg.png'; // Adjust the path if needed
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext';

const ProfileSection = () => {
  const navigate = useNavigate();
  const {username, email} = useUser();
  const { calculateTotal, calculateTotalQuantity } = useCart();

  const signOut = () => {
    localStorage.removeItem("token");
    navigate('/signin')
  }

  return(
    <div
      className="w-72 h-screen p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-emerald-900 bg-opacity-20 z-0" />

      {/* Content above background */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Profile Info */}
        <div className="flex flex-col items-center mb-10 mt-6">
          <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-yellow-300 rounded-full shadow-lg flex items-center justify-center text-emerald-900 font-extrabold text-5xl select-none mb-4 ring-4 ring-yellow-300/70">
            {username[0]}
          </div>
          <p className="text-sm text-yellow-200 tracking-wide mb-1 text-center font-medium">{username}</p>
          <p className="text-xl font-semibold tracking-wide text-yellow-50 text-center truncate max-w-full">
            {email}
          </p>
        </div>

        {/* Online Profile Button */}
        {/* <button
          className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-emerald-900 font-semibold px-10 py-3 rounded-full shadow-md transition duration-300 w-full
          flex items-center justify-center gap-3 tracking-wide select-none"
          aria-label="Go to online profile"
        >
          View Profile
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button> */}

        {/* Shopping Cart Section */}
        <div className="bg-emerald-800 rounded-lg p-6 shadow-inner my-6">
          <div className="flex items-center mb-4">
            <ShoppingCart className="mr-3 text-yellow-400" size={24} />
            <span className="font-semibold text-yellow-400 text-lg tracking-wide select-none">
              Shopping Cart
            </span>
          </div>
          <p className="text-4xl font-extrabold text-yellow-400 tracking-tight">₱ {calculateTotal().toFixed(2)}</p>
          <p className="mt-2 text-yellow-200 text-sm opacity-80 select-none">{calculateTotalQuantity()>99? "99+":calculateTotalQuantity() } items in your cart</p>
        </div>

        {/* Optional Footer */}
        <button
          className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-emerald-900 font-semibold px-10 py-3 rounded-full shadow-md transition duration-300 w-full
          flex items-center justify-center gap-3 tracking-wide select-none"
          onClick={signOut}
        >
          Sign Out
          <LogOut />
        </button>

        {/* <div className="text-center mt-12 text-white opacity-100 text-xs select-none tracking-wide">
          &copy; 2025 Binhi. All rights reserved.
        </div> */}
      </div>
    </div>
  )
};

export default ProfileSection;
