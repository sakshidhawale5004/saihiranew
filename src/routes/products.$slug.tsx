import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site";
import { formatINR, getProduct, getStoredProducts } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} | SHM Asal by SAIHIRA` },
          {
            name: "description",
            content: `${loaderData.name} — ${loaderData.tagline}. Handmade by SAIHIRA.`,
          },
          { property: "og:title", content: `${loaderData.name} | SAIHIRA` },
          { property: "og:description", content: loaderData.tagline },
        ]
      : [{ title: "Product not found | SAIHIRA" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const allStored = getStoredProducts();
  const related = allStored
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-20">
      <Link to="/products" className="nav-link">
        ← All products
      </Link>
      <div className="mt-8 grid items-center gap-14 md:grid-cols-2">
        <div className="frame p-6 pt-10 shadow-deep rounded-2xl bg-card border border-border">
          <img
            src={p.image}
            alt={p.name}
            className="w-full rounded-md object-contain max-h-[460px] mx-auto"
          />
        </div>
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="eyebrow">
              {p.category === "khakhra" ? "Khakhra" : "Bhakhri"} · Handmade
            </span>
            {p.badge && (
              <span className="rounded-full bg-accent/15 text-accent text-xs px-2.5 py-0.5 font-semibold">
                {p.badge}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-display font-medium text-primary">
            {p.name}
          </h1>
          <p className="mt-3 font-display text-xl italic text-muted-foreground">{p.tagline}</p>
          <div className="mt-4 flex items-baseline gap-3">
            <p className="font-display text-3xl font-bold text-primary">
              {formatINR(p.price)}
              {p.salePrice && (
                <span className="ml-2 text-lg text-muted-foreground line-through font-normal">
                  {formatINR(p.salePrice)}
                </span>
              )}
            </p>
            <span className="text-sm font-normal text-muted-foreground">/ {p.weight}</span>
            {p.stock !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.stock > 15 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
              >
                {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
              </span>
            )}
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{p.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-border bg-secondary/40 px-3.5 py-1.5 text-xs font-medium text-foreground"
              >
                {n}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => {
                add(p.slug);
                toast.success(`${p.name} added to cart`);
              }}
              className="btn-warm"
            >
              Add to cart
            </button>
            <Link to="/cart" className="btn-ghost">
              View cart
            </Link>
          </div>
        </Reveal>
      </div>
      {related.length > 0 && (
        <section className="pt-24 border-t border-border mt-16">
          <h2 className="text-3xl font-display text-primary">You may also love</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
