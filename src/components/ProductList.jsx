// components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext"; // Import Cart Context
import { useRouter } from "next/router";
import axios from "axios";

const ProductList = () => {
  const { currentUser } = useAuth();
  const { addToCart } = useCart(); // Get addToCart function
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        console.log(response.data); // Log fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    if (!currentUser) {
      router.push("/login");
    } else {
      fetchProducts();
    }
  }, [currentUser, router]);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      console.log("Delete response:", response.data);
      setProducts(
        products.filter((product) => product._id.toString() !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      if (!token) {
        throw new Error("User not authenticated");
      }

      // Make sure the Authorization header is correctly set
      const response = await axios.post(
        "/api/cart",
        { productId: product._id }, // Pass the product ID directly
        {
          headers: {
            Authorization: `Bearer ${token}`, // Passing token correctly in the header
          },
        }
      );

      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
    }
  };

  const handleViewReviews = (productId) => {
    router.push({
      pathname: "/reviews", // Redirect to the Reviews component
      query: { productId }, // Pass product ID as query parameter
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      {products.length === 0 ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 text-green-600 font-semibold text-lg">
                  ${product.price}
                </div>

                {/* Displaying product variants */}
                {Array.isArray(product.variants) &&
                  product.variants.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-semibold text-gray-700">Variants:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {product.variants.map((variant, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md"
                          >
                            <p>Size: {variant.size}</p>
                            <p>Color: {variant.color}</p>
                            <p>Stock: {variant.stock}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="mt-4 flex justify-between">
                  {currentUser.role === "admin" ? (
                    <>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={() =>
                          router.push(`/edit-product/${product._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        onClick={() => handleAddToCart(product)} // Use the new function here
                      >
                        Add to Cart
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors ml-2"
                        onClick={() => handleViewReviews(product._id)}
                      >
                        View Reviews
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
