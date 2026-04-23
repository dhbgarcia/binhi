import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const goBackToProductPage = () => {
    navigate('/products');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
          const response = await fetch(`http://localhost:3000/api/product/${id}`);
          const data = await response.json(); 

        if (response.ok) {
          setProduct(data);
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading product...</div>;
  if (!product) return <div className="p-6 text-white">Product not found.</div>;

  const {
    pname,
    type,
    basePrice,
    price,
    description,
    quantity,
    image = '/placeholder.jpg',
  } = product;

  return (

      <div className="flex-1 p-4">
        <div className="bg-emerald-950 p-6 rounded-4xl text-white h-full overflow-y-auto">
          <div className="relative mb-12">
            <button
              className="absolute left-4 top-4 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded cursor-pointer"
              onClick={goBackToProductPage}
            >
              ←
            </button>
            <div className="flex justify-center items-center mt-4">
              <img
                src={image}
                alt={pname}
                className="w-64 h-64 object-cover rounded-xl bg-white p-2"
              />
            </div>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Name', value: pname },
              { label: 'Type', value: type },
              { label: 'Base Price', value: basePrice },
              { label: 'Selling Price', value: price },
              { label: 'Description', value: description },
              { label: 'Quantity', value: quantity },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col md:flex-row items-start md:items-center gap-4"
              >
                <label className="w-40 text-xl font-semibold">{label}:</label>
                <input
                  type="text"
                  value={value}
                  readOnly
                  className="flex-1 p-3 rounded-full text-black w-full bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

  );
};

export default ViewProduct;
