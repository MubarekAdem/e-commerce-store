// components/TrackOrders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const updateShipmentStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/orders",
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update state to reflect the change in UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, shipmentStatus: status } : order
        )
      );
    } catch (error) {
      console.error("Error updating shipment status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Track Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="p-4 border-b">
              <h2>{order.name}</h2>
              <p>{order.description}</p>
              <p>Price: ${order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Status: {order.shipmentStatus || "Pending"}</p>
              <button
                onClick={() => updateShipmentStatus(order._id, "Shipped")}
                className="bg-blue-500 text-white p-2 mr-2"
              >
                Mark as Shipped
              </button>
              <button
                onClick={() => updateShipmentStatus(order._id, "Delivered")}
                className="bg-green-500 text-white p-2"
              >
                Mark as Delivered
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
