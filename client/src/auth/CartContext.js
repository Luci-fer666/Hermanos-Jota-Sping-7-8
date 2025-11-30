import React, { createContext, useState } from 'react';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
  if (productToAdd.stock > 0) {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === productToAdd._id);

      if (existingItem) {
        return prevItems.map(item =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });

    return;
  }

  alert("No hay stock de este producto");
};

    const clearCart = () => {
    setCartItems([]);
  };

const removeItem = (idToRemove) => {
  setCartItems(prevItems => {
    const existingItem = prevItems.find(item => item._id === idToRemove);
    
    if (!existingItem) return prevItems;

    if (existingItem.quantity > 1) {
      return prevItems.map(item =>
        item._id === idToRemove
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    return prevItems.filter(item => item._id !== idToRemove);
  });
};
 
  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, clearCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};