import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to toggle between login and forgot password
  const [resetEmail, setResetEmail] = useState(""); // Email for password reset
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      try {
        // Handle forgot password logic
        await axios.post("/api/auth/forgot-password", { email: resetEmail });
        setSuccess("Password reset link sent to your email.");
        setError("");
      } catch (err) {
        setError("Failed to send password reset link.");
        setSuccess("");
      }
    } else {
      try {
        // Handle login logic
        await axios.post("/api/auth/login", { email, password });
        router.push("/dashboard"); // Redirect after successful login
      } catch (err) {
        setError("Login failed. Please check your credentials.");
        setSuccess("");
      }
    }
  };

  return (
    <div>
      <h1>{isForgotPassword ? "Forgot Password" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        {isForgotPassword ? (
          <div>
            <label htmlFor="resetEmail">Email:</label>
            <input
              type="email"
              id="resetEmail"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit">
          {isForgotPassword ? "Send Reset Link" : "Login"}
        </button>
      </form>

      {!isForgotPassword && (
        <a href="#" onClick={() => setIsForgotPassword(true)}>
          Forgot Password?
        </a>
      )}
      {isForgotPassword && (
        <a href="#" onClick={() => setIsForgotPassword(false)}>
          Back to Login
        </a>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Login;
