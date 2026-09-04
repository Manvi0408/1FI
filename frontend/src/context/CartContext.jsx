import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = (item, { openDrawer = true } = {}) => {
    setItems((prev) => {
      const found = prev.find((i) => i.key === item.key);
      if (found) {
        return prev.map((i) => (i.key === item.key ? { ...i, qty: i.qty + (item.qty || 1) } : i));
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
    if (openDrawer) setOpen(true);
  };

  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const setQty = (key, qty) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );
  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
