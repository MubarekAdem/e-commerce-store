import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = new URLSearchParams(window.location.search).get("token");

      const response = await axios.post("/api/auth/reset-password", {
        code,
        newPassword,
        token,
      });

      setMessage("Password reset successfully!");
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Reset Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      <div className="mt-4">
        <Link href="/login" className="text-blue-500 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
