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

const k = (
  slug: string,
  name: string,
  image: string,
  tagline: string,
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
  notes,
  price: 120,
  weight: "200 g",
  stock: 45,
  rating: 4.9,
  badge,
  family,
  sku: `SHM-${slug.toUpperCase()}`,
  description: `Paper-thin, hand-rolled and slow-roasted until perfectly crisp. Our ${name} is baked in small batches for a light, crunchy bite with ${tagline.toLowerCase()}.`,
});

const b = (
  slug: string,
  name: string,
  image: string,
  tagline: string,
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
  notes,
  price: 140,
  weight: "200 g",
  stock: 35,
  rating: 4.9,
  badge,
  family,
  sku: `SHM-${slug.toUpperCase()}`,
  description: `Thick, hearty and handmade the traditional way. Our ${name} is pressed, pricked and roasted slowly for a deep crunch and ${tagline.toLowerCase()}.`,
});

export const initialProducts: Product[] = [
  k(
    "plain-khakhra",
    "Plain Khakhra",
    plain,
    "A clean, wholesome wheat flavour",
    ["Whole wheat", "Light & crisp", "Everyday classic"],
    "Bestseller",
    "Whole Wheat",
  ),
  k(
    "jeera-khakhra",
    "Jeera Khakhra",
    jeera,
    "Warm notes of roasted cumin",
    ["Cumin seeds", "No onion, no garlic", "Baked"],
    "Jain Sattvik",
    "Roasted Spices",
  ),
  k(
    "methi-khakhra",
    "Methi Khakhra",
    methi,
    "Gently bitter fenugreek leaves",
    ["Fenugreek", "Gujarati favourite", "Baked"],
    "Signature Batch",
    "Herbal / Fenugreek",
  ),
  k(
    "masala-khakhra",
    "Masala Khakhra",
    masala,
    "A bold house spice blend",
    ["Hand-ground spices", "Tangy & savoury", "Baked"],
    "Top Crunch",
    "Masala Blend",
  ),
  k(
    "kothmir-marcha-khakhra",
    "Kothmir-Marcha Khakhra",
    kothmir,
    "Fresh coriander and green chilli",
    ["Coriander leaves", "High fibre", "No onion, no garlic"],
    "Zesty Green",
    "Herb & Chilli",
  ),
  k(
    "chilli-garlic-khakhra",
    "Chilli Garlic Khakhra",
    chilli,
    "A fiery chilli and garlic kick",
    ["Spicy", "Garlic-forward", "Baked"],
    "Spicy Crunch",
    "Chilli Garlic",
  ),
  k(
    "pani-puri-khakhra",
    "Pani Puri Khakhra",
    panipuri,
    "The tangy zing of street-side pani puri",
    ["Chatpata", "Mint & tamarind", "Baked"],
    "Customer Favourite",
    "Chatpata Special",
  ),
  k(
    "oats-masala-khakhra",
    "Oats Masala Khakhra",
    oats,
    "Hearty oats with a masala twist",
    ["Oats", "High fibre", "Baked"],
    "Healthy Choice",
    "High Fibre Oats",
  ),
  k(
    "ragi-khakhra",
    "Ragi Khakhra",
    ragi,
    "Nutty finger millet goodness",
    ["Millet", "Rich in calcium", "Baked"],
    "Superfood",
    "Millet / Ragi",
  ),
  k(
    "bajri-methi-khakhra",
    "Bajri Methi Khakhra",
    bajriMethiK,
    "Pearl millet with fenugreek",
    ["Millet", "Earthy", "Baked"],
    "Nutrient Rich",
    "Pearl Millet",
  ),
  k(
    "farali-khakhra",
    "Farali Khakhra",
    farali,
    "Fasting-friendly and pure",
    ["Vrat friendly", "Grain-free flours", "Baked"],
    "Upvas Special",
    "Vrat Sattvik",
  ),
  k(
    "mug-khakhra",
    "Mug Khakhra",
    mug,
    "Protein-rich moong dal",
    ["Moong dal", "Protein rich", "Baked"],
    "Protein Rich",
    "Lentil / Moong",
  ),
  b(
    "jaggery-bhakhri",
    "Jaggery Bhakhri",
    jaggery,
    "A gentle sweetness of pure jaggery",
    ["Gud", "Sweet & crunchy", "Tea-time"],
    "Sweet Special",
    "Organic Gud",
  ),
  b(
    "bajri-bhakhri",
    "Bajri Bhakhri",
    bajriB,
    "The rustic taste of pearl millet",
    ["Millet", "Rustic", "Hearty"],
    "Traditional",
    "Pure Bajri",
  ),
  b(
    "bajri-methi-bhakhri",
    "Bajri Methi Bhakhri",
    bajriMethiB,
    "Millet with fragrant fenugreek",
    ["Millet", "Fenugreek", "Hearty"],
    "Village Style",
    "Bajri & Methi",
  ),
  b(
    "barley-bhakhri",
    "Barley Bhakhri",
    barley,
    "A wholesome, nutty barley flavour",
    ["Barley", "High fibre", "Hearty"],
    "Diet Special",
    "Nutty Barley",
  ),
  b(
    "black-pepper-bhakhri",
    "Black Pepper Bhakhri",
    pepper,
    "A peppery, aromatic warmth",
    ["Black pepper", "Aromatic", "Crunchy"],
    "Warm Spice",
    "Malabar Pepper",
  ),
  b(
    "garlic-bhakhri",
    "Garlic Bhakhri",
    garlic,
    "Roasted garlic in every bite",
    ["Garlic", "Savoury", "Crunchy"],
    "Rich Flavour",
    "Roasted Garlic",
  ),
  b(
    "farali-bhakhri",
    "Farali Bhakhri",
    faraliB,
    "Pure and fasting-friendly",
    ["Vrat friendly", "Grain-free flours", "Crunchy"],
    "Upvas Bhakhri",
    "Vrat Sattvik",
  ),
];

export const PRODUCTS_STORAGE_KEY = "saihira_products_catalog";

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
      // Ensure no duplicate items exist by slug or id
      const seen = new Set<string>();
      const deduplicated: Product[] = [];
      for (const item of parsed) {
        const key = item.slug || item.id;
        if (key && !seen.has(key)) {
          seen.add(key);
          deduplicated.push(item);
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
