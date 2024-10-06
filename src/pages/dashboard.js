import Navbar from "../components/commonComponents/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import AddProduct from "../components/adminComponents/AddProduct";
import ProductList from "../components/commonComponents/ProductList";
import Orders from "../components/adminComponents/Orders"; // Import Orders component
import SearchBar from "../components/commonComponents/SearchBar";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!currentUser) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }
  }, [currentUser, router]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?searchTerm=${searchTerm}`);
    }
  };

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSearch} className="mb-4">
        <SearchBar />
      </form>
      <p>This is a protected page that only logged-in users should see.</p>

      {currentUser.role === "admin" && (
        <>
          <h2>Admin Dashboard</h2>
          <AddProduct />
          <Orders /> {/* Show Orders component for Admin */}
        </>
      )}

      <ProductList />
    </div>
  );
};

export default Dashboard;
