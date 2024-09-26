// contexts/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust the path as needed

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

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

  useEffect(() => {
    fetchCart(); // Fetch the cart when the user is authenticated
  }, [currentUser]);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/cart",
        { productId, paid: true }, // Send paid status as true
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart((prevCart) => [...prevCart, response.data]); // Update cart state
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
    }
  };

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

  const payForItem = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/cart/pay", // Change the endpoint to match your setup
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment successful:", response.data.message);
      await fetchCart(); // Fetch the updated cart after payment
    } catch (error) {
      console.error(
        "Error processing payment:",
        error.response?.data || error.message
      );
    }
  };

  const clearCart = async () => {
    // Implement clear cart functionality if needed
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, payForItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
