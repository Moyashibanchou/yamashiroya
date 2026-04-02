import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    // 1. 初期化時に localStorage からデータを読み込む
    const [items, setItems] = useState(() => {
        const savedCart = localStorage.getItem('yamashiroya_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // 2. カートの中身が更新されるたびに localStorage に保存する
    useEffect(() => {
        localStorage.setItem('yamashiroya_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // 注文確定後にカートをリセットする関数
    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
