import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <a href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/productlist" className="hover:text-gray-300">
            Product List
          </a>
        </li>
        {/* Add more navigation links as needed */}
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 focus:outline-none"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
