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

export type Category = "khakhra" | "bhakhri";
export type Product = {
  slug: string;
  name: string;
  category: Category;
  image: string;
  tagline: string;
  description: string;
  notes: string[];
  price: number;
  weight: string;
};

const k = (slug: string, name: string, image: string, tagline: string, notes: string[]): Product => ({
  slug, name, category: "khakhra", image, tagline, notes, price: 120, weight: "200 g",
  description: `Paper-thin, hand-rolled and slow-roasted until perfectly crisp. Our ${name} is baked in small batches for a light, crunchy bite with ${tagline.toLowerCase()}.`,
});
const b = (slug: string, name: string, image: string, tagline: string, notes: string[]): Product => ({
  slug, name, category: "bhakhri", image, tagline, notes, price: 140, weight: "200 g",
  description: `Thick, hearty and handmade the traditional way. Our ${name} is pressed, pricked and roasted slowly for a deep crunch and ${tagline.toLowerCase()}.`,
});

export const products: Product[] = [
  k("plain-khakhra", "Plain Khakhra", plain, "A clean, wholesome wheat flavour", ["Whole wheat", "Light & crisp", "Everyday classic"]),
  k("jeera-khakhra", "Jeera Khakhra", jeera, "Warm notes of roasted cumin", ["Cumin seeds", "No onion, no garlic", "Baked"]),
  k("methi-khakhra", "Methi Khakhra", methi, "Gently bitter fenugreek leaves", ["Fenugreek", "Gujarati favourite", "Baked"]),
  k("masala-khakhra", "Masala Khakhra", masala, "A bold house spice blend", ["Hand-ground spices", "Tangy & savoury", "Baked"]),
  k("kothmir-marcha-khakhra", "Kothmir-Marcha Khakhra", kothmir, "Fresh coriander and green chilli", ["Coriander leaves", "High fibre", "No onion, no garlic"]),
  k("chilli-garlic-khakhra", "Chilli Garlic Khakhra", chilli, "A fiery chilli and garlic kick", ["Spicy", "Garlic-forward", "Baked"]),
  k("pani-puri-khakhra", "Pani Puri Khakhra", panipuri, "The tangy zing of street-side pani puri", ["Chatpata", "Mint & tamarind", "Baked"]),
  k("oats-masala-khakhra", "Oats Masala Khakhra", oats, "Hearty oats with a masala twist", ["Oats", "High fibre", "Baked"]),
  k("ragi-khakhra", "Ragi Khakhra", ragi, "Nutty finger millet goodness", ["Millet", "Rich in calcium", "Baked"]),
  k("bajri-methi-khakhra", "Bajri Methi Khakhra", bajriMethiK, "Pearl millet with fenugreek", ["Millet", "Earthy", "Baked"]),
  k("farali-khakhra", "Farali Khakhra", farali, "Fasting-friendly and pure", ["Vrat friendly", "Grain-free flours", "Baked"]),
  k("mug-khakhra", "Mug Khakhra", mug, "Protein-rich moong dal", ["Moong dal", "Protein rich", "Baked"]),
  b("jaggery-bhakhri", "Jaggery Bhakhri", jaggery, "A gentle sweetness of pure jaggery", ["Gud", "Sweet & crunchy", "Tea-time"]),
  b("bajri-bhakhri", "Bajri Bhakhri", bajriB, "The rustic taste of pearl millet", ["Millet", "Rustic", "Hearty"]),
  b("bajri-methi-bhakhri", "Bajri Methi Bhakhri", bajriMethiB, "Millet with fragrant fenugreek", ["Millet", "Fenugreek", "Hearty"]),
  b("barley-bhakhri", "Barley Bhakhri", barley, "A wholesome, nutty barley flavour", ["Barley", "High fibre", "Hearty"]),
  b("black-pepper-bhakhri", "Black Pepper Bhakhri", pepper, "A peppery, aromatic warmth", ["Black pepper", "Aromatic", "Crunchy"]),
  b("garlic-bhakhri", "Garlic Bhakhri", garlic, "Roasted garlic in every bite", ["Garlic", "Savoury", "Crunchy"]),
  b("farali-bhakhri", "Farali Bhakhri", faraliB, "Pure and fasting-friendly", ["Vrat friendly", "Grain-free flours", "Crunchy"]),
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
