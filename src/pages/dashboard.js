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
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <p>Loading...</p>; // Show loading or placeholder while redirecting
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This is a protected page that only logged-in users should see.</p>
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default Dashboard;
