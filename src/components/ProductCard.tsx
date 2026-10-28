import { Link } from "@tanstack/react-router";
import { formatINR, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-border/80 bg-card p-4 pt-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-deep">
      <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
        <div className="aspect-square overflow-hidden rounded-lg bg-secondary/30 p-3">
          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="mt-4 text-center">
          <span className="font-display text-lg font-medium text-primary block">{p.name}</span>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{p.tagline}</p>
        </div>
      </Link>
      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3">
        <span className="font-display text-base font-semibold text-primary">{formatINR(p.price)} <span className="font-sans text-[0.7rem] font-normal text-muted-foreground">/ {p.weight}</span></span>
        <button
          onClick={() => { add(p.slug); toast.success(`${p.name} added to cart`); }}
          className="rounded-full border border-primary/80 bg-transparent px-3 py-1 font-sans text-xs font-semibold tracking-wider text-primary uppercase transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
