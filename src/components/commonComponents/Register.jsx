import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Form, Input, Button, Select, Typography, notification } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role set to 'customer'
  });
  const router = useRouter();

  const handleChange = (name) => (value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    router.push("/login"); // Redirect to the login page
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/auth/signup", values);
      localStorage.setItem("authToken", response.data.token);
      notification.success({
        message: "Registration Successful",
        description: "You have been registered successfully!",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Error registering:",
        error.response?.data || error.message
      );
      notification.error({
        message: "Registration Failed",
        description: error.response?.data?.message || "Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <Title level={2} className="text-center mb-4">
        Register
      </Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange("name")(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email")(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange("password")(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select
            placeholder="Select your role"
            value={formData.role}
            onChange={handleChange("role")}
          >
            <Option value="customer">Customer</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Register
          </Button>
        </Form.Item>
      </Form>
      <Text className="mt-4 block text-center">
        Already have an account?{" "}
        <Button type="link" onClick={handleLogin} className="p-0">
          Login
        </Button>
      </Text>
    </div>
  );
};

export default Register;
