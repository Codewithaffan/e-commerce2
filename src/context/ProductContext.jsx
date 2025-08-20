"use client";
import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [cartOpen, setCartOpen] = useState(false); // ✅ Drawer state

  const addToCart = (product) => {
    // ensure price is stored as number only
    const cleanPrice =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^\d.-]/g, ""))
        : product.price;

    setCart((prev) => [...prev, { ...product, price: cleanPrice }]);

    // simple alert
    alert(`${product.name} added to cart!`);

    // toast fallback
    setToast({ message: `${product.name} added to cart!`, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 2000);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ProductContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cartOpen,
        setCartOpen, // ✅ expose to Navbar & Drawer
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
