"use client";
import React, { useEffect, useState } from "react";

const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <div
        className="carouselInner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div className="carouselItem" key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="image" />
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button onClick={handlePrev} className="prev-btn">
          &#10094;
        </button>
        <button onClick={handleNext} className="next-btn">
          &#10095;
        </button>
      </div>

      <div className="dots-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
