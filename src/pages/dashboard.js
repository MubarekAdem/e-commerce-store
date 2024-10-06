import Navbar from "../components/commonComponents/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import AddProduct from "../components/adminComponents/AddProduct";
import ProductList from "../components/commonComponents/ProductList";
import Orders from "../components/adminComponents/Orders"; // Import Orders component
import SearchBar from "../components/commonComponents/SearchBar";
import { Layout } from "antd"; // Use Ant Design's Layout for consistency

const { Content } = Layout; // Extract Content for layout purposes

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
    <Layout>
      <Navbar /> {/* Sidebar (Navbar) */}
      <Layout
        style={
          {
            // marginLeft: 200, // Push content to the right when sidebar is visible
            // padding: "24px",
          }
        }
      >
        <Content
          style={{
            // padding: "24px",
            backgroundColor: "#f0f2f5",
            // minHeight: "100vh",
            // position: "relative", // Ensure relative positioning for proper stacking
          }}
        >
          <form
            onSubmit={handleSearch}
            className="mb-4"
            style={
              {
                // zIndex: 1000, // Ensure search bar is on top
                // position: "relative", // Relative to the content, to avoid being hidden
              }
            }
          ></form>

          {currentUser.role === "admin" && (
            <>
              <h2>Admin Dashboard</h2>
              <AddProduct />
              <Orders /> {/* Show Orders component for Admin */}
            </>
          )}

          {/* Render ProductList */}
          <div
            style={
              {
                // position: "relative", // Ensures the product list is part of the layout flow
              }
            }
          >
            <ProductList />
          </div>
        </Content>
      </Layout>
    </Layout> // zIndex: 500, // Set a lower z-index than the search bar
  );
};

export default Dashboard;
