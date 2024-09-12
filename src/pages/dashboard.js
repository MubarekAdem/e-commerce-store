import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Use the correct key for your token
    if (!currentUser && !token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [currentUser, router]);

  if (loading) {
    return <p>Loading...</p>; // Show loading or placeholder while fetching user data
  }

  return (
    <div>
      <p>This is a protected page that only logged-in users should see.</p>
      {currentUser.role === "admin" && <AddProduct />}
      <ProductList />
    </div>
  );
};

export default Dashboard;
