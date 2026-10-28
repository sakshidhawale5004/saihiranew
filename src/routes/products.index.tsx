import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { products, type Category } from "@/lib/products";

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): { c?: Category } =>
    s["c"] === "khakhra" || s["c"] === "bhakhri" ? { c: s["c"] } : {},
  head: () => ({
    meta: [
      { title: "Products — Khakhras & Bhakhris | SAIHIRA" },
      { name: "description", content: "Browse all handmade SHM Asal Khakhras and Bhakhris — from Jeera and Methi to Jaggery and Garlic." },
      { property: "og:title", content: "All Khakhras & Bhakhris | SAIHIRA" },
      { property: "og:description", content: "19 handmade flavours of crunchy Khakhras and Bhakhris." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { c } = Route.useSearch();
  const list = c ? products.filter((p) => p.category === c) : products;
  const tabs: Array<{ label: string; c?: Category }> = [{ label: "All" }, { label: "Khakhras", c: "khakhra" }, { label: "Bhakhris", c: "bhakhri" }];
  return (
    <div className="mx-auto max-w-6xl px-6 pt-14">
      <Reveal>
        <span className="eyebrow">The collection</span>
        <h1 className="mt-4 text-6xl md:text-7xl">Our <em>flavours</em></h1>
      </Reveal>
      <div className="mt-10 flex gap-3">
        {tabs.map((t) => (
          <Link key={t.label} to="/products" search={t.c ? { c: t.c } : {}} className={c === t.c ? "btn-warm" : "btn-ghost"}>
            {t.label}
          </Link>
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 100}><ProductCard p={p} /></Reveal>
        ))}
      </div>
    </div>
  );
}
