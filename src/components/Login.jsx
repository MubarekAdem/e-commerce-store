import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../components/Form.module.css";
import Navbar from "./Navbar"; // Import your form styling

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.formContainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
