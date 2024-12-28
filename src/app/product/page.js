"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_products}/?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();

        if (data.length < limit) {
          setHasNextPage(false);
        } else {
          setHasNextPage(true);
        }

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [offset, limit]);

  const handleNext = () => {
    if (hasNextPage) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handlePrev = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  if (loading || !products) {
    return (
      <div className="spinner">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="product-container">
      <p className="title">Just For You</p>
      <div className="product-content">
        {products?.map((product) => (
          <Link
            className="product-item"
            key={product.id}
            href={`/product/${product.id}`}
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

      <div className="pagination">
        <button onClick={handlePrev} disabled={offset === 0}>
          Prev
        </button>
        <button onClick={handleNext} disabled={!hasNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
