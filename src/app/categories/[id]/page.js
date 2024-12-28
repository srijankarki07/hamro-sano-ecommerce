"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_products}?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        const filteredProducts = data.filter(
          (product) => product.category.id.toString() === id
        );
        if (filteredProducts.length < limit) {
          setHasNextPage(false);
        } else {
          setHasNextPage(true);
        }

        setProducts(filteredProducts);
        setCategoryName(filteredProducts[0].category.name);
      } catch (error) {
        console.log("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading || !products) {
    return (
      <div className="spinner">
        <div className="loader"></div>
      </div>
    );
  }

  const handleNext = () => {
    if (hasNextPage) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handlePrev = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  return (
    <div className="product-container">
      {products.length === 0 && (
        <div className="not-found">
          <p className="no-products">Sorry, No products found !</p>
        </div>
      )}
      <h1 className="category-name">{categoryName}</h1>
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
            <p className="category-name">{product.title}</p>
          </Link>
        ))}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={offset === 0}>
            Prev
          </button>
          <button onClick={handleNext} disabled={!hasNextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
