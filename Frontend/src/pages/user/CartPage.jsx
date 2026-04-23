import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCart as CartIcon, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useSales } from '../../context/OrderContext';

const CartPage = () => {
  const { cartItems, setCartItems, setCurrentPage, calculateTotal, calculateTotalQuantity } = useCart();
  const { userId } = useUser();
  const { handleCheckout } = useSales();
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [secondarySortCriteria, setSecondarySortCriteria] = useState('name');

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // Sorting and grouping logic
  const sortedCartItems = (items) => {
    if (sortCriteria !== 'type') {
      return [...items].sort((a, b) => {
        const isAsc = sortOrder === 'asc';
        let comparison = 0;
        switch (sortCriteria) {
          case 'name':
            comparison = a.pname.localeCompare(b.pname);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'quantity':
            comparison = a.quantity - b.quantity;
            break;
          default:
            comparison = a.pname.localeCompare(b.pname);
        }
        return isAsc ? comparison : -comparison;
      });
    } else {
      const groupedByType = items.reduce((acc, item) => {
        const type = item.type || 'Uncategorized';
        if (!acc[type]) acc[type] = [];
        acc[type].push(item);
        return acc;
      }, {});

      const sortedGroups = Object.keys(groupedByType).sort((a, b) => {
        const isAsc = sortOrder === 'asc';
        return isAsc ? a.localeCompare(b) : b.localeCompare(a);
      });

      return sortedGroups.flatMap((type) =>
        groupedByType[type].sort((a, b) => {
          const isAsc = sortOrder === 'asc';
          let comparison = 0;
          switch (secondarySortCriteria) {
            case 'name':
              comparison = a.pname.localeCompare(b.pname);
              break;
            case 'price':
              comparison = a.price - b.price;
              break;
            case 'quantity':
              comparison = a.quantity - b.quantity;
              break;
            default:
              comparison = a.pname.localeCompare(b.pname);
          }
          return isAsc ? comparison : -comparison;
        })
      );
    }
  };

  const displayedCartItems = sortedCartItems(cartItems);

  return (
    <div className="flex-1 bg-gradient-to-b from-white to-gray-100 p-6 min-h-screen overflow-auto">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col min-h-full">
        <div className="mb-10 slide-in-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">
            Review your items before checking out.
          </p>
        </div>

        {/* Sorting Controls */}
        {cartItems.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 slide-in-left">
            <div className="flex items-center">
              <label className="text-gray-700 text-sm font-medium mr-2">Sort by:</label>
              <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className={`px-4 py-1.5 border rounded-md text-sm transition ${
                  sortCriteria ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
                }`}
              >
                <option value="name">Name</option>
                <option value="type">Type</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="text-gray-700 text-sm font-medium mr-2">Order:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`px-4 py-1.5 border rounded-md text-sm transition ${
                  sortOrder ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
                }`}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            {sortCriteria === 'type' && (
              <div className="flex items-center">
                <label className="text-gray-700 text-sm font-medium mr-2">Sort within type by:</label>
                <select
                  value={secondarySortCriteria}
                  onChange={(e) => setSecondarySortCriteria(e.target.value)}
                  className={`px-4 py-1.5 border rounded-md text-sm transition ${
                    secondarySortCriteria ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
                  }`}
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="quantity">Quantity</option>
                </select>
              </div>
            )}
          </div>
        )}

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {cartItems.length === 0 ? (
              <div className="bg-white p-8 rounded-xl flex flex-col justify-center gap-5 shadow text-center text-gray-500 text-lg slide-in-left">
                <ShoppingCart className="w-50 h-50 self-center" />
                <p className="mb-4">Your cart is empty.</p>
              </div>
            ) : sortCriteria === 'type' ? (
              Object.entries(
                displayedCartItems.reduce((acc, item) => {
                  const type = item.type || 'Uncategorized';
                  if (!acc[type]) acc[type] = [];
                  acc[type].push(item);
                  return acc;
                }, {})
              ).map(([type, items]) => (
                <div key={type} className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 slide-in-left"
                      >
                        <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                          <img
                            src={item.image}
                            alt={item.pname}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.pname[0].toUpperCase() + item.pname.slice(1).toLowerCase()}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {item.weight || '1 pack'}
                            </p>
                            <p className="text-emerald-600 font-medium mt-1">
                              ₱{item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="w-8 h-8 rounded border text-gray-700 hover:bg-gray-100"
                            aria-label={`Decrease quantity of ${item.pname}`}
                          >
                            -
                          </button>
                          <span className="text-lg font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="w-8 h-8 rounded border text-gray-700 hover:bg-gray-100"
                            aria-label={`Increase quantity of ${item.pname}`}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex flex-col items-end w-1/6">
                          <div className="text-right font-semibold text-gray-900 text-lg">
                            ₱{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-red-500 text-sm mt-1 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              displayedCartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 slide-in-left"
                >
                  <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.pname}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.pname[0].toUpperCase() + item.pname.slice(1).toLowerCase()}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {item.weight || '1 pack'}
                      </p>
                      <p className="text-emerald-600 font-medium mt-1">
                        ₱{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="w-8 h-8 rounded border text-gray-700 hover:bg-gray-100"
                      aria-label={`Decrease quantity of ${item.pname}`}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="w-8 h-8 rounded border text-gray-700 hover:bg-gray-100"
                      aria-label={`Increase quantity of ${item.pname}`}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-col items-end w-1/6">
                    <div className="text-right font-semibold text-gray-900 text-lg">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 text-sm mt-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-6 slide-in-right">
            <h2 className="font-bold mb-4 text-gray-900 flex items-center">
              <CartIcon className="w-5 h-5 mr-2 text-emerald-600" />
              <p>Order Summary</p>
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{calculateTotalQuantity()}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₱{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t pt-3 mt-3">
                <span>Total</span>
                <span className="text-emerald-600">
                  ₱{calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCheckout(userId)}
              className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>

        {/* Continue Shopping Button at bottom-left */}
        <div className="mt-8">
          <button
            onClick={() => setCurrentPage('market')}
            className="text-emerald-600 font-medium flex items-center gap-2 slide-in-left cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;