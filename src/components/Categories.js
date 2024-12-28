"use client";
import { useDataContext } from "@/context/dataContext";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Categories() {
  const { siteData } = useDataContext();
  const categories = siteData?.apiOne?.slice(0, 5);

  return (
    <div className="categories-container">
      <p className="title">Categories</p>
      <div className="category-content">
        {categories?.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <div className="individual-category">
              <img
                src={category.image}
                alt={category}
                className="category-image"
              />
            </div>
            <p className="category-name">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
