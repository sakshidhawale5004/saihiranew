import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, type Category } from "@/lib/products";
import { PageHero } from "@/components/PageHero";
import HERO_IMG from "@/assets/editorial/khakhra-stack.jpg";

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): { c?: Category } =>
    s["c"] === "khakhra" || s["c"] === "bhakhri" ? { c: s["c"] as Category } : {},
  head: () => ({
    meta: [
      { title: "Artisanal Khakhras & Bhakhris Collection | SAIHIRA" },
      {
        name: "description",
        content:
          "Browse all handmade SHM Asal Khakhras and Bhakhris — from Jeera and Methi to Jaggery and Garlic.",
      },
      { property: "og:title", content: "All Khakhras & Bhakhris | SAIHIRA" },
      {
        property: "og:description",
        content: "Handmade flavours of crunchy Khakhras and Bhakhris.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { c } = Route.useSearch();
  const allProducts = useProducts();
  const list = c ? allProducts.filter((p) => p.category === c) : allProducts;
  const tabs: Array<{ label: string; c?: Category }> = [
    { label: "All Varieties" },
    { label: "Paper-Thin Khakhras", c: "khakhra" },
    { label: "Hearty Bhakhris", c: "bhakhri" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Hand-Rolled Gujarati Snacks"
        title={
          <>
            Authentic Khakhras & <em>Bhakhris</em>
          </>
        }
        subtitle="Authentic recipes slow-roasted on cast-iron tawas for clean, oil-light crunch and traditional wheaten goodness."
        image={HERO_IMG}
        badge="Zero Palm Oil · 100% Iron Tawa Roasted"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Our Snacks" }]}
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-border/70 pb-8">
          {tabs.map((t) => (
            <Link
              key={t.label}
              to="/products"
              search={t.c ? { c: t.c } : {}}
              className={c === t.c ? "btn-warm" : "btn-ghost"}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Category Range Highlights Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl bg-accent/5 border border-accent/15 px-4 py-3 text-xs font-medium text-foreground/80 text-center">
          {c === "khakhra" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">Khakhra Range:</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> Slow Baked</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> 100% Vegan</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> Made of Whole Wheat only</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> No artificial colours or preservatives</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> Vacuum Packed to sustain freshness</span>
            </>
          ) : c === "bhakhri" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">Bhakhri Range:</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> Roasted and Not fried</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> Whole wheat flour</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> 100% Vegan</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> No artificial colours or preservatives</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">Quality Promise:</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> Slow Baked & Roasted (Never Fried)</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> 100% Vegan</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> Whole Wheat Flour & Millets</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> No Artificial Colours or Preservatives</span>
              <span className="inline-flex items-center gap-1"><span className="text-accent font-bold">✓</span> Vacuum Packed Freshness</span>
            </>
          )}
        </div>

        {/* Product Count & Sub-indicator */}
        <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span>Showing {list.length} Artisan Snacks</span>
          <span>Vacuum Sealed Freshness</span>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 80}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
