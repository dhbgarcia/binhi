import { useEffect, useState } from "react";
import DropDown from "./DropdownButton";
import order from "../../../../Backend/models/orderSchema";

const OrderContainer = ({ sales }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "http://localhost:3000/api/order/?sales_id=" + sales._id
      );
      const json = await response.json();

      if (response.ok) {
        setOrders(json);
      }
    };
    fetchOrders();
  }, []);

  let sum = orders.reduce((a, v) => (a = a + v.price * v.quantity), 0); // adds the quantity of each item in the cart
  
  return (
    <tr className=" border-b-2 border-gray-100 text-gray-500 flex px-12 py-8 items-start py-4">
      <th className="text-left font-semibold flex-3">
        {orders &&
          orders.map((products) => (
            <p className="font-semibold">
              {products.pname} - {products.quantity}
            </p>
          ))}
      </th>
      <th className="text-left font-semibold flex-3 ">{sum}</th>
      <th className="text-left font-semibold flex-3">
        {sales.createdAt.slice(0, sales.createdAt.indexOf("T"))}
      </th>
      <th className="text-left font-semibold flex-3"><DropDown sale={sales}/></th>
    </tr>
  );
};

export default OrderContainer;
