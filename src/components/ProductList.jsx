import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";

const ProductList = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      {products.length === 0 ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-2 text-green-600 font-semibold">
                  ${product.price}
                </div>
                {currentUser.role === "admin" && (
                  <button
                    className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
