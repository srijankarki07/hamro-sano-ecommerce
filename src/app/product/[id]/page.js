"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/reducers/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_products}/${id}`
          );
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading || !product) {
    return (
      <div className="spinner">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="image-carousel">
        <button className="carousel-button prev" onClick={handlePrevClick}>
          &#10094;
        </button>
        <img
          src={product?.images[currentImageIndex]}
          alt={product?.title}
          className="product-image"
        />
        <button className="carousel-button next" onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
      <div className="product-info">
        <h1>{product?.title}</h1>
        <p className="product-price">Price: Rs.{product?.price}</p>
        <p>{product?.description}</p>
        <div className="add-to-cart">
          <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
