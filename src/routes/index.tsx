import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { products, useProducts, CATEGORIES, imgMethiBhakhri, imgBajariRotla, imgKokiBitesBhakhri, imgNoSaltMethiBhakhri, imgGfMethiBhakhri, imgMobileJeeraAjwain, imgAuthenticFlavours, methi } from "@/lib/products";

// Authentic High-Resolution Visual Assets from public/saihira
import HOME_HERO_BG from "@/assets/saihira/homehero.png";
import RUSTIC_CHAI from "@/assets/saihira/rustic-khakhra-chai.png";
import RUSTIC_CORIANDER from "@/assets/saihira/rustic-khakhra-coriander.png";
import RUSTIC_BHAKRI from "@/assets/saihira/rustic-bhakri-spices.png";
import RUSTIC_GOLDEN_FEAST from "@/assets/saihira/rustic-golden-flatbread.png";
import RUSTIC_ROTI_FEAST from "@/assets/saihira/rustic-roti-feast.png";
import RUSTIC_SPICES from "@/assets/saihira/rustic-khakhra-spices.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAIHIRA — Artisanal Handmade Bhakhris & Khakhras · Best in Taste" },
      {
        name: "description",
        content:
          "Our prime specialty is authentic Gujarati Bhakhri, along with paper-thin Khakhras & Rotlas roasted on iron tawas. 50+ authentic flavours dispatched fresh weekly.",
      },
      { property: "og:title", content: "SAIHIRA — Best in Taste Handmade Gujarati Snacks" },
      {
        property: "og:description",
        content: "Authentic handmade Bhakhris & Khakhras roasted with pure quality edible oil.",
      },
    ],
  }),
  component: Index,
});

const why = [
  [
    "Cast-Iron Tawa Roast",
    "Slowly toasted on seasoned iron tawas with traditional wooden presses. Never fried, crisp without greasy residue.",
  ],
  [
    "Stone-Ground Flours",
    "Pure whole wheat, bajri, ragi, barley, oats, and moong ground in small artisan batches every morning.",
  ],
  [
    "Pure Quality Edible Oil",
    "Tempered lightly with quality edible vegetable oil and hand-roasted spices. Non-greasy, wholesome crunch with zero artificial preservatives.",
  ],
  [
    "Authentic Jain & Sattvik",
    "Dedicated options prepared without onion, garlic, or root vegetables, plus vrat-friendly farali crisps.",
  ],
];

const steps = [
  [
    "01",
    "Daily Stone-Ground Dough",
    "Whole grains milled fine, spiced with hand-roasted jeera, kasuri methi, and sea salt.",
  ],
  [
    "02",
    "Hand-Rolled Gossamer Thin",
    "Artisan women roll each disc paper-thin on traditional round wooden patlas.",
  ],
  [
    "03",
    "Even Wooden Block Press",
    "Pressed steadily on hot iron tawas using wooden 'dhabus' for delicate, uniform blisters.",
  ],
  [
    "04",
    "Vacuum-Sealed Freshness",
    "Sealed within minutes of cooling into multi-layer packs that keep crunch intact for months.",
  ],
];

const reviews = [
  [
    "The Methi and Jeera snacks taste just like the ones from Saurashtra. Super thin, perfectly roasted on iron tawa, and not greasy at all. Our whole family loves them with morning ginger chai.",
    "Hetal Parekh",
    "Verified Patron · Mumbai",
  ],
  [
    "Ordered 35 custom gift hampers for our office Diwali gifting in Bangalore. Every single box arrived intact, vacuum-sealed, and fresh. The Jaggery Bhakhri was an instant favourite.",
    "Kavita & Anand S.",
    "Corporate Client · Bengaluru",
  ],
  [
    "I was skeptical ordering snacks online, but the crunch is incredible. Crisp, aromatic, zero greasy aftertaste and authentic homemade crunch. Highly recommend the Methi Bhakhri and Bajri Methi.",
    "Dr. Rajesh Vora",
    "Verified Patron · Ahmedabad",
  ],
];

const tastingMoments = [
  {
    tag: "Morning Chai",
    title: "The Classic Breakfast Pairing",
    desc: "Lightly spiced Jeera & Methi Khakhras paired with steaming adrak-wali chai to awaken the senses.",
    img: RUSTIC_CHAI,
  },
  {
    tag: "Artisanal Table",
    title: "Afternoon Chutney Platter",
    desc: "Crispy roasted khakhras served with tangy sweet mango chundo, green chilli pickle, or cool mint dip.",
    img: RUSTIC_CORIANDER,
  },
  {
    tag: "Master Roast",
    title: "Golden Tawa Perfection",
    desc: "Each piece pressed with traditional wooden blocks until the characteristic golden blisters emerge.",
    img: RUSTIC_BHAKRI,
  },
];

function Index() {
  const allProducts = useProducts();
  const [activeBatchCategory, setActiveBatchCategory] = useState<string>("bhakhri");

  // Curated 4 featured signature snacks highlighting our Prime Product (Bhakhri) & Khakhra
  const signatureItems = [
    allProducts.find((p) => p.slug === "methi-bhakhri") || allProducts[0] || products[0],
    allProducts.find((p) => p.slug === "masala-bhakhri") || allProducts[1] || products[1],
    allProducts.find((p) => p.slug === "methi-khakhra") || allProducts[2] || products[2],
    allProducts.find((p) => p.slug === "bajari-methi-premium-bhakhri") || allProducts[3] || products[3],
  ].filter(Boolean);

  const batchItems = allProducts.filter((p) => p.category === activeBatchCategory);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Using User's homeherosection.png Background)
          Full background image from public/homeherosection.png with
          soft warm overlay scrim for high legibility and light form.
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-between py-12 sm:py-16 md:py-20 border-b border-border/80">
        {/* User-Provided Hero Background Image */}
        <img
          src={HOME_HERO_BG}
          alt="SAIHIRA Artisanal Gujarati Khakhra Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Lighter Warm Scrim for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0]/95 via-[#FAF6F0]/82 sm:via-[#FAF6F0]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/90 via-transparent to-transparent" />

        {/* Top Spacer for balance */}
        <div className="hidden sm:block" />

        {/* Main Content Area (Left-Aligned, allowing the background artwork to shine) */}
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 my-auto">
          <div className="max-w-2xl text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-[#F6EDE2]/95 px-4 py-1.5 shadow-xs backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span className="font-sans text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Prime Specialty · Dispatched Fresh Weekly
              </span>
            </div>

            {/* Headline: Balanced, majestic typography */}
            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight text-primary leading-[1.12]">
              Asal Gujarati Bhakhri <br />
              <span className="font-serif italic font-normal text-accent">
                &amp; Artisan Khakhra
              </span>
            </h1>

            {/* Sub-headline: Poetic prime product callout */}
            <p className="mt-3.5 font-serif italic text-lg sm:text-xl md:text-2xl text-[#6D4733] font-normal leading-snug">
              Our Prime Specialty — Slow-Roasted on Cast-Iron Tawas
            </p>

            {/* Subtitle */}
            <p className="mt-4 font-sans text-sm sm:text-base font-normal leading-relaxed text-[#544237]/90 max-w-xl">
              Thick, hearty Bhakhris hand-pressed on cast-iron tawas alongside paper-thin Khakhras and
              rustic Rotlas. Prepared in small artisan batches with stone-ground flours, pure quality
              edible oil, and traditional Gujarati spices.
            </p>

            {/* Primary Action Button */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 sm:px-9 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Shop Fresh Crunch
              </Link>

              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Weekly Fresh Batches Dispatched</span>
              </div>
            </div>

            {/* Micro Trust Strip */}
            <div className="mt-10 pt-6 border-t border-border/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground font-sans">
              <span className="inline-flex items-center gap-1.5">
                <span className="text-accent font-bold">✓</span> 100% Cast-Iron Roasted
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-accent font-bold">✓</span> Pure Quality Edible Oil
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-accent font-bold">✓</span> Zero Artificial Preservatives
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-accent font-bold">✓</span> Free Delivery Above ₹499
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Centered Scroll Indicator */}
        <div className="relative text-center pt-8 pb-2 text-primary/60">
          <a
            href="#signature-collection"
            className="inline-flex flex-col items-center gap-1 font-sans text-[0.68rem] uppercase tracking-[0.3em] transition-colors hover:text-accent"
          >
            <span>SCROLL</span>
            <span className="text-sm animate-bounce">↓</span>
          </a>
        </div>
      </section>

      {/* ──────────────── Brand Trust & Culinary Purity Bar ──────────────── */}
      <section className="border-b border-border/70 bg-[#FBF7F0] py-6 sm:py-7">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center text-left">
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-display text-lg font-bold">
                01
              </span>
              <div>
                <h4 className="font-display text-base font-semibold text-primary leading-tight">
                  Cast-Iron Roasted
                </h4>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Slow tawa heat, never fried
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-display text-lg font-bold">
                02
              </span>
              <div>
                <h4 className="font-display text-base font-semibold text-primary leading-tight">
                  Stone-Ground Grains
                </h4>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Whole wheat, bajri & ragi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-display text-lg font-bold">
                03
              </span>
              <div>
                <h4 className="font-display text-base font-semibold text-primary leading-tight">
                  Sattvik & Jain Friendly
                </h4>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Pure no onion, no garlic recipes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-display text-lg font-bold">
                04
              </span>
              <div>
                <h4 className="font-display text-base font-semibold text-primary leading-tight">
                  Vacuum-Sealed Crunch
                </h4>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Multi-layer freshness barrier
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SIGNATURE PRODUCT SECTION (Designed exactly like reference Image 2)
          4-column grid with image badges, quick view pill, title,
          poetic italic subtitle, price, grams, (- 1 +) pill, and Buy Now / Add to Cart.
          ───────────────────────────────────────────────────────────── */}
      <section id="signature-collection" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="eyebrow">Signature Bakes & Crunches</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
              Our Most Loved Varieties
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Slow-roasted on cast-iron tawas for clean, oil-light crunch. Pick your tea-time
              favorites or build a bespoke gift hamper.
            </p>
          </div>
          <Link
            to="/products"
            className="nav-link inline-flex items-center gap-1.5 text-accent font-semibold hover:text-primary"
          >
            <span>View All {allProducts.length} Flavours</span>
            <span>→</span>
          </Link>
        </div>

        {/* 4-Card Grid (Exact Layout from Image 2) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatureItems.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          WEEKLY FRESH BATCH DISPATCHED ITEM LIST
          ───────────────────────────────────────────────────────────── */}
      <section id="weekly-fresh-batch" className="border-t border-border/80 bg-[#FAF7F2] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                  WEEKLY FRESH BATCH DISPATCHED
                </span>
              </div>
              <h2 className="mt-2.5 font-display text-4xl sm:text-5xl font-medium text-primary">
                Weekly Fresh Batch Menu
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Slow-roasted on iron tawas every week. <span className="font-semibold text-primary">Our prime product is Bhakhri</span>, alongside premium artisan recipes, no-salt wellness options, gluten-free crunches, traditional rotla, and baked khakhras.
              </p>
            </div>
            <Link
              to="/products"
              className="nav-link inline-flex items-center gap-1.5 text-accent font-semibold hover:text-primary whitespace-nowrap"
            >
              <span>Explore All {allProducts.length} Items</span>
              <span>→</span>
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const count = allProducts.filter((p) => p.category === cat.id).length;
              const isActive = activeBatchCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveBatchCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-white/80 border border-border/70 text-foreground/80 hover:bg-white hover:text-primary"
                  }`}
                >
                  {cat.isPrime ? `⭐ ${cat.shortLabel} (Prime)` : cat.shortLabel}
                  <span className="ml-1.5 text-[0.65rem] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Tagline Banner */}
          {(() => {
            const currentMeta = CATEGORIES.find((c) => c.id === activeBatchCategory);
            return currentMeta ? (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-accent/10 border border-accent/20 px-5 py-3 text-xs">
                <span className="font-medium text-foreground">
                  <strong className="text-accent uppercase tracking-wider mr-2">
                    {currentMeta.label}:
                  </strong>
                  {currentMeta.tagline}
                </span>
                <span className="text-[0.7rem] uppercase tracking-wider text-muted-foreground font-semibold">
                  Dispatched in 24–48 Hours
                </span>
              </div>
            ) : null;
          })()}

          {/* Batch Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {batchItems.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SHOP BY CATEGORY (All 7 Handcrafted Varieties + Full Catalog)
          ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 border-t border-border/70">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Handcrafted Varieties</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
            Authentic Gujarati Delights
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            From our prime specialty rustic Bhakhri rounds pricked by hand, ancient-grain &amp; gluten-free bakes, to village Rotlas, gossamer paper-thin Khakhras, and travel-ready mobile crisps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            {
              id: "bhakhri",
              title: "Handmade Bhakhris (Prime Product)",
              badge: "OUR PRIME SPECIALTY",
              desc: "Thick, rustic, roasted & pressed by hand — our signature creation",
              count: allProducts.filter((x) => x.category === "bhakhri").length,
              image:
                allProducts.find((x) => x.slug === "methi-bhakhri")?.image || imgMethiBhakhri,
              linkCategory: "bhakhri",
              isPrime: true,
            },
            {
              id: "khakhra",
              title: "Signature Khakhras",
              badge: "TRADITIONAL CRISP",
              desc: "Paper-thin, blistered crisp & slow-roasted on iron tawas",
              count: allProducts.filter((x) => x.category === "khakhra").length,
              image:
                allProducts.find((x) => x.slug === "methi-khakhra")?.image || methi,
              linkCategory: "khakhra",
              isPrime: false,
            },
            {
              id: "premium-bhakhri",
              title: "Premium Bhakhris",
              badge: "ARTISAN GRAINS & BITES",
              desc: "Ancient grains, Sindhi Koki bites, Lola bites, Bajri, Moong & Curry Patta",
              count: allProducts.filter((x) => x.category === "premium-bhakhri").length,
              image:
                allProducts.find((x) => x.slug === "koki-bites-bhakhri")?.image || imgKokiBitesBhakhri,
              linkCategory: "premium-bhakhri",
              isPrime: false,
            },
            {
              id: "gluten-free-bhakhri",
              title: "Gluten-Free Bhakhris",
              badge: "100% WHEAT-FREE",
              desc: "Nutritious multi-millets & wheat-free dough roasted on dedicated tawas",
              count: allProducts.filter((x) => x.category === "gluten-free-bhakhri").length,
              image:
                allProducts.find((x) => x.slug === "gf-methi-bhakhri")?.image || imgGfMethiBhakhri,
              linkCategory: "gluten-free-bhakhri",
              isPrime: false,
            },
            {
              id: "no-salt-bhakhri",
              title: "No-Salt Bhakhris",
              badge: "ZERO ADDED SALT",
              desc: "Zero added sodium for heart wellness with aromatic cumin & fenugreek",
              count: allProducts.filter((x) => x.category === "no-salt-bhakhri").length,
              image:
                allProducts.find((x) => x.slug === "no-salt-methi-bhakhri")?.image || imgNoSaltMethiBhakhri,
              linkCategory: "no-salt-bhakhri",
              isPrime: false,
            },
            {
              id: "rotla",
              title: "Kathiyawadi Rotlas",
              badge: "HEARTH ROASTED",
              desc: "Authentic Saurashtra hearth-roasted Bajari Rotla & Desi Gud sweet Rotla",
              count: allProducts.filter((x) => x.category === "rotla").length,
              image:
                allProducts.find((x) => x.slug === "bajari-rotla")?.image || imgBajariRotla,
              linkCategory: "rotla",
              isPrime: false,
            },
            {
              id: "mobile-khakhra",
              title: "Mobile Khakhras",
              badge: "POCKET TRAVEL CRISPS",
              desc: "Compact pocket-sized crispy discs designed for effortless travel & snacking",
              count: allProducts.filter((x) => x.category === "mobile-khakhra").length,
              image:
                allProducts.find((x) => x.slug === "mobile-jeera-ajwain-khakhra")?.image || imgMobileJeeraAjwain,
              linkCategory: "mobile-khakhra",
              isPrime: false,
            },
            {
              id: "all-varieties",
              title: "All Handcrafted Flavours",
              badge: "BESPOKE HAMPERS",
              desc: "Explore all 53 handcrafted flavours or build a custom festive gift hamper",
              count: allProducts.length,
              image: imgAuthenticFlavours,
              linkCategory: undefined,
              isPrime: false,
            },
          ].map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              search={cat.linkCategory ? { c: cat.linkCategory as any } : {}}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-6 pt-9 text-center shadow-deep transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury ${
                cat.isPrime
                  ? "border-emerald-600/30 hover:border-emerald-600/70 ring-1 ring-emerald-600/20"
                  : "border-border hover:border-accent/60"
              }`}
            >
              <div className="absolute top-3.5 left-3.5">
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-sans text-[0.62rem] font-bold uppercase tracking-wider ${
                    cat.isPrime
                      ? "border-emerald-600/40 bg-emerald-50 text-emerald-800"
                      : "border-accent/40 bg-accent/10 text-accent"
                  }`}
                >
                  {cat.badge}
                </span>
              </div>
              <div>
                <div className="mx-auto h-48 sm:h-52 overflow-hidden rounded-xl bg-secondary/30 p-3 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-contain drop-shadow-md"
                  />
                </div>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <span className="h-px w-6 bg-accent/40" />
                  <span className="font-display text-xl font-medium text-primary leading-tight">
                    {cat.title}
                  </span>
                  <span className="h-px w-6 bg-accent/40" />
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  <span className="font-semibold text-foreground/90">{cat.count} Flavours</span> ·{" "}
                  {cat.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/50">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-colors group-hover:text-primary">
                  <span>Explore Category</span>
                  <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL TASTING MOMENTS (Showcasing User Images)
          ───────────────────────────────────────────────────────────── */}
      <section className="border-y border-border/80 bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="eyebrow">The SAIHIRA Ritual</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
              Moments of Authentic Taste
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Whether welcoming the dawn with kadak masala chai or sharing festive hampers with
              loved ones.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {tastingMoments.map((m) => (
              <div
                key={m.title}
                className="group overflow-hidden rounded-2xl border border-border/90 bg-card shadow-deep transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={m.img}
                    alt={m.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
                    {m.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium text-primary">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          WHY SAIHIRA: CRAFT & PURITY
          ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <span className="eyebrow">The Kathiawadi Heritage</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
            The Craft Behind Every Crunch
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Roasted by hand using seasoned iron tawas and traditional wooden presses following
            authentic Gujarati culinary heritage.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([t, d], idx) => (
            <div
              key={t}
              className="rounded-2xl border border-border/80 bg-card p-7 text-left shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-deep"
            >
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
                Pillar 0{idx + 1}
              </span>
              <h3 className="font-display text-xl font-medium text-primary">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MADE THE OLD WAY (Featuring Macro Craft Image)
          ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border-2 border-border/80 bg-card shadow-luxury">
          <img
            src={RUSTIC_GOLDEN_FEAST}
            alt="Hand-pressed golden roasted flatbreads and bhakhris"
            className="h-[440px] w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 rounded-lg bg-card/90 px-4 py-2 shadow-sm backdrop-blur">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent">
              Artisan Detail
            </span>
            <p className="font-display text-sm font-medium text-primary">Paper-Thin Flaky Layers</p>
          </div>
        </div>

        <div>
          <span className="eyebrow">Made The Old Way</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary leading-tight">
            Rolled, pricked & roasted — one by one.
          </h2>
          <div className="mt-8 space-y-6">
            {steps.map(([n, t, d]) => (
              <div key={n} className="flex gap-4">
                <span className="font-cinzel text-2xl font-bold text-accent">{n}</span>
                <div>
                  <h3 className="font-display text-xl font-medium text-primary">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              ["30+", "Years of Craft"],
              ["50+", "Artisan Flavours"],
              ["100%", "Handmade"],
            ].map(([a, b]) => (
              <div key={b} className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
                <div className="font-display text-3xl font-medium text-primary">{a}</div>
                <div className="mt-1 font-sans text-xs uppercase tracking-wider text-muted-foreground">
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          THE CHAI PARTNER & FESTIVE GIFTING (Editorial Banner)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 my-10">
        <img
          src={RUSTIC_ROTI_FEAST}
          alt="Artisanal khakhra and bhakhri feast with tea and traditional spices"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75 backdrop-blur-[2px]" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center text-primary-foreground">
          <span className="badge-luxury bg-white/10 text-amber-200 border-amber-200/30">
            Festive & Corporate Gifting
          </span>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight">
            The Perfect Partner for Your Chai
          </h2>
          <p className="mt-4 max-w-xl font-light text-base sm:text-lg text-amber-100/90 leading-relaxed">
            Gift a bespoke box of handmade goodness this festive season. Custom flavor selections,
            corporate gift hampers, and bulk orders dispatched across India.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-accent px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground shadow-lg transition-all hover:bg-amber-400 hover:shadow-xl"
            >
              Enquire For Gifting
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition-all hover:bg-white hover:text-primary"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CUSTOMER TESTIMONIALS
          ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <span className="eyebrow">Loved Across India</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
            What Our Patrons Say
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Trusted by tea lovers, busy families, and corporate gift givers nationwide.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map(([q, a, loc]) => (
            <figure
              key={a}
              className="relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-7 sm:p-8 text-left shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-deep"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4 text-sm">
                  {"★".repeat(5)}
                </div>
                <blockquote className="font-sans text-sm sm:text-base leading-relaxed text-[#4A3B32]">
                  “{q}”
                </blockquote>
              </div>
              <figcaption className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-semibold text-primary">{a}</div>
                  <div className="font-sans text-xs text-muted-foreground">{loc}</div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-[0.62rem] font-semibold text-emerald-800">
                  <svg
                    className="h-3 w-3 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Verified
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/faq" className="btn-ghost">
            Have Questions? Read Our FAQ
          </Link>
        </div>
      </section>
    </>
  );
}
