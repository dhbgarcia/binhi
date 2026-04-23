import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar.jsx';
import axios from 'axios';

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    pname: '',
    type: '',
    price: '',
    basePrice: '',
    description: '',
    quantity: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/product/create', productData);
      if (response.status === 200 || response.status === 201) {
        setMessage('✅ Product created successfully!');
        setProductData({
          pname: '',
          type: '',
          price: '',
          basePrice: '',
          description: '',
          quantity: '',
          image: '',
        });
      } else {
        setMessage('⚠️ Failed to create product.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  const goBackToProductPage = () => {
    window.history.back();
  };

  return (
    <div className="flex w-screen">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <div className="bg-emerald-950 p-6 rounded-4xl text-white h-full overflow-y-auto">
          <div className="relative mb-12">
            <button
              className="absolute left-4 top-4 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded cursor-pointer"
              onClick={goBackToProductPage}
            >
              ←
            </button>
            <h2 className="text-center text-3xl font-bold mt-4">Add New Product</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Product Name', name: 'pname', type: 'text' },
              { label: 'Type', name: 'type', type: 'text' },
              { label: 'Price', name: 'price', type: 'number' },
              { label: 'Base Price', name: 'basePrice', type: 'number' },
              { label: 'Quantity', name: 'quantity', type: 'number' },
              { label: 'Image URL', name: 'image', type: 'url' },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label className="w-40 text-xl font-semibold">{label}:</label>
                <input
                  type={type}
                  name={name}
                  value={productData[name]}
                  onChange={handleChange}
                  required
                  className="flex-1 p-3 rounded-full text-black w-full bg-white"
                />
              </div>
            ))}

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="w-40 text-xl font-semibold">Description:</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                required
                rows={3}
                className="flex-1 p-3 rounded-xl text-black w-full bg-white resize-none"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full font-bold text-white transition duration-200"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Add Product'}
              </button>
            </div>

            {message && (
              <p className="text-center mt-4 text-yellow-300 font-medium">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
