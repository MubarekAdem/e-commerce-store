import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { Input, Button, Typography, notification, Form } from "antd";

const { Title, Paragraph } = Typography;

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      await login(email, password);
      notification.success({
        message: "Login Successful",
        description: "Welcome back!",
      });
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description:
          error.message || "Please check your credentials and try again.",
      });
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password"); // Redirect to the forgot password page
  };

  const handleRegister = () => {
    router.push("/register"); // Redirect to the registration page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Title level={2} className="mb-6">
        Login
      </Title>
      <Form
        onFinish={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-lg"
      >
        <Form.Item
          label="Email"
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className="mt-6 flex flex-col items-center">
        <Button
          type="link"
          onClick={handleForgotPassword}
          className="text-indigo-600"
        >
          Forgot Password?
        </Button>
        <Paragraph className="mt-4 text-gray-600">
          Don't have an account?
        </Paragraph>
        <Button
          onClick={handleRegister}
          className="mt-2 bg-green-600 text-white"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;
