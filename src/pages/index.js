import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
// import "antd/dist/antd.min.css"; // For production use

export default function HomePage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/add-product"); // Redirect to add product page after login
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Welcome to the E-commerce Store</h1>
      <p>Please log in to access your products.</p>
    </div>
  );
}
