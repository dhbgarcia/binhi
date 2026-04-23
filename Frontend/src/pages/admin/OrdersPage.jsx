import AdminSideBar from "../../components/admin/AdminSidebar";
import OrderContainer from "../../components/admin/OrderContainer";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [sales, setSales] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/sale/?status=${status}`);
        const json = await response.json();
        if (response.ok) {
          setSales(json);
        } else {
          console.error("Failed to fetch:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, [status, sales]);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-200 p-6 m-4 rounded-4xl shadow-md h-[90vh] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="pt-8">
          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold text-emerald-900">Orders</p>
          </div>
          <div className="bg-emerald-900 h-0.5 w-full my-4 rounded"></div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          {/* Tabs */}
          <div className="flex gap-8">
            {["Cancelled", "Completed", "Pending"].map((stat) => (
              <div
                key={stat}
                className="cursor-pointer text-center"
                onClick={() => setStatus(stat)}
              >
                <p className="text-xl text-emerald-900">{stat}</p>
                <div
                  className={`h-0.5 w-20 my-2 rounded transition-all duration-300 ${
                    status === stat ? "bg-[#FEB81C]" : "bg-[#D9D9D9]"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-stone-50 rounded-xl px-12 py-4 flex text-gray-700 font-semibold mb-2">
          <p className="flex-1 text-left">Crops</p>
          <p className="flex-1 text-left">Total Cost</p>
          <p className="flex-1 text-left">Time</p>
          <p className="flex-1 text-left">Status</p>
        </div>

        {/* Orders List */}
        <div className="overflow-x-auto w-full">
          {sales.length > 0 ? (
            <table className="w-full">
              <tbody>
                {sales.map((transaction) => (
                  <OrderContainer key={transaction._id} sales={transaction} />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center py-12">
              <img src="/src/assets/admin/none.png" className="w-80" alt="No Orders" />
              <p className="text-center font-semibold text-gray-400 text-xl pt-4">
                No Orders Have Been Made of this Type!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
