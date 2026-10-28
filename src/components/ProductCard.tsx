import { Link, useNavigate } from "@tanstack/react-router";
import { formatINR, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { useState } from "react";

// Helper to determine badges for each product based on category & notes
function getProductBadges(p: Product): { primary: string; secondary?: string } {
  if (p.slug === "methi-khakhra") return { primary: "Must Try", secondary: "Aromatic Fenugreek" };
  if (p.slug === "jeera-khakhra") return { primary: "Jain Sattvik", secondary: "No Onion Garlic" };
  if (p.slug === "pani-puri-khakhra") return { primary: "Street Food Hit", secondary: "Chatpata Crunch" };
  if (p.slug === "jaggery-bhakhri") return { primary: "Desi Gud", secondary: "Refined Sugar-Free" };
  if (p.slug === "farali-khakhra" || p.slug === "farali-bhakhri") return { primary: "Upvas Special", secondary: "Grain-Free Flours" };
  if (p.slug === "ragi-khakhra") return { primary: "Calcium Rich", secondary: "Nutty Finger Millet" };
  if (p.slug === "oats-masala-khakhra") return { primary: "High Fibre", secondary: "Hearty Oats" };
  if (p.slug === "garlic-bhakhri" || p.slug === "chilli-garlic-khakhra") return { primary: "Bold Garlic", secondary: "Savory & Crispy" };
  if (p.category === "bhakhri") return { primary: "Hand Pressed", secondary: "Thick & Hearty" };
  return { primary: "Tawa Roasted", secondary: p.notes[0] || "100% Baked" };
}

export function ProductCard({ p }: { p: Product }) {
  const { add, lines } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const isInCart = lines.some((l) => l.slug === p.slug);
  const badges = getProductBadges(p);

  const handleAddToCart = () => {
    add(p.slug, qty);
    toast.success(`${p.name} (×${qty}) added to cart`, {
      description: "Hand-rolled and sealed fresh from our kitchen.",
    });
  };

  const handleBuyNow = () => {
    add(p.slug, qty);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-3 sm:p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-luxury">
      {/* ──────────────── Top Image Container ──────────────── */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F7F2EA]">
        <Link to="/products/$slug" params={{ slug: p.slug }} className="block h-full w-full">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-108"
          />
        </Link>

        {/* Top-Left Badges (as seen in reference design) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          <span className="inline-block rounded-full bg-accent/90 px-3 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
            {badges.primary}
          </span>
          {badges.secondary && (
            <span className="inline-block rounded-full bg-primary/85 px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider text-primary-foreground shadow-sm backdrop-blur-md">
              {badges.secondary}
            </span>
          )}
        </div>

        {/* Quick View Pill Bar (bottom center of image) */}
        <div className="absolute bottom-2.5 inset-x-2.5 flex justify-center z-10 opacity-90 transition-opacity group-hover:opacity-100">
          <Link
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="inline-flex items-center justify-center rounded-full border border-border/60 bg-white/95 px-5 py-1.5 text-xs font-semibold tracking-wider text-primary shadow-sm backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white hover:text-accent"
          >
            <span>Quick View</span>
            <span className="ml-1 text-accent">→</span>
          </Link>
        </div>
      </div>

      {/* ──────────────── Product Details ──────────────── */}
      <div className="mt-4 flex flex-1 flex-col">
        {/* Product Title */}
        <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
          <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-primary transition-colors hover:text-accent leading-snug">
            {p.name}
          </h3>
        </Link>

        {/* Poetic Subtitle / Tagline */}
        <p className="mt-1 font-serif italic text-xs sm:text-sm text-accent/95 line-clamp-1">
          {p.tagline}
        </p>

        {/* Price & Weight */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-primary">
            {formatINR(p.price)}
          </span>
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground">
            {p.weight}
          </span>
        </div>

        {/* Quantity Selector (- 1 +) Pill Container */}
        <div className="mt-3.5 flex items-center justify-between rounded-full border border-border/90 bg-secondary/60 px-4 py-1 max-w-[130px]">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="text-base font-bold text-primary hover:text-accent px-1 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="font-sans text-xs font-semibold text-primary">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="text-base font-bold text-primary hover:text-accent px-1 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* ──────────────── Bottom Action Buttons ──────────────── */}
        <div className="mt-4 pt-2 border-t border-border/60 flex items-center gap-2">
          {/* Buy Now Button */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 rounded-full border border-primary/50 bg-card py-2 text-center font-sans text-xs font-semibold uppercase tracking-wider text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white active:scale-95 shadow-sm"
          >
            Buy Now
          </button>

          {/* Add to Cart / View Cart Button */}
          {isInCart ? (
            <Link
              to="/cart"
              className="flex-1 rounded-full bg-accent text-accent-foreground py-2 text-center font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-amber-500 shadow-sm active:scale-95"
            >
              View Cart
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-accent text-accent-foreground py-2 text-center font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-amber-500 shadow-sm active:scale-95"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
