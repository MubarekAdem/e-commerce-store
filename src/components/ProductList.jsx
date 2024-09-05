import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductList.module.css"; // Ensure this path is correct

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className={styles["product-list"]}>
      {products.map((product) => (
        <div key={product._id} className={styles["product-card"]}>
          <img src={product.imageUrl} alt={product.name} />
          <div className={styles["content"]}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className={styles["price"]}>${product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
