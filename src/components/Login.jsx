import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={handleForgotPassword}>Forgot Password?</button>
        Don't have an account? Register
        <p></p>
        <button onClick={handleRegister}>signup</button>
      </div>
    </div>
  );
};

export default Login;
