import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SearchAutocomplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // Handle search input change and fetch suggestions
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await axios.get(`/api/search?searchTerm=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // When a suggestion is clicked, navigate to the product's detail page
  const handleSuggestionClick = (productId) => {
    router.push(`/product/${productId}`); // Navigate to the product detail page
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for products..."
        className="border rounded p-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
          {suggestions.map((product) => (
            <li
              key={product._id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(product._id)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAutocomplete;
