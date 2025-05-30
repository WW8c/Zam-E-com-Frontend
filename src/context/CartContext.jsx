import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(i => 
        item.isDigital 
          ? i.id === item.id && i.isDigital
          : i.id === item.id && i.packageLevel === item.packageLevel
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];

        if (item.isDigital) {
          updatedItems[existingIndex] = item;
        } else {
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + item.quantity
          };
        }

        return updatedItems;
      }

      return [...prevItems, item];
    });
  };
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && !item.isDigital
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
