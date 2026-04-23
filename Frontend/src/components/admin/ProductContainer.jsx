import { useEffect, useState, useRef } from "react";

const ProductContainer = ({ time }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      console.log(time);
      const response = await fetch(
        "http://localhost:3000/api/report/?startDate=" + time
      );
      const json = await response.json();

      if (response.ok) {
        setProduct(json);
      }
    };

    fetchProduct();
  }, [time]);

  console.log(product.length);
  return (
    <>
      {product &&
        product.map((sale) => (
          <tr
            key={sale._id}
            className=" border-b-2 border-gray-100 text-gray-500 flex px-12 py-8 items-start py-4"
          >
            <th className="text-left font-semibold flex-3">
              <img
                src={sale.img}
                alt="Hello"
                className="w-12 h-12 rounded-xl shadow-sm"
              />
              <p className="font-semibold text-gray-800">{sale.name}</p>
              <p className="text-sm font-normal text-gray-500">{sale.type}</p>
            </th>
            <th className="text-left font-semibold flex-3 ">₱{sale.bprice}</th>
            <th className="text-left font-semibold flex-3">₱{sale.price}</th>
            <th className="text-left font-semibold flex-3">{sale.count}</th>
            <th className="text-left font-semibold flex-3">
              {sale.totalSaleAmount}
            </th>
          </tr>
        ))}
    </>
  );
};

export default ProductContainer;
