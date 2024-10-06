import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm) {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/search?searchTerm=${searchTerm}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products..."
        className="border p-2 rounded w-full"
      />
      {loading && <div className="absolute left-0 top-full">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 top-full w-full border bg-white z-10">
          {suggestions.map((product) => (
            <li
              key={product._id}
              onClick={() => handleSuggestionClick(product.name)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
