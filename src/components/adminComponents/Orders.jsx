import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Table, Tag, Button, Typography, notification } from "antd";

const { Title } = Typography;

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
        notification.error({
          message: "Error",
          description: "There was an error fetching the orders.",
        });
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

      // Update state to reflect the change in the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, shipmentStatus: status } : order
        )
      );

      notification.success({
        message: "Status Updated",
        description: `Order has been marked as ${status}.`,
      });
    } catch (error) {
      console.error("Error updating shipment status:", error);
      notification.error({
        message: "Error",
        description: "There was an error updating the order status.",
      });
    }
  };

  const columns = [
    {
      title: "Order Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "shipmentStatus",
      key: "shipmentStatus",
      render: (status) => (
        <Tag
          color={
            status === "Delivered"
              ? "green"
              : status === "Shipped"
              ? "blue"
              : "orange"
          }
        >
          {status || "Pending"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => updateShipmentStatus(record._id, "Shipped")}
            className="mr-2"
          >
            Mark as Shipped
          </Button>
          <Button
            type="primary"
            onClick={() => updateShipmentStatus(record._id, "Delivered")}
            danger
          >
            Mark as Delivered
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} className="mb-4">
        Track Your Orders
      </Title>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default Orders;
