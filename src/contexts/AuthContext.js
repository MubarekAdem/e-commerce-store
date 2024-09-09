import axios from "axios";
import { createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      // Handle successful login
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      // Handle successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
