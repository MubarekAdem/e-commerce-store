// contexts/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust the path as needed

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user might not be authenticated.");
        return;
      }

      try {
        const response = await axios.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(response.data.items);
      } catch (error) {
        console.error(
          "Error fetching cart:",
          error.response?.data || error.message
        );
      }
    };

    fetchCart();
  }, [currentUser]);

  const addToCart = async (productId) => {
    // Logic for adding to cart
  };

  // Remove from cart function
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be authenticated.");
      return;
    }

    try {
      await axios.delete("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId }, // Send productId in the request body
      });
      fetchCart(); // Refetch the cart after removing an item
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error.response?.data || error.message
      );
    }
  };

  const clearCart = async () => {
    // Implement clear cart functionality if needed
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
