import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { useCart } from "./CartContext";

const SalesContext = createContext();

const useSales  =  ()  =>  useContext(SalesContext);

const SalesProvider =  ({children})  =>  {
    const { userId, setErrorMessage,  setCenterMessage}  =  useUser();
    const { cartItems, setCartItems, setCurrentPage } = useCart();
    const [sales, setSales]  =  useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories]  = useState(['All']);
    const [hasFetched,  setHasFetched] = useState(false);
    const { handleSaveCart } = useCart();

    const fetchSales = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/sale/`);
            const data = await response.json();

            const filteredSales = data.filter(sale => sale.user_id === userId);

            const orderResponse = await fetch(`http://localhost:3000/api/order/`);
            const orderData = await orderResponse.json();

            const salesData = filteredSales.map(sale => {
                const matchingOrders = orderData.filter(order => order.sales_id === sale._id);
                return {
                    ...sale,
                    arrayproduct: matchingOrders
                };
            });

            console.log(salesData);
            setSales(salesData);
        } catch (err) {
            console.error("Fetch sales error:", err);
            setErrorMessage("An error has occurred");
        }
    };

    const fetchProducts = async ()=> {
        try{
            const response = await fetch('http://localhost:3000/api/product/')
            const data = await response.json();
            setProducts(data);
            setCategories(['All', ...new Set(data.map(product => product.type))]);
        } catch (err) {
            setErrorMessage("An error has occured");
        }
    }

    const handleCheckout = async (userId) => {
        if (!userId) {
            setErrorMessage('Log in first');
            return;
        }

        if (cartItems.length === 0) {
            setErrorMessage('Add items to cart first');
            return;
        }

        try {
            const newSales = await fetch('http://localhost:3000/api/sale/create', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    user_id: userId,
                }),
            });

            if (!newSales.ok) {
                setErrorMessage('Failed to create order');
                return;
            }

            const salesData = await newSales.json();

            const orderPromises = cartItems.map(item => {

                console.log(item._id, item.quantity, salesData._id);

                return fetch('http://localhost:3000/api/order/create', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        product_id: item._id,
                        quantity: item.quantity,
                        sales_id: salesData._id,
                    }),
                });

            });

            const orderResponses = await Promise.all(orderPromises);

            const hasFailedOrder = orderResponses.some(response => !response.ok);
            if (hasFailedOrder) {
                setErrorMessage('One or more orders failed.');
                return;
            }

            setCartItems([]);
            handleSaveCart(userId, []);
            setCenterMessage('Checkout successful!');
            setHasFetched(false);
            setCurrentPage('orders');

        } catch (err) {
            console.error("Checkout error:", err);
            setErrorMessage('An error occurred during checkout');
        }
    };

    useEffect(()=> {
        fetchProducts();
        fetchSales(userId);
    }, [])

    useEffect(()=>{
        if(!hasFetched){
            fetchSales(userId);
            setHasFetched(true);
        }
    }, [hasFetched])

    return (
        <SalesContext.Provider value={{ 
            sales, 
            fetchSales, 
            handleCheckout, 
            products, 
            categories 
        }}>
            {children}
        </SalesContext.Provider>
    );
}

export {useSales, SalesProvider}