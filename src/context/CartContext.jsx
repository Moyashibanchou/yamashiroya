import React, { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem("yamashiroya_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // モーダル用の状態
  const [showCartModal, setShowCartModal] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("yamashiroya_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    // モーダルを開く
    setLastAddedProduct(product);
    setShowCartModal(true);
  };

  const removeFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        showCartModal,
        closeCartModal,
        lastAddedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
