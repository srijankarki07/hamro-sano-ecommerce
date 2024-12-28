"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SearchContent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setError(null);

      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_products}?title=${query}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading || !searchResults) {
    return (
      <div className="spinner">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="product-container">
      <div className="search-results-header">
        <h1>Search Results for "{query}"</h1>
        <p>Total search results: {searchResults.length}</p>
      </div>

      {error && <p>Error: {error}</p>}

      <div className="product-content">
        {searchResults.length === 0 ? (
          <p>No results found for "{query}"</p>
        ) : (
          <div className="product-content">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="product-item"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="product-image"
                />
                <p className="product-name">{product.title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContent;
