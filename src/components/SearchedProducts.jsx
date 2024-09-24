import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

const SearchedProducts = ({ searchedProducts }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      {searchedProducts.length === 0 ? (
        <div className="text-center text-gray-600">No results found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchedProducts.map((product) => (
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
                  {currentUser.role === "admin" && (
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

export default SearchedProducts;
