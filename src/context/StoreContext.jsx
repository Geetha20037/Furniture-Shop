import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read("woodora-cart", []));
  const [wishlist, setWishlist] = useState(() => read("woodora-wishlist", []));
  const [recent, setRecent] = useState(() => read("woodora-recent", []));
  const [compare, setCompare] = useState(() => read("woodora-compare", []));
  const [darkMode, setDarkMode] = useState(() => read("woodora-dark", false));
  const [toast, setToast] = useState(null);

  useEffect(() => localStorage.setItem("woodora-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("woodora-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("woodora-recent", JSON.stringify(recent)), [recent]);
  useEffect(() => localStorage.setItem("woodora-compare", JSON.stringify(compare)), [compare]);
  useEffect(() => {
    localStorage.setItem("woodora-dark", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const notify = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(window.__woodoraToast);
    window.__woodoraToast = window.setTimeout(() => setToast(null), 2600);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { ...product, quantity }];
    });
    notify(`${product.name} added to cart`);
  };

  const updateQuantity = (id, quantity) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    notify("Item removed from cart", "info");
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    setWishlist(prev => exists ? prev.filter(item => item.id !== product.id) : [...prev, product]);
    notify(exists ? "Removed from wishlist" : "Added to wishlist");
  };

  const addRecent = (product) => {
    setRecent(prev => [product, ...prev.filter(item => item.id !== product.id)].slice(0, 6));
  };

  const toggleCompare = (product) => {
    const exists = compare.some(item => item.id === product.id);
    if (!exists && compare.length >= 3) {
      notify("Compare up to 3 products", "error");
      return;
    }
    setCompare(prev => exists ? prev.filter(item => item.id !== product.id) : [...prev, product]);
    notify(exists ? "Removed from comparison" : "Added to comparison");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({
    cart, wishlist, recent, compare, darkMode, toast, cartCount, cartTotal,
    setDarkMode, addToCart, updateQuantity, removeFromCart, toggleWishlist,
    addRecent, toggleCompare, notify
  }), [cart, wishlist, recent, compare, darkMode, toast, cartCount, cartTotal]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);