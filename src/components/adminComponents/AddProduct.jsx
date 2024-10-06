import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Typography, Space, notification } from "antd";

const { Title } = Typography;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [variants, setVariants] = useState([{ size: "", color: "", stock: 0 }]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", stock: 0 }]);
  };

  const handleSubmit = async (values) => {
    try {
      const { name, description, price, imageUrl, stock } = values;

      const response = await axios.post("/api/products", {
        name,
        description,
        price,
        imageUrl,
        stock,
        variants,
      });

      notification.success({
        message: "Product Added",
        description: "Your product has been added successfully!",
      });

      // Reset the form and variants
      form.resetFields();
      setVariants([{ size: "", color: "", stock: 0 }]);
    } catch (error) {
      console.error("Error adding product:", error);
      notification.error({
        message: "Error",
        description: "There was an issue adding the product. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <Title level={2} className="text-center mb-4">
        Add New Product
      </Title>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <Input placeholder="Product Description" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter the product price" },
          ]}
        >
          <Input type="number" placeholder="Product Price" />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[{ required: true, message: "Please enter the image URL" }]}
        >
          <Input placeholder="Image URL" />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[
            { required: true, message: "Please enter the product stock" },
          ]}
        >
          <Input type="number" placeholder="Product Stock" />
        </Form.Item>

        <Title level={4} className="mb-4">
          Variants
        </Title>
        {variants.map((variant, index) => (
          <Space key={index} direction="vertical" className="mb-2 w-full">
            <Input
              placeholder="Size"
              value={variant.size}
              onChange={(e) =>
                handleVariantChange(index, "size", e.target.value)
              }
              className="w-full"
            />
            <Input
              placeholder="Color"
              value={variant.color}
              onChange={(e) =>
                handleVariantChange(index, "color", e.target.value)
              }
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Stock"
              value={variant.stock}
              onChange={(e) =>
                handleVariantChange(index, "stock", e.target.value)
              }
              className="w-full"
            />
          </Space>
        ))}

        <Button type="dashed" onClick={addVariant} className="w-full mb-4">
          Add Variant
        </Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
