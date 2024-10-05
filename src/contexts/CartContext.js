import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust the path as needed

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

  // Fetch cart data when user is authenticated
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

      // Check if the response contains all carts (admin) or a single user's cart
      if (isAdmin(currentUser)) {
        setCart(response.data.carts); // Admin gets all carts
      } else {
        setCart(response.data.items); // Regular user gets their items
      }
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data || error.message
      );
    }
  };

  // Helper function to determine if the current user is an admin
  const isAdmin = (user) => user?.role === "admin";

  useEffect(() => {
    fetchCart(); // Fetch the cart when the user is authenticated
  }, [currentUser]);

  // Add an item to the cart
  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/cart",

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

  // Remove an item from the cart
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

  // Pay for an item
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

  // Update shipment status for an item
  const updateShipmentStatus = async (productId, paid, userIdToUpdate) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be authenticated.");
      return;
    }

    console.log("Updating shipment status:", {
      productId,
      paid,
      userIdToUpdate,
    }); // Add this line

    try {
      const response = await axios.put(
        "/api/cart",
        { productId, paid, userIdToUpdate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from API:", response.data);
    } catch (error) {
      console.error(
        "Error updating shipment status:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,

        payForItem,
        updateShipmentStatus, // Provide updateShipmentStatus function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
