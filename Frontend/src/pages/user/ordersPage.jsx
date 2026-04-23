import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCart as CartIcon, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Frown } from 'lucide-react'; 
import Order from '../../../../Backend/models/orderSchema';
import Sales from '../../../../Backend/models/salesSchema';
import { useUser } from '../../context/UserContext';
import { useSales } from '../../context/OrderContext';

const OrdersPage = () => {
    const { sales,  fetchSales } =  useSales();
    const { userId } = useUser();
    
    const handleCancelOrder = async (salesId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/sale/toggle/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    sales_id: salesId,
                    status: "Cancelled",
                }),
            });

            if (!response.ok) {
                setErrorMessage('Failed to cancel order');
            }

            const data = await response.json();
            console.log(data);
            fetchSales(userId);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
    <div className="flex-1 bg-gradient-to-b from-white to-gray-100 p-6 min-h-screen overflow-auto">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col min-h-full">
        <div className="mb-10 slide-in-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">
            Here are your past orders.
          </p>
        </div>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="lg:col-span-2 space-y-3 slide-in-left">
            {sales.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow text-center justify-center gap-5 flex flex-col text-gray-500 text-lg">
                <ShoppingBag className='w-50 h-50 self-center'/>
                <p className="mb-4">You do not have any orders yet.</p>
              </div>
            ) : (
                sales.map((sale, saleIndex) => (
                    <div
                        key={saleIndex}
                        className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-col items-center justify-between gap-4 sm:gap-6 slide-in-left"
                    >
                        <h3 className="font-bold self-start">Order #{saleIndex + 1}</h3>

                        <div className="flex flex-col w-full object-contain">
                        {sale.arrayproduct.map((item, itemIndex) => (
                            <div
                            key={itemIndex}
                            className="mb-1 p-2 flex flex-row bg-white rounded shadow-sm"
                            >
                            <img
                                src={item.pimg}
                                alt={item.pname}
                                className="w-40 h-20 rounded-lg object-contain overflow-visible"
                            />
                            <div className="pl-4 pr-4 flex flex-row items-center w-full justify-between gap-4 object-contain">
                                <h3 className="font-semibold text-gray-900 text-left flex-1 object-contain">
                                    {item.pname[0].toUpperCase() + item.pname.slice(1).toLowerCase()}
                                </h3>

                                <div className="text-gray-500 gap-1  text-center flex flex-col text-sm">
                                    <p>Quantity</p>
                                    <p>{item.quantity + " items"}</p>
                                </div>

                                <div className="text-gray-500 gap-1 text-center flex flex-col text-sm">
                                    <p>Unit Price</p>
                                    <p className="text-emerald-600">₱{item.price.toFixed(2)}</p>
                                </div>

                                <div className="text-gray-500 gap-1 text-center flex flex-col text-sm">
                                    <p>Total</p>
                                    <p className="text-emerald-600">
                                        ₱{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>

                        <button
                        onClick={() => {
                            console.log(sale._id);
                            console.log(sale.status);
                            handleCancelOrder(sale._id);
                            console.log(sale.status);
                            fetchSales(userId);
                        }}
                        className={`${sale.status === "Completed" ? "text-emerald-500" : "text-red-500" } text-sm mt-1 hover:underline self-end`}

                        disabled={sale.status !== "Pending"}
                        >
                        {sale.status === "Pending" ? "Cancel Order" : sale.status === "Cancelled" ?  "Order Cancelled" : "Order successful"}
                        </button>
                    </div>
                    ))                
            )}
          </div>
      </div>
    </div>
    </div>
  );
};

export default OrdersPage;
