import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Typography, Spin, notification } from "antd";
import { ShoppingOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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
        notification.success({
          message: "Orders Fetched Successfully",
          description: `${response.data.orders.length} orders retrieved.`,
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
        notification.error({
          message: "Error Fetching Orders",
          description:
            "There was an issue retrieving your orders. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="mb-4">
        <ShoppingOutlined /> Track Your Orders
      </Title>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" />
        </div>
      ) : orders.length === 0 ? (
        <Paragraph>No orders found.</Paragraph>
      ) : (
        <div>
          {orders.map((order) => (
            <Card key={order._id} className="mb-4" bordered>
              <Title level={4}>{order.name}</Title>
              <Paragraph>{order.description}</Paragraph>
              <Paragraph>Price: ${order.price}</Paragraph>
              <Paragraph>Quantity: {order.quantity}</Paragraph>
              <Paragraph>Status: {order.shipmentStatus || "Pending"}</Paragraph>
              <Paragraph className="text-right">
                <CheckCircleOutlined style={{ color: "green" }} />
                Order Status: {order.shipmentStatus || "Pending"}
              </Paragraph>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackOrders;
