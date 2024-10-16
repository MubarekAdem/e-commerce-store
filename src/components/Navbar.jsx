import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the JWT token is present in localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Or replace with the token key you're using
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove JWT from localStorage
    setIsLoggedIn(false);
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My E-Commerce</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link href="/product-list">
              <p>Products</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p>About</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p>Contact</p>
            </Link>
          </li>
        </ul>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <p className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition">
                Login
              </p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
