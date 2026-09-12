import { useEffect, useMemo, useState } from "react";
import { StoreContext } from "./useStore";

const WISHLIST_KEY = "bb_wishlist";
const CART_KEY = "bb_cart";

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []));
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { id: productId, qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQty = (productId, qty) => {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      wishlist,
      cart,
      cartCount,
      toggleWishlist,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
    }),
    [wishlist, cart, cartCount]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
