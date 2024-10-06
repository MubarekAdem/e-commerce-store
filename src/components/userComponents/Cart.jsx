// src/pages/cart.js
import React from "react";
import { useCart } from "../../contexts/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, payForItem } = useCart();

  const handlePay = async (productId) => {
    console.log("Pay button clicked for product:", productId);
    await payForItem(productId); // Call payForItem and await for it to complete
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Description: {item.description}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
                <button
                  onClick={() => handlePay(item.productId)} // Call Pay function
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Pay
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
