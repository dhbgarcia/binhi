import { useEffect, useState } from "react";

const DropDown = ({ sale }) => {
  const [showChoices, setShowChoices] = useState(false);

  const toggleOrder = async (salesId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/api/sale/toggle/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sales_id: salesId,
          status: status,
        }),
      });

      if (!response.ok) {
        setErrorMessage("Failed to cancel order");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  if (sale.status == "Pending") {
    return (
      <div>
        <button onClick={() => setShowChoices(!showChoices)} className=" text-center w-full bg-transparent placeholder:text-yellow-400 border-yellow-200 text-yellow-700 focus:border-yellow-500 hover:border-yellow-300  text-sm border rounded-full   py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow appearance-none cursor-pointer">
          {sale.status}
        </button>
        {showChoices && (
          <div id="drop" className="w-40 flex flex-col bg-white p-4 rounded-lg shadow-lg ">
            <button className="mb-4 hover:bg-gray-100"
              onClick={() => {

                console.log("APPROVE");
                toggleOrder(sale._id, "Completed");
                setShowChoices(false);
              }}
            >
              Approve
            </button>
            <button className=" hover:bg-gray-100"
              onClick={() => {
                console.log("CANCEL");
                toggleOrder(sale._id, "Cancelled");
                setShowChoices(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-transparent ${
        sale.status === "Completed"
          ? "placeholder:text-green-400 border-green-200 text-green-700 focus:border-green-500 hover:border-green-300 "
          : "placeholder:text-red-400 border-red-200 text-red-700 focus:border-red-500 hover:border-red-300 "
      }  text-sm border rounded-full py-2  shadow-sm `}
    >
      <p className="text-center">{sale.status}</p>
    </div>
  );
};

export default DropDown;
