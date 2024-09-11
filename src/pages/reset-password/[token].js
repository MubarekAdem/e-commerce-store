// src/pages/reset-password/[token].js
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/reset-password`, {
        token,
        password,
      });
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
