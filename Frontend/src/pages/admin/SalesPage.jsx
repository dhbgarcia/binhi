import AdminSideBar from "../../components/admin/AdminSidebar";
import ProductContainer from "../../components/admin/ProductContainer";
import { useEffect, useState } from "react";

const SalesPage = () => {
  const [filter, setFilter] = useState(new Date(0));
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const response = await fetch(
        "http://localhost:3000/api/total/?startDate=" + filter
      );
      const json = await response.json();
      if (response.ok) {
        setSales(json);
      }
    };

    fetchSales();
  }, [filter]);

  const subtractDaysFromDate = (currentDate, daysToSubtract) => {
    const pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - daysToSubtract);
    return pastDate;
  };

  const getPreviousMonth = () => {
    const oneMonthBefore = new Date();
    oneMonthBefore.setMonth(new Date().getMonth() - 1);
    return oneMonthBefore;
  };

  const convertSet = (date) => setFilter(date);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <AdminSideBar></AdminSideBar>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 m-4 bg-gray-200 rounded-4xl shadow-md">
        {/* Header */}
        <div className="pt-4">
          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold text-emerald-900">Sales</p>
          </div>
          <div className="bg-emerald-900 h-0.5 w-full my-4 rounded"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-start mb-6 gap-4">
          {[
            { label: "All Time", value: new Date(0) },
            {
              label: "This Year",
              value: subtractDaysFromDate(new Date(), 365),
            },
            { label: "This Month", value: getPreviousMonth() },
            { label: "This Week", value: subtractDaysFromDate(new Date(), 7) },
          ].map(({ label, value }) => (
            <button
              key={label}
              className="bg-[#03573A] text-white text-xs font-bold h-8 px-4 rounded-full hover:bg-red-600 transition-all"
              onClick={() => convertSet(value)}
            >
              {label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Total Sales Display */}
        {sales && sales.length > 0 && (
          <div className="mb-4 text-emerald-900 font-medium text-xl">
            {sales.map((transaction, index) => (
              <p key={index}>
                Total Sale Amount: ₱{transaction.totalSaleAmount.toFixed(2)}
              </p>
            ))}
          </div>
        )}

        {/* Table Header */}
        <div className="w-full bg-stone-50 rounded-xl px-6 py-4 mb-2 flex text-gray-700 font-semibold text-sm">
          <p className="flex-1">Product</p>
          <p className="flex-1">Base Price ₱</p>
          <p className="flex-1">Selling Price ₱</p>
          <p className="flex-1">Sales</p>
          <p className="flex-1">Total Profit ₱</p>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto w-full">
          <table className="w-full">
            <tbody>
              {sales.length > 0 ? (
                <ProductContainer time={filter} />
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    <img
                      src="/src/assets/admin/none.png"
                      alt="No Sales"
                      className="mx-auto pt-12 w-80"
                    />
                    <p className="text-center font-semibold text-gray-400 text-xl pb-12">
                      No sales yet...
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
