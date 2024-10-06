import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import "../styles/globals.css";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password"); // Redirect to the forgot password page
  };

  const handleRegister = () => {
    router.push("/register"); // Redirect to the registration page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-lg"
      >
        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={handleForgotPassword}
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          Forgot Password?
        </button>
        <p className="mt-4 text-gray-600">Don't have an account?</p>
        <button
          onClick={handleRegister}
          className="mt-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
