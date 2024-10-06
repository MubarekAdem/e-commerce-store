import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState(0);
  const [variants, setVariants] = useState([{ size: "", color: "", stock: 0 }]);

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...variants];
    newVariants[index][name] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", stock: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/products", {
        name,
        description,
        price,
        imageUrl,
        stock,
        variants,
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
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">Variants:</h3>
        {variants.map((variant, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Size"
              name="size"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, e)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              placeholder="Color"
              name="color"
              value={variant.color}
              onChange={(e) => handleVariantChange(index, e)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              name="stock"
              value={variant.stock}
              onChange={(e) => handleVariantChange(index, e)}
              className="w-full p-2 border rounded mb-2"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="mt-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Add Variant
        </button>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
