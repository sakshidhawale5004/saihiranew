import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export type CartLine = { slug: string; qty: number };
type Ctx = {
  lines: Array<CartLine & { product: Product }>;
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "saihira-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const lines = items.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ ...l, product }] : [];
  });
  const value: Ctx = {
    lines,
    count: lines.reduce((a, l) => a + l.qty, 0),
    subtotal: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
    add: (slug, qty = 1) =>
      setItems((cur) =>
        cur.some((l) => l.slug === slug)
          ? cur.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
          : [...cur, { slug, qty }],
      ),
    setQty: (slug, qty) =>
      setItems((cur) =>
        qty <= 0
          ? cur.filter((l) => l.slug !== slug)
          : cur.map((l) => (l.slug === slug ? { ...l, qty } : l)),
      ),
    remove: (slug) => setItems((cur) => cur.filter((l) => l.slug !== slug)),
    clear: () => setItems([]),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export const SHIPPING_FREE_ABOVE = 499;
export const SHIPPING_FEE = 50;
export const shippingFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= SHIPPING_FREE_ABOVE ? 0 : SHIPPING_FEE;
