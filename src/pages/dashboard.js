import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";
const Dashboard = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar /> {/* Add Navbar here */}
      <p>This is a protected page that only logged-in users should see.</p>
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default Dashboard;
