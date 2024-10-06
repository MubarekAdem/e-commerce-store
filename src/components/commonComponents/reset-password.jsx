import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Typography, notification } from "antd";
import Link from "next/link";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (values) => {
    try {
      const token = new URLSearchParams(window.location.search).get("token");

      const response = await axios.post("/api/auth/reset-password", {
        code: values.code,
        newPassword: values.newPassword,
        token,
      });

      notification.success({
        message: "Success",
        description: "Password reset successfully!",
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      notification.error({
        message: "Error",
        description: "Error resetting password. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <Title level={2} className="text-center mb-4">
        Reset Password
      </Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="code"
          rules={[{ required: true, message: "Please input your reset code!" }]}
        >
          <Input
            placeholder="Reset Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
        >
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      <Text className="mt-4 block text-center">
        <Link href="/login" className="text-blue-500 hover:underline">
          Back to Login
        </Link>
      </Text>
    </div>
  );
};

export default ResetPassword;
