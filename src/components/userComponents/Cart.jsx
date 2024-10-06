import React from "react";
import { useCart } from "../../contexts/CartContext";
import { Button, notification, Space, Typography } from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Cart = () => {
  const { cart, removeFromCart, clearCart, payForItem } = useCart();

  const handlePay = async (productId) => {
    console.log("Pay button clicked for product:", productId);
    await payForItem(productId);
    notification.success({
      message: "Payment Successful",
      description: `You have successfully paid for the product with ID: ${productId}`,
    });
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    notification.warning({
      message: "Product Removed",
      description: `The product has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    notification.info({
      message: "Cart Cleared",
      description: `All items have been removed from your cart.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="mb-4">
        <ShoppingCartOutlined /> Your Cart
      </Title>
      {cart.length === 0 ? (
        <Paragraph className="text-gray-600">Your cart is empty.</Paragraph>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <Title level={4} className="text-lg font-semibold">
                  {item.name}
                </Title>
                <Paragraph>Price: ${item.price}</Paragraph>
                <Paragraph>Description: {item.description}</Paragraph>
              </div>
              <Space>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(item.productId)}
                >
                  Remove
                </Button>
                <Button
                  type="primary"
                  icon={<PayCircleOutlined />}
                  onClick={() => handlePay(item.productId)} // Call Pay function
                >
                  Pay
                </Button>
              </Space>
            </div>
          ))}
          <Button
            type="default"
            onClick={handleClearCart}
            className="mt-4"
            style={{ backgroundColor: "#1890ff", color: "#fff" }}
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
