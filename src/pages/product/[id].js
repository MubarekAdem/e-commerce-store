import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Get product ID from the URL

  useEffect(() => {
    if (id) {
      // Fetch product by ID when the component is loaded
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="mt-4 text-green-600 font-semibold text-lg">
          ${product.price}
        </div>

        {/* Displaying product variants */}
        {Array.isArray(product.variants) && product.variants.length > 0 && (
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
      </div>
    </div>
  );
};

export default ProductDetail;
