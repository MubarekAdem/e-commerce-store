import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EditItem = ({ productId }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    stock: 0,
    variants: [{ size: "", color: "", stock: 0 }],
    categories: [],
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, e) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index][e.target.name] = e.target.value;
    setProduct({ ...product, variants: updatedVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { size: "", color: "", stock: 0 }],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = [...product.variants];
    updatedVariants.splice(index, 1);
    setProduct({ ...product, variants: updatedVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/products/${productId}`, product);
      router.push("/product-list");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <input
            type="text"
            name="categories"
            value={product.categories.join(", ")}
            onChange={(e) =>
              setProduct({ ...product, categories: e.target.value.split(", ") })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold">Variants</h4>
          {product.variants.map((variant, index) => (
            <div key={index} className="border p-2 mb-2 rounded-md">
              <div className="mb-2">
                <label className="block text-sm">Size</label>
                <input
                  type="text"
                  name="size"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm">Color</label>
                <input
                  type="text"
                  name="color"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove Variant
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Variant
          </button>
        </div>

        <button
          type="submit"
          className={`mt-4 w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditItem;
