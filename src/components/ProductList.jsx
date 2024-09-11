// src/pages/productlist.js
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const { currentUser, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [currentUser, router]);

  if (!currentUser) {
    return <div>Loading...</div>; // Loading state
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={styles["product-list"]}>
      {products.map((product) => (
        <div key={product._id} className={styles["product-card"]}>
          <img src={product.imageUrl} alt={product.name} />
          <div className={styles["content"]}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className={styles["price"]}>${product.price}</div>
            <button
              className={styles["delete-button"]}
              onClick={() => deleteProduct(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
