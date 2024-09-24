import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "./components/Navbar";

const SearchPage = () => {
  const router = useRouter();
  const { term } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (term) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`/api/products?search=${term}`);
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [term]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Search Results for "{term}"</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg p-4"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <div className="mt-2 text-green-600">${product.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
