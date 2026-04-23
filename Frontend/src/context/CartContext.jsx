import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useUser } from "./UserContext";

const CartContext = createContext();

const useCart  =  ()  =>  useContext(CartContext);

const CartProvider =  ({children})  =>  {
  const [cartItems, setCartItems] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const timeoutRef = useRef(null);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  const { userId, setErrorMessage, setCenterMessage } = useUser();

  // Calculate cart total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + (item.quantity), 0);
  };

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
          weight: '1.0KG',
          image: product.image,
        },
      ]);
    }
    console.log(cartItems)
    
    setShowCartNotification(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowCartNotification(false);
    }, 5000);
  };

    const navigateToCart = () => {
      setCurrentPage('cart');
    };

    const fetchCart = async (userId) => {
      try {
          const response = await fetch(`http://localhost:3000/api/cart/${userId}`);
          if (!response.ok) {
              setErrorMessage('Failed to fetch cart');
          }
          const data = await response.json();
          console.log(data);
          console.log(data[0]?.cartItems);
          if (data.length === 0) {
              setCartItems([]);
              return;
          }
          setCartItems(data[0]?.cartItems);
          setCenterMessage('Shopping cart found');
      } catch (error) {
          console.error('Error fetching cart:', error);
      }
    }

    useEffect(()=>{
      if (userId && !hasFetchedCart) {
        fetchCart(userId);
        setHasFetchedCart(true);
      }
    }, [userId]);

    const handleSaveCart = async (userId, cartItems) => {
        const cartData = {
            userId,
            cartItems
        };
        try {
            const response = await fetch('http://localhost:3000/api/cart/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartData),
            });

            if (!response.ok) {
                setErrorMessage('Failed to save cart');
            }

            const data = await response.json();
            console.log('Cart saved successfully:', data);
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }
      useEffect(() => {
        if (cartItems.length > 0) {
            console.log('Saving cart:', cartItems);
            console.log('User ID:', userId);
            handleSaveCart(userId, cartItems);
        }
    }, [cartItems]);



    return (
        <CartContext.Provider value={{ cartItems, currentPage, setCurrentPage, setCartItems, addToCart, calculateTotal, calculateTotalQuantity, navigateToCart, showCartNotification, notificationMessage, handleSaveCart }}>
            {children}
        </CartContext.Provider>
    );
}

export {useCart, CartProvider}