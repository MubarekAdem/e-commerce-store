import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setCurrentUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch current user", error);
        localStorage.removeItem("token"); // Clear token if error occurs
        setCurrentUser(null);
        router.push("/login");
      } finally {
        setIsLoading(false); // Ensure loading is done
      }
    };

    fetchUser();
  }, [router]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setCurrentUser(response.data.user); // Update current user after login
      router.push("/dashboard"); // Redirect to dashboard after login
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
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {!isLoading && children} {/* Only render children if not loading */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
