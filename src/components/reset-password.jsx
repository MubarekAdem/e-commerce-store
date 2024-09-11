import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ResetPassword() {
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
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Reset Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
      <Link href="/login">Back to Login</Link>
    </div>
  );
}
