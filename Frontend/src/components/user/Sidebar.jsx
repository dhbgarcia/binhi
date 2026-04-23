import { Home, Package, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.png';

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <Home size={32} /> },
  { key: 'market', label: 'Market', icon: <Package size={32} /> },
  { key: 'cart', label: 'Cart', icon: <ShoppingCart size={32} /> },
  { key: 'orders', label: 'Orders', icon: <ShoppingBag size={32} /> },
];

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white h-screen flex flex-col py-6 px-3 transition-all duration-300 ease-in-out shadow-md overflow-y-auto ${
        isHovered ? 'w-72' : 'w-28'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div className="flex items-center mb-10 px-2" onClick={()=>setCurrentPage('dashboard')}>
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 rounded-full object-cover cursor-pointer"
        />
        {isHovered && (
          <span className="ml-4 text-emerald-600 font-extrabold text-2xl tracking-wide cursor-pointer" >
            binhi.
          </span>
        )}
      </div>

      {/* Menu Items */}
      <div
        className={`flex flex-col space-y-4 duration-300 object-fill ${
          isHovered ? 'items-start' : 'items-center'
        }`}
      >
        {menuItems.map((item) => {
          const isActive = currentPage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setCurrentPage(item.key)}
              title={item.label}
              aria-label={item.label}
              className={`flex items-center gap-3 p-3 transition-colors cursor-pointer
                ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'hover:bg-emerald-50 text-emerald-700'
                }
                ${
                  isHovered
                    ? 'rounded-3xl justify-start w-full  h-16'
                    : 'rounded-full justify-center w-16 h-16'  
                }
              `}
            >
              {/* Icon */}
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
              {isHovered && (
                <span className={`font-medium ${isActive ? 'text-white' : 'text-emerald-700'}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;