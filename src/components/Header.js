"use client";
import React, { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const cartCount = 2;
  const handleSearch = (e) => {};

  return (
    <div className="navbar">
      <h1 onClick={() => router.push("/")}>HamroSanoEcom</h1>
      <div className="home" onClick={() => router.push("/")}>
        <FaHome size={25} />
      </div>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in Hamro Sano Ecommerce"
          />
          <FaSearch className="search-icon" />
        </form>
      </div>
      <div className="icons">
        <div className="cart">
          <FaCartShopping size={22} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </div>
      </div>
    </div>
  );
}
