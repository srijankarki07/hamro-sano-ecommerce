import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateItemQuantity } from "@/store/reducers/cartSlice";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import "./Modal.css";

const Modal = ({ isVisible, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [sortOption, setSortOption] = useState("none");

  const handleCheckout = () => {
    onClose();
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-backdrop") onClose();
  };

  const handleRemoveItem = (itemId) => {
    setItemToRemove(itemId);
    setShowConfirmation(true);
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      dispatch(removeItem({ id: itemToRemove }));
      setShowConfirmation(false);
      setItemToRemove(null);
    }
  };

  const cancelRemoveItem = () => {
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(updateItemQuantity({ id: itemId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item.quantity > 1) {
      dispatch(updateItemQuantity({ id: itemId, quantity: -1 }));
    }
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredItems = cartItems
    .filter((item) =>
      item.title.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      const totalPriceA = a.price * a.quantity;
      const totalPriceB = b.price * b.quantity;

      if (sortOption === "price-asc") {
        return totalPriceA - totalPriceB;
      }
      if (sortOption === "price-desc") {
        return totalPriceB - totalPriceA;
      }
      if (sortOption === "quantity-asc") {
        return a.quantity - b.quantity;
      }
      if (sortOption === "quantity-desc") {
        return b.quantity - a.quantity;
      }
      return 0;
    });

  if (!isVisible) return null;

  return (
    <div
      id="modal-backdrop"
      className="modal-backdrop"
      onClick={handleClickOutside}
    >
      <div className="modal-content">
        <h2>Shopping Cart</h2>

        <div className="filter-sort">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by product name"
            className="filter-input"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="none">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="quantity-asc">Quantity: Low to High</option>
            <option value="quantity-desc">Quantity: High to Low</option>
          </select>
        </div>

        <div className="cart-container">
          {filteredItems.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="item-image"
                />
                <p className="item-name">{item.title}</p>
                <button
                  className="quantity-button"
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  -
                </button>
                <p className="item-quantity">{item.quantity}</p>
                <button
                  className="quantity-button"
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </button>
                <p className="item-price">Rs.{item.price * item.quantity}</p>
                <MdDelete
                  size={18}
                  onClick={() => handleRemoveItem(item.id)}
                  className="delete-icon"
                />
              </div>
            ))
          )}
        </div>

        <div className="total">
          <p>
            Grand Total: <span className="item-price">Rs.{grandTotal}</span>
          </p>
        </div>
        <div className="modal-footer">
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal-backdrop">
          <div className="confirmation-modal-content">
            <h3>Are you sure you want to remove this item from your cart?</h3>
            <div className="confirmation-buttons">
              <button onClick={confirmRemoveItem} className="confirm-button">
                Confirm
              </button>
              <button onClick={cancelRemoveItem} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
