import { createContext, useContext, useState } from "react";

// Create context
const CartContext = createContext();

// Custom hook for easy access
export const useCart = () => useContext(CartContext);

// Context Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Optional: update quantity logic here
        return prevItems;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove an item
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Get total
  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
