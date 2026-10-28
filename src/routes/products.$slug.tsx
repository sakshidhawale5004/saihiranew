import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site";
import { formatINR } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/lib/products";

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
          { name: "description", content: `${loaderData.name} — ${loaderData.tagline}. Handmade by SAIHIRA.` },
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
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  return (
    <div className="mx-auto max-w-6xl px-6 pt-12">
      <Link to="/products" className="nav-link">← All products</Link>
      <div className="mt-8 grid items-center gap-14 md:grid-cols-2">
        <div className="frame p-6 pt-10 shadow-deep">
          <img src={p.image} alt={p.name} className="w-full rounded-md" />
        </div>
        <Reveal>
          <span className="eyebrow">{p.category === "khakhra" ? "Khakhra" : "Bhakhri"} · Handmade</span>
          <h1 className="mt-4 text-5xl md:text-6xl">{p.name}</h1>
          <p className="mt-4 font-display text-2xl italic text-muted-foreground">{p.tagline}</p>
          <p className="mt-4 font-display text-3xl font-bold text-primary">{formatINR(p.price)} <span className="text-base font-normal text-muted-foreground">/ {p.weight}</span></p>
          <p className="mt-6 text-muted-foreground">{p.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.notes.map((n) => <span key={n} className="rounded-full border border-border px-4 py-2 text-sm">{n}</span>)}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => { add(p.slug); toast.success(`${p.name} added to cart`); }} className="btn-warm">Add to cart</button>
            <Link to="/cart" className="btn-ghost">View cart</Link>
          </div>
        </Reveal>
      </div>
      <section className="pt-32">
        <h2 className="text-4xl">You may also love</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {related.map((r) => <ProductCard key={r.slug} p={r} />)}
        </div>
      </section>
    </div>
  );
}
