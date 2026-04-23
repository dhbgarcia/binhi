import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useNavigate, Link } from "react-router-dom";

const ProductSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [secondarySortCriteria, setSecondarySortCriteria] = useState("name");

  // Fetch all products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product`);
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Sorting and grouping logic
  const sortedProducts = (products) => {
    if (sortCriteria !== "type") {
      return [...products].sort((a, b) => {
        const isAsc = sortOrder === "asc";
        let comparison = 0;
        switch (sortCriteria) {
          case "name":
            comparison = a.pname.localeCompare(b.pname);
            break;
          case "price":
            comparison = a.price - b.price;
            break;
          case "quantity":
            comparison = (a.quantity || 0) - (b.quantity || 0);
            break;
          default:
            comparison = a.pname.localeCompare(b.pname);
        }
        return isAsc ? comparison : -comparison;
      });
    } else {
      const groupedByType = products.reduce((acc, product) => {
        const type = product.type || "Uncategorized";
        if (!acc[type]) acc[type] = [];
        acc[type].push(product);
        return acc;
      }, {});

      const sortedGroups = Object.keys(groupedByType).sort((a, b) => {
        const isAsc = sortOrder === "asc";
        return isAsc ? a.localeCompare(b) : b.localeCompare(a);
      });

      return sortedGroups.flatMap((type) =>
        groupedByType[type].sort((a, b) => {
          const isAsc = sortOrder === "asc";
          let comparison = 0;
          switch (secondarySortCriteria) {
            case "name":
              comparison = a.pname.localeCompare(b.pname);
              break;
            case "price":
              comparison = a.price - b.price;
              break;
            case "quantity":
              comparison = (a.quantity || 0) - (b.quantity || 0);
              break;
            default:
              comparison = a.pname.localeCompare(b.pname);
          }
          return isAsc ? comparison : -comparison;
        })
      );
    }
  };

  const displayedProducts = sortedProducts(products);

  const handleCardClick = (productId) => {
    if (!productId) {
      console.error("Invalid product id:", productId);
      return;
    }
    navigate(`/view-product/${productId}`);
  };

  return (
    <div className="flex-1 bg-gray-200 p-6 m-4 rounded-4xl shadow-md h-[90vh] max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="pt-8 slide-in-bottom">
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold text-emerald-900">Products</p>
        </div>
        <div className="bg-emerald-900 h-0.5 w-full my-4 rounded"></div>
      </div>

      {/* Sorting Controls + Add Button */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4 slide-in-bottom">
        {/* Sorting Controls */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <label className="text-gray-600 text-sm font-semibold mr-2">Sort by:</label>
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              className={`px-4 py-1.5 border rounded-md text-sm transition ${
                sortCriteria ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <option value="name">Name</option>
              <option value="type">Type</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-gray-600 text-sm font-semibold mr-2">Order:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`px-4 py-1.5 border rounded-md text-sm transition ${
                sortOrder ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          {sortCriteria === "type" && (
            <div className="flex items-center">
              <label className="text-gray-600 text-sm font-semibold mr-2">Sort within type by:</label>
              <select
                value={secondarySortCriteria}
                onChange={(e) => setSecondarySortCriteria(e.target.value)}
                className={`px-4 py-1.5 border rounded-md text-sm transition ${
                  secondarySortCriteria ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </select>
            </div>
          )}
        </div>

        {/* Add Product Button */}
        <Link to="/add-product">
          <div className="bg-[#2AC947] h-8 px-4 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-all duration-300">
            <p className="text-white text-xs font-bold">ADD PRODUCT</p>
          </div>
        </Link>
      </div>

      {/* Product Grid */}
      {sortCriteria === "type" ? (
        Object.entries(
          displayedProducts.reduce((acc, product) => {
            const type = product.type || "Uncategorized";
            if (!acc[type]) acc[type] = [];
            acc[type].push(product);
            return acc;
          }, {})
        ).map(([type, items]) => (
          <div key={type} className="mb-6">
            <h2 className="text-xl font-semibold text-emerald-900 mb-4 capitalize">
              {type}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleCardClick(product._id)}
                  className="cursor-pointer"
                >
                  <ProductCard
                    name={product.pname}
                    image={product.image}
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => handleCardClick(product._id)}
                className="cursor-pointer"
              >
                <ProductCard
                  name={product.pname}
                  image={product.image}
                />
              </div>
            ))
          ) : (
            <p className="text-center w-full col-span-3 text-gray-500">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSection;
