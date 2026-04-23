// import { Sidebar } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileSection from "../../components/user/ProfileSection";
import Sidebar from "../../components/user/Sidebar";
import { useCart } from "../../context/CartContext";
import CartPage from "./CartPage";
import DashboardPage from "./DashboardPage";
import MarketPage from "./MarketPage";
import OrdersPage from "./ordersPage";
import { useUser } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";

const BaseDashboardPage = () => {
    const { cartItems, showCartNotification, notificationMessage, navigateToCart, currentPage, setCurrentPage} = useCart();
    const { setErrorMessage } = useUser();
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [categories, setCategories] = useState(['All']);

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    return(
        <>
            <div className="flex h-screen relative">
                <Sidebar
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    cartCount={cartItems.length}
                />

                {currentPage === 'dashboard' && <DashboardPage/>}
                {currentPage === 'market' && <MarketPage products={products} categories={categories}/>}
                {currentPage === 'cart' && <CartPage />}
                {currentPage === 'orders' && <OrdersPage userId={userId}/>}
                <ProfileSection />

                {/* Cart notification */}
                {showCartNotification && (
                    <div
                    className="fixed top-4 bg-primaryGreen text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50 right-[25%]"
                    // style={{ right: '330px' }} 
                    >
                        <span>{notificationMessage}</span>
                        <button
                            onClick={navigateToCart}
                            className="mx-3 px-2 py-1 text-primaryYellow text-sm rounded font-medium"
                        >
                            View Cart
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default BaseDashboardPage