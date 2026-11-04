import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, type Category, CATEGORIES } from "@/lib/products";
import { PageHero } from "@/components/PageHero";
import HERO_IMG from "@/assets/saihira/rustic-khakhra-coriander.png";

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): { c?: Category } =>
    typeof s["c"] === "string" && s["c"] ? { c: s["c"] as Category } : {},
  head: () => ({
    meta: [
      { title: "Artisanal Bhakhris & Khakhras Collection | SAIHIRA" },
      {
        name: "description",
        content:
          "Browse our weekly fresh batch of handcrafted Bhakhris, Premium Bhakhris, Gluten-Free, No-Salt, Rotlas, Baked Khakhras, and Mobile Khakhras.",
      },
      { property: "og:title", content: "All Bhakhris & Khakhras | SAIHIRA" },
      {
        property: "og:description",
        content:
          "Weekly fresh batch dispatched catalog: Bhakhris, Khakhras, and Rotlas roasted slowly on cast-iron tawas.",
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
    { label: `All Varieties (${allProducts.length})` },
    ...CATEGORIES.map((cat) => ({
      label: cat.isPrime ? `⭐ ${cat.shortLabel} (Prime)` : cat.shortLabel,
      c: cat.id,
    })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Weekly Fresh Batch Dispatched"
        title={
          <>
            Authentic Bhakhris & <em>Khakhras</em>
          </>
        }
        subtitle="Our prime specialty is handcrafted Bhakhri, roasted slowly on cast-iron tawas alongside paper-thin Khakhras and rustic Rotlas with pure quality edible oil."
        image={HERO_IMG}
        badge="100% Iron Tawa Roasted · Zero Preservatives"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Our Snacks" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 border-b border-border/70 pb-8">
          {tabs.map((t) => {
            const isActive = (!t.c && !c) || (t.c && c === t.c);
            return (
              <Link
                key={t.label}
                to="/products"
                search={t.c ? { c: t.c } : {}}
                className={isActive ? "btn-warm text-xs px-4 py-2" : "btn-ghost text-xs px-4 py-2"}
              >
                {t.label}
              </Link>
            );
          })}
        </div>

        {/* Category Range Highlights Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl bg-accent/5 border border-accent/15 px-4 py-3 text-xs font-medium text-foreground/80 text-center">
          {c === "bhakhri" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">
                Bhakhri Range (Our Prime Product):
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Thick & Hearty Crunch
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Cast-Iron Roasted, Never Fried
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Stone-Ground Whole Wheat & Bajra
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Quality Edible Vegetable Oil
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Zero Artificial Preservatives
              </span>
            </>
          ) : c === "premium-bhakhri" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">
                Premium Bhakhri:
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Ancient Grains (Barley, Raggi, Moong)
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Sindhi Koki & Lola Bites
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Organic Desi Gud & Curry Leaves
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Upvas & Fasting Friendly
              </span>
            </>
          ) : c === "no-salt-bhakhri" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">
                No-Salt Bhakhri Range:
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> 100% Zero Added Salt / Sodium
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Heart & Wellness Friendly
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Natural Herbal Cumin & Fenugreek
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Cast-Iron Roasted
              </span>
            </>
          ) : c === "gluten-free-bhakhri" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">
                Gluten-Free Bhakhri Range:
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> 100% Wheat-Free & Gluten-Free Flours
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Dedicated Tawas & Small Batches
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Light & Easy Gut Digestion
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Nutrient-Dense Multi-Millets
              </span>
            </>
          ) : c === "rotla" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">
                Kathiyawadi Rotla:
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Traditional Hearth Roasted Bajra
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Thick, Hearty & Rustic Texture
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Desi Gud Naturally Sweetened Option
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Saurashtra Village Heritage
              </span>
            </>
          ) : c === "mobile-khakhra" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">
                Mobile Khakhra Range:
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Compact Pocket-Sized Discs
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Mess-Free Snacking On-The-Go
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> 100% Baked & Crispy
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Ideal for Travel, Office & Lunchboxes
              </span>
            </>
          ) : c === "khakhra" ? (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">
                Baked Khakhra Range:
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Paper-Thin Gossamer Discs
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> 100% Slow Baked on Iron Tawas
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Stone-Ground Whole Wheat & Millets
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Vacuum Sealed Freshness Barrier
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold text-accent uppercase tracking-wider">
                Weekly Fresh Quality Promise:
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Prime Product: Handcrafted Bhakhri
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Slow Baked & Roasted (Never Fried)
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Pure Quality Edible Vegetable Oil
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Zero Artificial Colours or Preservatives
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-accent font-bold">✓</span> Fresh Batches Dispatched Weekly
              </span>
            </>
          )}
        </div>

        {/* Product Count & Sub-indicator */}
        <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span>
            Showing {list.length} {c ? "Flavours" : "Artisan Snacks"}
          </span>
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
