import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity, size, color }];
      }
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.id === productId && item.size === size && item.color === color)
    ));
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId && item.size === size && item.color === color) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
