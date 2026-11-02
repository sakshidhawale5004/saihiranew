import { useState, useEffect } from "react";
import mug from "@/assets/p/baked-mug-khakhra-snack-packaging.jpg";
import kothmir from "@/assets/p/chatgpt-image-oct-27-2026-034554-pm.jpg";
import oats from "@/assets/p/premium-baked-oats-masala-khakhra-pouch.jpg";
import masala from "@/assets/p/premium-masala-khakhra-flat-lay.jpg";
import methi from "@/assets/p/shm-asal-methi-khakhra-packaging.jpg";
import farali from "@/assets/p/farali-khakhra-packaged-food-product.jpg";
import bajriMethiK from "@/assets/p/premium-bajri-methi-khakhra-packaging.jpg";
import chilli from "@/assets/p/premium-baked-chilli-garlic-khakhra.jpg";
import jeera from "@/assets/p/premium-jeera-khakhra-packaging.jpg";
import plain from "@/assets/p/premium-plain-khakhra-packaging-mockup.jpg";
import ragi from "@/assets/p/premium-ragi-khakhra-packaging-design.jpg";
import panipuri from "@/assets/p/shm-asal-baked-pani-puri-khakhra.jpg";
import jaggery from "@/assets/p/jaggery-bhakhri-rustic-product-display.jpg";
import bajriB from "@/assets/p/premium-bajri-bhakhri-packaging.jpg";
import bajriMethiB from "@/assets/p/premium-bajri-methi-bhakhri-packaging.jpg";
import barley from "@/assets/p/premium-barley-bhakhri-packaging.jpg";
import pepper from "@/assets/p/premium-black-pepper-bhakhri-packaging.jpg";
import faraliB from "@/assets/p/premium-farali-bhakhri-packaging.jpg";
import garlic from "@/assets/p/premium-garlic-bhakhri-packaging-render.jpg";

export type Category = "khakhra" | "bhakhri" | string;

export type Product = {
  id?: string;
  slug: string;
  name: string;
  category: Category;
  image: string;
  tagline: string;
  description: string;
  notes: string[];
  features?: string[];
  price: number;
  salePrice?: number;
  weight: string;
  stock?: number;
  rating?: number;
  badge?: string;
  family?: string;
  sku?: string;
};

export const PRODUCT_IMAGE_PRESETS = [
  { label: "Plain Khakhra", url: plain },
  { label: "Methi Khakhra", url: methi },
  { label: "Jeera Khakhra", url: jeera },
  { label: "Masala Khakhra", url: masala },
  { label: "Kothmir Marcha", url: kothmir },
  { label: "Chilli Garlic", url: chilli },
  { label: "Pani Puri Khakhra", url: panipuri },
  { label: "Oats Masala", url: oats },
  { label: "Ragi Khakhra", url: ragi },
  { label: "Mug Khakhra", url: mug },
  { label: "Jaggery Bhakhri", url: jaggery },
  { label: "Bajri Bhakhri", url: bajriB },
  { label: "Garlic Bhakhri", url: garlic },
  { label: "Farali Bhakhri", url: faraliB },
];

export const KHAKHRA_FEATURES = [
  "Slow Baked",
  "100% Vegan",
  "Made of Whole Wheat only",
  "No artificial colours or preservatives",
  "Vacuum Packed to sustain freshness",
];

export const BHAKHRI_FEATURES = [
  "Roasted and Not fried",
  "Whole wheat flour",
  "100% Vegan",
  "No artificial colours or preservatives",
];

const k = (
  slug: string,
  name: string,
  image: string,
  tagline: string,
  description: string,
  notes: string[],
  badge = "Classic Khakhra",
  family = "Whole Wheat",
): Product => ({
  id: slug,
  slug,
  name,
  category: "khakhra",
  image,
  tagline,
  description,
  notes,
  features: KHAKHRA_FEATURES,
  price: 120,
  weight: "200 g",
  stock: 45,
  rating: 4.9,
  badge,
  family,
  sku: `SHM-${slug.toUpperCase()}`,
});

const b = (
  slug: string,
  name: string,
  image: string,
  tagline: string,
  description: string,
  notes: string[],
  badge = "Handmade Bhakhri",
  family = "Slow Roasted",
): Product => ({
  id: slug,
  slug,
  name,
  category: "bhakhri",
  image,
  tagline,
  description,
  notes,
  features: BHAKHRI_FEATURES,
  price: 140,
  weight: "200 g",
  stock: 35,
  rating: 4.9,
  badge,
  family,
  sku: `SHM-${slug.toUpperCase()}`,
});

export const initialProducts: Product[] = [
  k(
    "plain-khakhra",
    "Plain Khakhra",
    plain,
    "A clean, wholesome wheat flavour",
    "Paper-thin, hand-rolled and slow-baked to perfection. Made in small batches, our Plain Khakhra delivers a light, satisfying crunch and the wholesome flavour of wheat in every bite.",
    ["Whole wheat", "Slow baked", "Everyday classic"],
    "Bestseller",
    "Whole Wheat",
  ),
  k(
    "jeera-khakhra",
    "Jeera Khakhra",
    jeera,
    "Warm notes of roasted cumin",
    "Paper-thin, hand-rolled and slow-baked to perfection. Made in small batches, our Jeera Khakhra delivers a light, satisfying crunch with the warm, aromatic flavour of roasted cumin in every bite.",
    ["Cumin seeds", "No onion, no garlic", "Baked"],
    "Jain Sattvik",
    "Roasted Spices",
  ),
  k(
    "methi-khakhra",
    "Methi Khakhra",
    methi,
    "The earthy flavour of fenugreek",
    "Paper-thin, hand-rolled and slow-roasted to perfection. Made in small batches, our Methi Khakhra delivers a light, satisfying crunch with the earthy flavour and gentle bitterness of fenugreek leaves in every bite.",
    ["Fenugreek", "Gujarati favourite", "Baked"],
    "Signature Batch",
    "Herbal / Fenugreek",
  ),
  k(
    "masala-khakhra",
    "Masala Khakhra",
    masala,
    "A bold house spice blend",
    "Paper-thin, hand-rolled and slow-roasted until perfectly crisp. Our Masala Khakhra is baked in small batches for a light, crunchy bite with a bold house spice blend.",
    ["House spice blend", "Tangy & savoury", "Baked"],
    "Top Crunch",
    "Masala Blend",
  ),
  k(
    "kothmir-marcha-khakhra",
    "Kothmir-Marcha Khakhra",
    kothmir,
    "Fresh coriander and a hint of green chilli",
    "Paper-thin, hand-rolled and slow-roasted to perfection. Made in small batches, our Kothmir-Marcha Khakhra delivers a light, satisfying crunch with the fresh flavour of coriander and the lively warmth of green chilli in every bite.",
    ["Fresh coriander", "Green chilli", "Baked"],
    "Zesty Green",
    "Herb & Chilli",
  ),
  k(
    "chilli-garlic-khakhra",
    "Chilli Garlic Khakhra",
    chilli,
    "A fiery chilli and garlic kick",
    "Paper-thin, hand-rolled and slow-roasted to perfection. Made in small batches, our Chilli Garlic Khakhra delivers a light, satisfying crunch with fiery chilli and bold garlic flavour in every bite.",
    ["Fiery chilli", "Bold garlic", "Baked"],
    "Spicy Crunch",
    "Chilli Garlic",
  ),
  k(
    "pani-puri-khakhra",
    "Pani Puri Khakhra",
    panipuri,
    "The tangy zing of street-side pani puri",
    "Paper-thin, hand-rolled and slow-roasted to perfection. Made in small batches, our Pani Puri Khakhra delivers a light, satisfying crunch with the lively spices and tangy zing of your favourite street-side pani puri in every bite.",
    ["Pani puri spices", "Street-side zing", "Baked"],
    "Customer Favourite",
    "Chatpata Special",
  ),
  k(
    "oats-masala-khakhra",
    "Oats Masala Khakhra",
    oats,
    "Hearty oats with a masala twist",
    "Paper-thin, hand-rolled and slow-roasted to perfection. Made in small batches, our Oats Masala Khakhra delivers a light, satisfying crunch with the hearty flavour of oats and a warming blend of masala spices in every bite.",
    ["Hearty oats", "Masala twist", "Baked"],
    "Healthy Choice",
    "High Fibre Oats",
  ),
  k(
    "ragi-khakhra",
    "Ragi Khakhra",
    ragi,
    "The earthy, nutty flavour of finger millet",
    "Paper-thin, hand-rolled and slow-roasted to perfection. Made in small batches, our Ragi Khakhra delivers a light, satisfying crunch with the earthy, nutty flavour of finger millet in every bite.",
    ["Finger millet", "Rich in calcium", "Baked"],
    "Superfood",
    "Millet / Ragi",
  ),
  k(
    "bajri-methi-khakhra",
    "Bajri Methi Khakhra",
    bajriMethiK,
    "Earthy pearl millet with aromatic fenugreek",
    "Paper-thin, hand-rolled and slow-roasted to perfection. Made in small batches, our Bajri Methi Khakhra delivers a light, satisfying crunch with the earthy flavour of pearl millet and the gentle bitterness of fenugreek in every bite.",
    ["Pearl millet", "Aromatic fenugreek", "Baked"],
    "Nutrient Rich",
    "Pearl Millet",
  ),
  k(
    "farali-khakhra",
    "Farali Khakhra",
    farali,
    "Fasting-friendly and pure",
    "Paper-thin, hand-rolled and slow-roasted until perfectly crisp. Our Farali Khakhra is baked in small batches for a light, crunchy bite with a fasting-friendly and pure flavour.",
    ["Fasting-friendly", "Pure & grain-free", "Baked"],
    "Upvas Special",
    "Vrat Sattvik",
  ),
  k(
    "mug-khakhra",
    "Mug Khakhra",
    mug,
    "The mild, nutty flavour of moong dal",
    "Paper-thin, hand-rolled and slow-roasted to perfection. Made in small batches, our Mug Khakhra delivers a light, satisfying crunch with the mild, nutty flavour of moong dal in every bite.",
    ["Moong dal", "Mild nutty flavour", "Baked"],
    "Protein Rich",
    "Lentil / Moong",
  ),
  b(
    "jaggery-bhakhri",
    "Jaggery Bhakhri",
    jaggery,
    "The gentle sweetness of pure jaggery",
    "Thick, hearty and handmade the traditional way. Our Jaggery Bhakhri is pressed, pricked and slowly roasted for a satisfying crunch, with the rich, mellow sweetness of pure jaggery in every bite.",
    ["Pure jaggery", "Roasted not fried", "Sweet crunch"],
    "Sweet Special",
    "Organic Gud",
  ),
  b(
    "bajri-bhakhri",
    "Bajri Bhakhri",
    bajriB,
    "The rustic taste of pearl millet",
    "Thick, hearty and handmade the traditional way. Our Bajri Bhakhri is pressed, pricked and roasted slowly for a deep crunch and the rustic taste of pearl millet.",
    ["Pearl millet", "Rustic taste", "Roasted not fried"],
    "Traditional",
    "Pure Bajri",
  ),
  b(
    "bajri-methi-bhakhri",
    "Bajri Methi Bhakhri",
    bajriMethiB,
    "Earthy pearl millet with fragrant fenugreek",
    "Thick, hearty and handmade the traditional way. Our Bajri Methi Bhakhri is pressed, pricked and slowly roasted for a satisfying crunch, with the earthy flavour of pearl millet and the gentle bitterness of fenugreek in every bite.",
    ["Pearl millet", "Fragrant fenugreek", "Roasted not fried"],
    "Village Style",
    "Bajri & Methi",
  ),
  b(
    "barley-bhakhri",
    "Barley Bhakhri",
    barley,
    "The wholesome, nutty flavour of barley",
    "Thick, hearty and handmade the traditional way. Our Barley Bhakhri is pressed, pricked and slowly roasted for a satisfying crunch, with the wholesome, nutty flavour of barley in every bite.",
    ["Wholesome barley", "Nutty flavour", "Roasted not fried"],
    "Diet Special",
    "Nutty Barley",
  ),
  b(
    "black-pepper-bhakhri",
    "Black Pepper Bhakhri",
    pepper,
    "A peppery, aromatic warmth",
    "Thick, hearty and handmade the traditional way. Our Black Pepper Bhakhri is pressed, pricked and roasted slowly for a deep crunch and a peppery, aromatic warmth.",
    ["Black pepper", "Aromatic warmth", "Roasted not fried"],
    "Warm Spice",
    "Malabar Pepper",
  ),
  b(
    "garlic-bhakhri",
    "Garlic Bhakhri",
    garlic,
    "Roasted garlic in every bite",
    "Thick, hearty and handmade the traditional way. Our Garlic Bhakhri is pressed, pricked and roasted slowly for a deep crunch and roasted garlic in every bite.",
    ["Roasted garlic", "Savory crunch", "Roasted not fried"],
    "Rich Flavour",
    "Roasted Garlic",
  ),
  b(
    "farali-bhakhri",
    "Farali Bhakhri",
    faraliB,
    "A hearty crunch for fasting days",
    "Thick, hearty and handmade the traditional way. Our Farali Bhakhri is pressed, pricked and slowly roasted for a satisfying crunch—a simple, flavourful snack for fasting days.",
    ["Fasting days", "Hearty crunch", "Roasted not fried"],
    "Upvas Bhakhri",
    "Vrat Sattvik",
  ),
];

export const PRODUCTS_STORAGE_KEY = "saihira_products_catalog_v2";

/* ---------------- Dynamic Product Storage API ---------------- */

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure no duplicate items exist by slug or id, and keep canonical definitions aligned
      const seen = new Set<string>();
      const deduplicated: Product[] = [];
      for (const item of parsed) {
        const key = item.slug || item.id;
        if (key && !seen.has(key)) {
          seen.add(key);
          const canonical = initialProducts.find((ip) => ip.slug === key);
          if (canonical) {
            deduplicated.push({
              ...canonical,
              ...item,
              tagline: canonical.tagline,
              description: canonical.description,
              features: canonical.features,
              price: item.price ?? canonical.price,
              stock: item.stock ?? canonical.stock,
              weight: canonical.weight,
            });
          } else {
            deduplicated.push(item);
          }
        }
      }
      return deduplicated;
    }
    return initialProducts;
  } catch {
    return initialProducts;
  }
}

export function saveStoredProducts(list: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("saihira:products-updated", { detail: list }));
    if ("BroadcastChannel" in window) {
      try {
        const bc = new BroadcastChannel("saihira_sync_bus");
        bc.postMessage({ type: "products-updated" });
        bc.close();
      } catch (err) {
        void err;
      }
    }
  } catch (e) {
    console.error("Failed to save products to localStorage:", e);
  }
}

export function addProduct(p: Partial<Product> & { name: string; price: number }): Product {
  const current = getStoredProducts();
  const baseSlug =
    p.slug ||
    p.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  let slug = baseSlug;
  let counter = 1;
  while (current.some((item) => item.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  const id = p.id || `prod-${Date.now().toString().slice(-6)}`;

  const created: Product = {
    id,
    slug,
    name: p.name,
    category: p.category || "khakhra",
    image: p.image || plain,
    tagline: p.tagline || p.name,
    description:
      p.description || `Handcrafted, slow-roasted ${p.name} prepared with authentic ingredients.`,
    notes: Array.isArray(p.notes)
      ? p.notes
      : typeof p.notes === "string"
        ? (p.notes as string)
            .split(/[·,]+/)
            .map((s: string) => s.trim())
            .filter(Boolean)
        : ["Handmade", "Baked", "Crisp"],
    price: Number(p.price),
    salePrice: p.salePrice ? Number(p.salePrice) : undefined,
    weight: p.weight || "200 g",
    stock: p.stock !== undefined ? Number(p.stock) : 40,
    rating: p.rating ? Number(p.rating) : 4.9,
    badge: p.badge || "New Arrival",
    family: p.family || "Handcrafted Special",
    sku: p.sku || `SHM-${slug.toUpperCase()}`,
  };

  const updated = [created, ...current];
  saveStoredProducts(updated);
  return created;
}

export function updateProduct(slugOrId: string, updates: Partial<Product>): Product | null {
  const current = getStoredProducts();
  let updatedProduct: Product | null = null;
  const updated = current.map((p) => {
    if (p.slug === slugOrId || p.id === slugOrId) {
      const merged: Product = {
        ...p,
        ...updates,
        notes: Array.isArray(updates.notes)
          ? updates.notes
          : typeof updates.notes === "string"
            ? (updates.notes as string)
                .split(/[·,]+/)
                .map((s: string) => s.trim())
                .filter(Boolean)
            : p.notes,
      };
      updatedProduct = merged;
      return merged;
    }
    return p;
  });

  if (updatedProduct) {
    saveStoredProducts(updated);
  }
  return updatedProduct;
}

export function deleteProduct(slugOrId: string): boolean {
  const current = getStoredProducts();
  const filtered = current.filter((p) => p.slug !== slugOrId && p.id !== slugOrId);
  if (filtered.length !== current.length) {
    saveStoredProducts(filtered);
    return true;
  }
  return false;
}

export function resetProductsCatalog(): Product[] {
  saveStoredProducts(initialProducts);
  return initialProducts;
}

export function useProducts(): Product[] {
  const [list, setList] = useState<Product[]>(getStoredProducts());

  useEffect(() => {
    const sync = () => setList(getStoredProducts());
    window.addEventListener("saihira:products-updated", sync);
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);

    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        bc = new BroadcastChannel("saihira_sync_bus");
        bc.onmessage = () => sync();
      } catch (err) {
        void err;
      }
    }

    return () => {
      window.removeEventListener("saihira:products-updated", sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
      if (bc) bc.close();
    };
  }, []);

  return list;
}

// Backward compatibility export
export const products: Product[] = initialProducts;

export const getProduct = (slug: string): Product | undefined => {
  return (
    getStoredProducts().find((p) => p.slug === slug || p.id === slug) ||
    initialProducts.find((p) => p.slug === slug)
  );
};

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
