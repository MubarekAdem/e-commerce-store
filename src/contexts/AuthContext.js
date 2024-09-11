import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch current user", error);
        setCurrentUser(null);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      router.push(response.data.redirectUrl);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
