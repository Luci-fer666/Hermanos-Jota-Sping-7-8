import React, { createContext, useState } from 'react';
 
export const CartContext = createContext();
 
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
 
  const addItemToCart = (productToAdd) => {
    setCartItems(prevItems => {
      // Verificamos si el producto ya está en el carrito
      const existingItem = prevItems.find(item => item._id === productToAdd._id);
 
      if (existingItem) {
        // Si ya existe, aumentamos su cantidad
        return prevItems.map(item =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Si es nuevo, lo añadimos al array con cantidad 1
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
  };
 
  // Aquí podrías añadir más funciones como removeItem, clearCart, etc.
 
  return (
    <CartContext.Provider value={{ cartItems, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};