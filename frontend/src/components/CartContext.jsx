import React, { createContext, useContext, useState } from "react";

// Create Cart Context
const CartContext = createContext();

// Custom Hook for Cart
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add to Cart
  const addToCart = (newProduct) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) =>
          item.id === newProduct.id &&
          item.color === newProduct.color &&
          item.model === newProduct.model
      );

      if (existingItem) {
        // Update quantity if exists
        return prevCartItems.map((item) =>
          item.id === newProduct.id &&
          item.color === newProduct.color &&
          item.model === newProduct.model
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new product to cart
      return [...prevCartItems, { ...newProduct, quantity: 1 }];
    });
  };

  // Update Quantity
  const updateQuantity = (id, color, model, quantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id && item.color === color && item.model === model
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Remove from Cart
  const removeFromCart = (id, color, model) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter(
        (item) => item.id !== id || item.color !== color || item.model !== model
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
