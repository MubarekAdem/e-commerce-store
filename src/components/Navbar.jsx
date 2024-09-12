// src/components/Navbar.js
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav>
      <a href="/productlist">Product List</a>
      {currentUser?.role === "admin" && <a href="/addproduct">Add Product</a>}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
