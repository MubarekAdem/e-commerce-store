import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";
import SearchBar from "@/components/SearchBar";

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
      <Navbar /> {/* Add Navbar here */}
      <form onSubmit={handleSearch} className="mb-4">
        <SearchBar />
      </form>
      <p>This is a protected page that only logged-in users should see.</p>
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default Dashboard;
