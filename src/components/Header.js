"use client";
import React, { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import Modal from "./CartModal";
import { useSelector } from "react-redux";
import { useDataContext } from "@/context/dataContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const cartCount = useSelector((state) => state.cart.items.length);
  const { siteData, loading } = useDataContext();
  const categories = siteData?.apiOne?.slice(0, 5);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading || !siteData) {
    return (
      <div className="spinner">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <div className="navbar">
          <h1 onClick={() => router.push("/")}>HamroEcom</h1>

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
              <FaSearch className="search-icon" onClick={handleSearch} />
            </form>
          </div>

          <div className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <MdOutlineCancel /> : <IoMenu />}
          </div>

          <div className="icons">
            <div className="cart">
              <FaCartShopping size={22} onClick={() => setShowModal(true)} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </div>
          </div>
        </div>

        <div className="menu-container">
          <div className={`menu ${isOpen ? "open" : ""}`}>
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="menu-item"
                onClick={toggleMenu}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
