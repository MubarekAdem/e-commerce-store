// NavBar.js
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const totalItems = cart ? cart.length : 0;

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
        {currentUser?.role === "customer" && (
          <li>
            <a href="/track-orders" className="hover:text-gray-300">
              Track Orders
            </a>
          </li>
        )}
        <li>
          <a href="/cart" className="hover:text-gray-300">
            Cart ({totalItems})
          </a>
        </li>
        <li>
          <button onClick={handleLogout} className="hover:text-gray-300">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
