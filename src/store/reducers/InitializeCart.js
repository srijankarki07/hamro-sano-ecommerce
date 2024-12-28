"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "./cartSlice";

const InitializeCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCartItems = () => {
      if (typeof window !== "undefined") {
        try {
          const storedCartItems = localStorage.getItem("cartItems");
          console.log("Stored Cart Items:", storedCartItems);
          return storedCartItems ? JSON.parse(storedCartItems) : [];
        } catch (error) {
          console.error("Error loading cart items from localStorage:", error);
          return [];
        }
      }
      return [];
    };

    const cartItems = loadCartItems();
    dispatch(setItems(cartItems));
  }, [dispatch]);

  return null;
};

export default InitializeCart;
