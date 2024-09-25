import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext"; // Use the Cart context
import { useRouter } from "next/router";

const Navbar = () => {
  const { logout } = useAuth();
  const { cart } = useCart(); // Get the cart context
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to login page after logout
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items in cart

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
        <li>
          <a href="/bulk-upload" className="hover:text-gray-300">
            Bulk Upload
          </a>
        </li>
        <li>
          <a href="/cart" className="hover:text-gray-300">
            Cart ({totalItems}) {/* Display total items in cart */}
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
