import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      // Only redirect if currentUser is explicitly null (not undefined)
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <p>Loading...</p>; // Show loading or placeholder while fetching user data
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {currentUser.name}</h1>
      <p>This is a protected page that only logged-in users should see.</p>
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default Dashboard;
