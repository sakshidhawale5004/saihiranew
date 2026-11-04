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

export type Category =
  | "bhakhri"
  | "premium-bhakhri"
  | "no-salt-bhakhri"
  | "gluten-free-bhakhri"
  | "rotla"
  | "khakhra"
  | "mobile-khakhra"
  | string;

export interface CategoryMeta {
  id: Category;
  label: string;
  shortLabel: string;
  tagline: string;
  isPrime?: boolean;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "bhakhri",
    label: "Bhakhri (Our Prime Product)",
    shortLabel: "Bhakhri",
    tagline: "Thick, hearty & hand-pressed. Roasted slow on cast-iron tawas.",
    isPrime: true,
  },
  {
    id: "premium-bhakhri",
    label: "Premium Bhakhri",
    shortLabel: "Premium Bhakhri",
    tagline: "Artisan recipes with ancient millets, koki bites & rich botanicals.",
  },
  {
    id: "no-salt-bhakhri",
    label: "No-Salt Bhakhri",
    shortLabel: "No-Salt Bhakhri",
    tagline: "Zero added salt for heart wellness and low-sodium diets.",
  },
  {
    id: "gluten-free-bhakhri",
    label: "Gluten Free Bhakhri",
    shortLabel: "Gluten Free",
    tagline: "100% wheat-free millets & nutritious grains rolled with care.",
  },
  {
    id: "rotla",
    label: "Rotla",
    shortLabel: "Rotla",
    tagline: "Authentic Kathiyawadi hearth-roasted bajra & desi gud rotlas.",
  },
  {
    id: "khakhra",
    label: "Round Baked Khakhra",
    shortLabel: "Baked Khakhra",
    tagline: "Paper-thin gossamer discs roasted on seasoned iron tawas.",
  },
  {
    id: "mobile-khakhra",
    label: "Mobile Khakhra",
    shortLabel: "Mobile Khakhra",
    tagline: "Pocket-sized crispy bites designed for effortless travel & snacking.",
  },
];

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
  { label: "Bajri Methi Bhakhri", url: bajriMethiB },
  { label: "Garlic Bhakhri", url: garlic },
  { label: "Farali Bhakhri", url: faraliB },
  { label: "Black Pepper Bhakhri", url: pepper },
  { label: "Barley Bhakhri", url: barley },
];

export const BHAKHRI_FEATURES = [
  "Our Prime Specialty",
  "Slow Roasted on Cast-Iron Tawa (Never Fried)",
  "Wholesome Stone-Ground Flour",
  "Quality Edible Vegetable Oil",
  "Zero Artificial Preservatives",
  "Sealed Fresh in Multi-Layer Pouches",
];

export const PREMIUM_BHAKHRI_FEATURES = [
  "Handcrafted Artisan Recipe",
  "Slow Roasted (Never Fried)",
  "Traditional Ancient Millets & Grains",
  "Quality Edible Vegetable Oil",
  "Zero Artificial Colours or Preservatives",
  "Freshly Dispatched Every Week",
];

export const NO_SALT_FEATURES = [
  "Zero Added Salt / Sodium",
  "Slow Tawa Roasted",
  "Heart & Wellness Conscious",
  "100% Whole Flour & Digestive Spices",
  "Zero Artificial Preservatives",
];

export const GLUTEN_FREE_FEATURES = [
  "100% Wheat-Free & Gluten-Free Flours",
  "Pure Nutrient-Dense Millets",
  "Slow Roasted on Dedicated Tawas",
  "Gentle on Digestion & Gut",
  "Zero Artificial Preservatives",
];

export const ROTLA_FEATURES = [
  "Authentic Kathiyawadi Hearth Roasted",
  "Thick & Satisfying Desi Texture",
  "Stone-Ground Bajra / Pearl Millet",
  "Naturally Sweetened with Desi Gud (Gud Variant)",
  "100% Wholesome & Preservative Free",
];

export const KHAKHRA_FEATURES = [
  "100% Baked & Slow Roasted",
  "Paper-Thin Gossamer Discs",
  "Made with Whole Wheat Flour",
  "Pure Quality Edible Oil",
  "Zero Artificial Preservatives",
  "Multi-Layer Vacuum Freshness",
];

export const MOBILE_KHAKHRA_FEATURES = [
  "Compact Travel-Friendly Pocket Size",
  "100% Baked Thin & Crunchy",
  "Stone-Ground Millets & Wheat",
  "Mess-Free Snacking On-The-Go",
  "Zero Preservatives · Stays Crisp",
];

const makeItem = (
  slug: string,
  name: string,
  category: Category,
  image: string,
  tagline: string,
  description: string,
  notes: string[],
  features: string[],
  price: number,
  weight: string,
  badge: string,
  family: string,
): Product => ({
  id: slug,
  slug,
  name,
  category,
  image,
  tagline,
  description,
  notes,
  features,
  price,
  weight,
  stock: 40,
  rating: 4.9,
  badge,
  family,
  sku: `SHM-${slug.toUpperCase()}`,
});

export const initialProducts: Product[] = [
  /* ─────────────────────────────────────────────────────────────
     1. BHAKHRI (Our Prime Product) — 10 Flavours
     ───────────────────────────────────────────────────────────── */
  makeItem(
    "methi-bhakhri",
    "Methi Bhakhri",
    "bhakhri",
    methi,
    "Fragrant kasuri methi in hearty roasted wheat",
    "Thick, hearty, and hand-pressed. Made from whole wheat flour kneaded with aromatic kasuri methi and slow-roasted on seasoned cast-iron tawas for satisfying crunch.",
    ["Kasuri Methi", "Whole Wheat", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Prime Product",
    "Everyday Bhakhri",
  ),
  makeItem(
    "jeera-bhakhri",
    "Jeera Bhakhri",
    "bhakhri",
    jeera,
    "Warm notes of slow-roasted whole cumin seeds",
    "Hand-rolled and pricked for delicate blisters. Spiced with roasted cumin seeds that release soothing digestive warmth in every crunch.",
    ["Roasted Cumin", "Jain Sattvik", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Jain Sattvik",
    "Everyday Bhakhri",
  ),
  makeItem(
    "masala-bhakhri",
    "Masala Bhakhri",
    "bhakhri",
    masala,
    "Signature Kathiyawadi spiced whole wheat roast",
    "Richly blended with roasted coriander, cumin, turmeric, and dry ginger for an authentic Saurashtra tea-time experience.",
    ["Kathiyawadi Masala", "Warm & Savoury", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Bestseller",
    "Everyday Bhakhri",
  ),
  makeItem(
    "plain-bhakhri",
    "Plain Bhakhri",
    "bhakhri",
    plain,
    "Clean wholesome roasted wheat disc",
    "Pure whole wheat dough lightly salted and roasted over seasoned tawas. Pair with fresh white butter (makhan), pickle, or hot masala chai.",
    ["100% Whole Wheat", "Everyday Classic", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Heritage Classic",
    "Everyday Bhakhri",
  ),
  makeItem(
    "bajari-bhakhri",
    "Bajari Bhakhri",
    "bhakhri",
    bajriB,
    "Rustic Saurashtra pearl millet crunch",
    "Stone-ground bajra flour pressed by hand and roasted until nutty and golden. Wholesome rustic energy in every bite.",
    ["Desi Bajari", "Rustic Flavour", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Village Recipe",
    "Millets & Grains",
  ),
  makeItem(
    "kotmir-marcha-bhakhri",
    "Kotmir Marcha Bhakhri",
    "bhakhri",
    kothmir,
    "Garden-fresh coriander & lively green chilli",
    "Freshly harvested green coriander leaves finely chopped and kneaded with pungent green chilli for an aromatic, herbal punch.",
    ["Fresh Coriander", "Green Chilli", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Herbal Zest",
    "Everyday Bhakhri",
  ),
  makeItem(
    "garlic-bhakhri",
    "Garlic Bhakhri",
    "bhakhri",
    garlic,
    "Bold roasted garlic warmth in every bite",
    "Kneaded with crushed golden-roasted garlic cloves and spices. Yields a deeply savory aroma that pairs delightfully with hot chai.",
    ["Roasted Garlic", "Bold Flavour", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Rich Flavour",
    "Everyday Bhakhri",
  ),
  makeItem(
    "mari-black-pepper-bhakhri",
    "Mari (Black Pepper) Bhakhri",
    "bhakhri",
    pepper,
    "Cracked Malabar black pepper warmth",
    "Coarsely ground black peppercorns infused into hearty wheat dough. Digestive, invigorating, and deliciously peppery.",
    ["Malabar Pepper", "Digestive Warmth", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Digestive Warmth",
    "Everyday Bhakhri",
  ),
  makeItem(
    "pav-bhaji-bhakhri",
    "Pav Bhaji Bhakhri",
    "bhakhri",
    masala,
    "Mumbai street-style spiced bhaji crunch",
    "Infused with authentic aromatic pav bhaji spices, dehydrated tomatoes, and herbs for a nostalgic chatpata bite.",
    ["Pav Bhaji Spices", "Chatpata Hit", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Street Food Special",
    "Chatpata Specials",
  ),
  makeItem(
    "pani-puri-bhakhri",
    "Pani Puri Bhakhri",
    "bhakhri",
    panipuri,
    "Zingy pudina and chatpata pani puri seasoning",
    "A creative fusion of authentic pani puri spices, tangy amchur, and roasted mint kneaded into hearty roasted bhakhri.",
    ["Pani Puri Zing", "Tangy Mint", "Roasted Not Fried"],
    BHAKHRI_FEATURES,
    140,
    "200 g",
    "Customer Favourite",
    "Chatpata Specials",
  ),

  /* ─────────────────────────────────────────────────────────────
     2. PREMIUM BHAKHRI — 11 Flavours
     ───────────────────────────────────────────────────────────── */
  makeItem(
    "bajari-methi-premium-bhakhri",
    "Bajari Methi Bhakhri",
    "premium-bhakhri",
    bajriMethiB,
    "Rustic pearl millet paired with fragrant fenugreek",
    "A seasonal Saurashtra delicacy bringing together hearty bajra flour with sun-dried kasuri methi for supreme nourishment.",
    ["Bajra & Methi", "Winter Classic", "Artisan Batch"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Artisan Special",
    "Premium Specialty",
  ),
  makeItem(
    "koki-bites-bhakhri",
    "Koki Bites Bhakhri",
    "premium-bhakhri",
    methi,
    "Sindhi koki inspired crisp roasted bites",
    "Layered with cracked spices, onions, coriander, and pomegranate seeds, roasted to golden perfection like authentic Sindhi Koki.",
    ["Koki Recipe", "Herb Spiced", "Tea-Time Hit"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Chef Specialty",
    "Premium Specialty",
  ),
  makeItem(
    "lola-bites-bhakhri",
    "Lola Bites Bhakhri",
    "premium-bhakhri",
    jaggery,
    "Traditional festive sweet & savoury lola disc",
    "Inspired by festive Sindhi Lola, lightly sweetened and spiced with green cardamom and roasted seeds for a delicate melt-in-mouth crunch.",
    ["Lola Specialty", "Festive Delicacy", "Cardamom & Gud"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Festive Exclusive",
    "Sweet & Savoury",
  ),
  makeItem(
    "onion-pepper-bhakhri",
    "Onion Pepper Bhakhri",
    "premium-bhakhri",
    pepper,
    "Caramelized onion notes with cracked black pepper",
    "Slow-caramelized onion flakes blended with coarse black pepper. Rich, savory, and deeply satisfying with evening tea.",
    ["Sweet Onion", "Black Pepper", "Rich Savory"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Gourmet Savoury",
    "Premium Specialty",
  ),
  makeItem(
    "barley-jav-bhakhri",
    "Barley (Jav) Bhakhri",
    "premium-bhakhri",
    barley,
    "Nutrient-dense ancient barley grain goodness",
    "High in dietary fibre and beta-glucans. Stone-ground barley flour crafted into a wholesome, low-glycemic roasted bhakhri.",
    ["Pure Barley (Jav)", "Low GI", "Diet Friendly"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Super Grain",
    "Ancient Grains",
  ),
  makeItem(
    "raggi-nachni-bhakhri",
    "Raggi (Nachni) Bhakhri",
    "premium-bhakhri",
    ragi,
    "Calcium-rich red finger millet artisanal roast",
    "100% nutrient-dense ragi roasted into a satisfying earthy disc. Rich in natural calcium, iron, and slow-burning energy.",
    ["Ragi (Nachni)", "Calcium Rich", "Super Grain"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Calcium Rich",
    "Millets & Grains",
  ),
  makeItem(
    "jaggery-bhakhri",
    "Jaggery Bhakhri",
    "premium-bhakhri",
    jaggery,
    "Sweet desi jaggery infused crispy tea snack",
    "Kneaded with unrefined organic desi gud (jaggery) and toasted sesame seeds. The ideal sugar-free sweet bite for chai lovers.",
    ["Pure Desi Gud", "Refined Sugar-Free", "Sweet Crunch"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Sweet Special",
    "Desi Gud Specials",
  ),
  makeItem(
    "farali-bhakhri",
    "Farali Bhakhri",
    "premium-bhakhri",
    faraliB,
    "Upvas-approved pure singhada & rajgira flours",
    "Prepared strictly for fasting days with rajgira, moraiyo, rock salt (sendha namak), and roasted cumin. Pure, pious, and crisp.",
    ["Upvas Friendly", "Sendha Namak", "Fasting Pure"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Upvas Special",
    "Vrat Sattvik",
  ),
  makeItem(
    "fafdi-ghatiya-bhakhri",
    "Fafdi Ghatiya Bhakhri",
    "premium-bhakhri",
    plain,
    "Savory fafda spices baked to crisp perfection",
    "Captures the iconic Gujarati morning fafda flavour with carom seeds (ajwain), black pepper, and asafoetida in a roasted bhakhri.",
    ["Fafda Spices", "Ajwain Infused", "Snack Specialty"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Gujarati Icon",
    "Premium Specialty",
  ),
  makeItem(
    "moong-bhakhri",
    "Moong Bhakhri",
    "premium-bhakhri",
    mug,
    "Protein-packed yellow moong flour roasted disc",
    "Wholesome yellow moong dal ground and spiced with cumin and ginger. Light on the stomach and rich in plant-based protein.",
    ["Moong Lentil", "High Protein", "Light Digestion"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Protein Power",
    "Protein Rich",
  ),
  makeItem(
    "curry-patta-bhakhri",
    "Curry Patta Bhakhri",
    "premium-bhakhri",
    kothmir,
    "Fragrant hand-picked curry leaves & mustard",
    "Infused with crisp sun-dried curry leaves, mustard seeds, and gentle green chillies for a revitalizing herbal aroma.",
    ["Curry Leaves", "Coastal Aroma", "Herbal Crunch"],
    PREMIUM_BHAKHRI_FEATURES,
    150,
    "200 g",
    "Aromatic Herb",
    "Botanical Herbs",
  ),

  /* ─────────────────────────────────────────────────────────────
     3. NO-SALT BHAKHRI (Zero Added Salt) — 4 Flavours
     ───────────────────────────────────────────────────────────── */
  makeItem(
    "no-salt-methi-bhakhri",
    "No-Salt Methi Bhakhri",
    "no-salt-bhakhri",
    methi,
    "Pure fenugreek crunch with zero added salt",
    "Specially rolled for sodium-conscious patrons and blood pressure care, letting the natural herbal bitterness of methi shine.",
    ["Zero Added Salt", "Fenugreek Rich", "Heart Friendly"],
    NO_SALT_FEATURES,
    140,
    "200 g",
    "Zero Salt",
    "Wellness Range",
  ),
  makeItem(
    "no-salt-jeera-bhakhri",
    "No-Salt Jeera Bhakhri",
    "no-salt-bhakhri",
    jeera,
    "Natural roasted cumin aromatics with zero salt",
    "Whole roasted cumin seeds provide rich digestive flavor without requiring a single grain of added salt.",
    ["Zero Added Salt", "Cumin Aromatic", "Diet Essential"],
    NO_SALT_FEATURES,
    140,
    "200 g",
    "Zero Salt",
    "Wellness Range",
  ),
  makeItem(
    "no-salt-masala-bhakhri",
    "No-Salt Masala Bhakhri",
    "no-salt-bhakhri",
    masala,
    "Herbal spice blend crafted without sodium",
    "Blended with black pepper, dry ginger, ajwain, and coriander seeds for a punchy, savory flavor without added sodium.",
    ["Zero Added Salt", "Herbal Spices", "Light & Crisp"],
    NO_SALT_FEATURES,
    140,
    "200 g",
    "Zero Salt",
    "Wellness Range",
  ),
  makeItem(
    "no-salt-bajari-bhakhri",
    "No-Salt Bajari Bhakhri",
    "no-salt-bhakhri",
    bajriB,
    "Rustic pearl millet without added salt",
    "Wholesome Saurashtra pearl millet flour roasted slowly on iron tawas with zero added sodium.",
    ["Zero Added Salt", "100% Bajra", "Wholesome Grain"],
    NO_SALT_FEATURES,
    140,
    "200 g",
    "Zero Salt",
    "Wellness Range",
  ),

  /* ─────────────────────────────────────────────────────────────
     4. GLUTEN FREE BHAKHRI — 6 Flavours
     ───────────────────────────────────────────────────────────── */
  makeItem(
    "gluten-free-methi-bhakhri",
    "Gluten Free Methi Bhakhri",
    "gluten-free-bhakhri",
    methi,
    "Wheat-free millet base with aromatic fenugreek",
    "Crafted from certified gluten-free millet flours and fragrant kasuri methi on dedicated tawas for maximum gut comfort.",
    ["Gluten-Free Flour", "Methi Leaves", "Gut Friendly"],
    GLUTEN_FREE_FEATURES,
    160,
    "200 g",
    "Gluten Free",
    "Gluten Free",
  ),
  makeItem(
    "gluten-free-jeera-bhakhri",
    "Gluten Free Jeera Bhakhri",
    "gluten-free-bhakhri",
    jeera,
    "Wheat-free crunchy base tempered with cumin",
    "A blend of sorghum, pearl millet, and roasted cumin seeds, providing a crisp texture without gluten.",
    ["Gluten-Free Flour", "Roasted Cumin", "Digestive"],
    GLUTEN_FREE_FEATURES,
    160,
    "200 g",
    "Gluten Free",
    "Gluten Free",
  ),
  makeItem(
    "gluten-free-masala-bhakhri",
    "Gluten Free Masala Bhakhri",
    "gluten-free-bhakhri",
    masala,
    "Spiced artisanal disc made without wheat",
    "Savory blend of roasted turmeric, coriander, cumin, and dry mango powder on a gluten-free multi-millet base.",
    ["Gluten-Free Flour", "Aromatic Spices", "Safe & Crisp"],
    GLUTEN_FREE_FEATURES,
    160,
    "200 g",
    "Gluten Free",
    "Gluten Free",
  ),
  makeItem(
    "gluten-free-kotmir-marcha-bhakhri",
    "Gluten Free Kotmir Marcha Bhakhri",
    "gluten-free-bhakhri",
    kothmir,
    "Fresh herbs & green chilli on gluten-free base",
    "Hand-kneaded with garden coriander and green chilli on a pure gluten-free grain dough.",
    ["Gluten-Free Flour", "Fresh Coriander", "Spicy Herbs"],
    GLUTEN_FREE_FEATURES,
    160,
    "200 g",
    "Gluten Free",
    "Gluten Free",
  ),
  makeItem(
    "gluten-free-koki-bites-bhakhri",
    "Gluten Free Koki Bites Bhakhri",
    "gluten-free-bhakhri",
    methi,
    "Wheat-free recreation of authentic spiced koki",
    "Crispy, spiced koki bites made with gut-friendly gluten-free grains, toasted seeds, and warming spices.",
    ["Gluten-Free Flour", "Traditional Spices", "Crunchy Bites"],
    GLUTEN_FREE_FEATURES,
    160,
    "200 g",
    "Gluten Free",
    "Gluten Free",
  ),
  makeItem(
    "gluten-free-onion-pepper-bhakhri",
    "Gluten Free Onion Pepper Bhakhri",
    "gluten-free-bhakhri",
    pepper,
    "Roasted onion & black pepper on gluten-free base",
    "Delightful caramelised onion sweetness and sharp black pepper crunch on a pure wheat-free canvas.",
    ["Gluten-Free Flour", "Roasted Onion", "Cracked Pepper"],
    GLUTEN_FREE_FEATURES,
    160,
    "200 g",
    "Gluten Free",
    "Gluten Free",
  ),

  /* ─────────────────────────────────────────────────────────────
     5. ROTLA — 2 Flavours
     ───────────────────────────────────────────────────────────── */
  makeItem(
    "bajari-rotla",
    "Bajari Rotla",
    "rotla",
    bajriB,
    "Thick traditional Kathiyawadi pearl millet rotla",
    "Hand-patted thick bajra disc slow-baked on open cast-iron hearth tawas. Deep, rustic, nutty flavor straight from Saurashtra.",
    ["Desi Bajari", "Thick Hearth Roast", "Authentic Village Style"],
    ROTLA_FEATURES,
    130,
    "200 g",
    "Village Specialty",
    "Kathiyawadi Rotla",
  ),
  makeItem(
    "bajari-gud-rotla",
    "Bajari Gud Rotla",
    "rotla",
    jaggery,
    "Rustic bajra rotla sweetened with desi jaggery",
    "Kneaded with pure melted desi jaggery and roasted bajra flour. A warm, nourishing Gujarati winter favorite.",
    ["Bajra & Desi Gud", "Natural Jaggery", "Traditional Energy"],
    ROTLA_FEATURES,
    130,
    "200 g",
    "Desi Gud Rotla",
    "Kathiyawadi Rotla",
  ),

  /* ─────────────────────────────────────────────────────────────
     6. KHAKHRA (Round - BAKED) — 14 Flavours
     ───────────────────────────────────────────────────────────── */
  makeItem(
    "methi-khakhra",
    "Methi Khakhra",
    "khakhra",
    methi,
    "Earthy aroma of slow-baked kasuri fenugreek",
    "Paper-thin, hand-rolled and slow-roasted on cast-iron tawas to crisp perfection with aromatic kasuri methi.",
    ["Kasuri Methi", "Paper-Thin", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Bestseller",
    "Whole Wheat Khakhra",
  ),
  makeItem(
    "jeera-khakhra",
    "Jeera Khakhra",
    "khakhra",
    jeera,
    "Warm aromatic notes of roasted cumin seeds",
    "Gossamer thin wheat disc roasted with hand-roasted cumin seeds. Authentic Jain sattvik breakfast pairing with morning chai.",
    ["Roasted Cumin", "Jain Sattvik", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Jain Sattvik",
    "Whole Wheat Khakhra",
  ),
  makeItem(
    "masala-khakhra",
    "Masala Khakhra",
    "khakhra",
    masala,
    "Bold house spice blend with lively crunch",
    "Paper-thin and toasted until golden blisters form. Seasoned with an authentic Gujarat dry masala mix.",
    ["House Spices", "Zesty & Crisp", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Top Crunch",
    "Whole Wheat Khakhra",
  ),
  makeItem(
    "kothmir-marcha-khakhra",
    "Kothmir Mircha Khakhra",
    "khakhra",
    kothmir,
    "Garden-fresh coriander and lively green chilli",
    "Crisp, green, and vibrant. Rolled with freshly ground coriander and spicy green chillies for a refreshing kick.",
    ["Fresh Coriander", "Green Chilli", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Zesty Green",
    "Whole Wheat Khakhra",
  ),
  makeItem(
    "pani-puri-khakhra",
    "Pani Puri Khakhra",
    "khakhra",
    panipuri,
    "Tangy zing of street-side pani puri spices",
    "Infused with tangy dried mango, black salt, and refreshing mint for the authentic taste of street-side pani puri in crisp form.",
    ["Pani Puri Spices", "Street-Side Zing", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Customer Favourite",
    "Chatpata Khakhra",
  ),
  makeItem(
    "oats-masala-khakhra",
    "Oats Masala Khakhra",
    "khakhra",
    oats,
    "Hearty rolled oats with warming masala blend",
    "Wholesome rolled oats blended with whole wheat flour and toasted spices for high fibre and lasting fullness.",
    ["Rolled Oats", "High Fibre", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "High Fibre",
    "Health & Fibre",
  ),
  makeItem(
    "ragi-khakhra",
    "Raagi (Nachni) Khakhra",
    "khakhra",
    ragi,
    "Nutritious finger millet baked wafer-thin",
    "Rich in plant calcium and dietary fibre. Red ragi millet roasted into delicate, paper-thin crispy discs.",
    ["Ragi / Nachni", "Calcium Rich", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Superfood",
    "Millet Khakhra",
  ),
  makeItem(
    "bajri-methi-khakhra",
    "Bajari Methi Khakhra",
    "khakhra",
    bajriMethiK,
    "Earthy pearl millet with aromatic fenugreek",
    "Wholesome pearl millet flour combined with sun-dried methi leaves and slow-baked for a satisfying village-style crunch.",
    ["Pearl Millet", "Fenugreek", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Village Style",
    "Millet Khakhra",
  ),
  makeItem(
    "chilli-garlic-khakhra",
    "Chilly Garlic Khakhra",
    "khakhra",
    chilli,
    "Fiery red chilli punch paired with roasted garlic",
    "Zesty, spicy, and bold. Roasted on cast-iron tawas with garlic paste and coarse red chilli flakes.",
    ["Fiery Chilli", "Roasted Garlic", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Spicy Crunch",
    "Whole Wheat Khakhra",
  ),
  makeItem(
    "plain-khakhra",
    "Plain Khakhra",
    "khakhra",
    plain,
    "Clean wholesome wheat flavour baked crisp",
    "The purest expression of hand-rolled khakhra. Made with stone-ground whole wheat flour and light sea salt.",
    ["Whole Wheat", "Clean Taste", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Everyday Classic",
    "Whole Wheat Khakhra",
  ),
  makeItem(
    "farali-khakhra",
    "Farali Khakhra",
    "khakhra",
    farali,
    "Fasting-approved pure rajgira & sendha namak",
    "Prepared strictly for fasting days (vrat / upvas) using grain-free rajgira and moraiyo flours with pure rock salt.",
    ["Fasting Friendly", "Sendha Namak", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Upvas Special",
    "Vrat Sattvik",
  ),
  makeItem(
    "lemon-chilli-khakhra",
    "Lemon Chilli Khakhra",
    "khakhra",
    chilli,
    "Zesty citrus tang paired with spicy green chilli",
    "A vibrant combination of bright citrus lemon flavor with the fiery warmth of green chillies in a gossamer-thin disc.",
    ["Lemon Tang", "Green Chilli", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Tangy Zest",
    "Whole Wheat Khakhra",
  ),
  makeItem(
    "chorafali-khakhra",
    "Chorafali Khakhra",
    "khakhra",
    masala,
    "Festive spiced crispy chorafali crunch baked thin",
    "Recreates the iconic Diwali chorafali crunch with gram flour, black salt, and dry mango seasoning in a baked khakhra.",
    ["Chorafali Masala", "Gujarati Festive", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Festive Hit",
    "Specialty Khakhra",
  ),
  makeItem(
    "jiralu-khakhra",
    "Jiralu Khakhra",
    "khakhra",
    jeera,
    "Dusted with authentic Gujarati digestive jiralu",
    "Sprinkled with authentic Saurashtra jiralu powder — a therapeutic digestive blend of cumin, ginger, and rock salt.",
    ["Digestive Jiralu", "Aromatic Cumin", "Baked"],
    KHAKHRA_FEATURES,
    120,
    "200 g",
    "Digestive Special",
    "Whole Wheat Khakhra",
  ),

  /* ─────────────────────────────────────────────────────────────
     7. MOBILE KHAKHRA (Mini / Pocket size) — 6 Flavours
     ───────────────────────────────────────────────────────────── */
  makeItem(
    "mobile-bajari-methi-khakhra",
    "Bajari Methi Mobile Khakhra",
    "mobile-khakhra",
    bajriMethiK,
    "Pocket-sized pearl millet & fenugreek crunch",
    "Miniature 10cm crispy baked discs packed into portable pouches for mess-free snacking in the office or on the road.",
    ["Pocket Sized", "Bajra Methi", "On-The-Go"],
    MOBILE_KHAKHRA_FEATURES,
    110,
    "150 g",
    "Pocket Khakhra",
    "Mobile Khakhra",
  ),
  makeItem(
    "mobile-jeera-ajwain-khakhra",
    "Jeera Ajwain Mobile Khakhra",
    "mobile-khakhra",
    jeera,
    "Bite-sized digestives with cumin & carom seeds",
    "Infused with digestion-friendly jeera and ajwain, portioned perfectly for travel, flights, and lunchboxes.",
    ["Pocket Sized", "Jeera Ajwain", "Digestive"],
    MOBILE_KHAKHRA_FEATURES,
    110,
    "150 g",
    "Pocket Khakhra",
    "Mobile Khakhra",
  ),
  makeItem(
    "mobile-raagi-khakhra",
    "Raagi Mobile Khakhra",
    "mobile-khakhra",
    ragi,
    "Crispy finger millet mini discs for healthy snacking",
    "Bite-sized calcium-rich ragi discs that easily fit in your bag, car console, or backpack for guilt-free anytime munching.",
    ["Pocket Sized", "Ragi Millet", "Superfood"],
    MOBILE_KHAKHRA_FEATURES,
    110,
    "150 g",
    "Pocket Khakhra",
    "Mobile Khakhra",
  ),
  makeItem(
    "mobile-koki-bite-khakhra",
    "Koki Bite Mobile Khakhra",
    "mobile-khakhra",
    methi,
    "Crunchy miniature spiced koki wafers",
    "Inspired by Sindhi koki, packed in miniature wafer discs with onion seeds, cumin, and fresh herbal spices.",
    ["Pocket Sized", "Koki Spices", "Travel Friendly"],
    MOBILE_KHAKHRA_FEATURES,
    110,
    "150 g",
    "Pocket Khakhra",
    "Mobile Khakhra",
  ),
  makeItem(
    "mobile-lasuni-palak-khakhra",
    "Lasuni Palak Mobile Khakhra",
    "mobile-khakhra",
    kothmir,
    "Fresh spinach puree with roasted garlic in bite size",
    "Pureed fresh palak (spinach) and fragrant garlic cloves kneaded into mini baked khakhras for iron-rich crunchy snacking.",
    ["Pocket Sized", "Spinach & Garlic", "Iron Rich"],
    MOBILE_KHAKHRA_FEATURES,
    110,
    "150 g",
    "Pocket Khakhra",
    "Mobile Khakhra",
  ),
  makeItem(
    "mobile-juvar-khakhra",
    "Juvar Mobile Khakhra",
    "mobile-khakhra",
    plain,
    "Gluten-friendly sorghum (jowar) mini crispy discs",
    "Light, airy, and easily digestible white sorghum grain baked into convenient mini discs for health-conscious foodies.",
    ["Pocket Sized", "Juvar / Sorghum", "Light Crunch"],
    MOBILE_KHAKHRA_FEATURES,
    110,
    "150 g",
    "Pocket Khakhra",
    "Mobile Khakhra",
  ),
];

export const PRODUCTS_STORAGE_KEY = "saihira_products_catalog_v3";

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
      // Make sure all initialProducts are always present
      for (const ip of initialProducts) {
        if (!seen.has(ip.slug)) {
          seen.add(ip.slug);
          deduplicated.push(ip);
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
    category: p.category || "bhakhri",
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
        : ["Handmade", "Roasted", "Crisp"],
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
