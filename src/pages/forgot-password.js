import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter from Next.js

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      setMessage(response.data.message);

      // If email sent successfully, redirect to reset-password page
      if (response.status === 200) {
        router.push("/reset-password");
      }
    } catch (error) {
      setMessage("Error sending reset email");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
