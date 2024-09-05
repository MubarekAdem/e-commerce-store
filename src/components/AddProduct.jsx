import { useState } from "react";
import axios from "axios";
import styles from "./AddProduct.module.css";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/products", {
        name,
        description,
        price,
        imageUrl,
      });
      console.log("Product added:", response.data);
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={styles["add-product-form"]}>
      <form onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
