import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../components/Form.module.css"; // Import your form styling
import Navbar from "./Navbar"; // Import your Navbar component

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer"); // Default to "customer"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass the selected role along with the name, email, and password
      await register(name, email, password, role);
      alert("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.formContainer}>
        <h1>Register</h1>
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
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <label>
            Role:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
