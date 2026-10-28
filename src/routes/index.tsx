import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

// All 5 local editorial assets from the repository assets folder (watermark-free)
import HERO_PLATTER from "@/assets/editorial/khakhra-platter.jpg";
import METHI_TRAY from "@/assets/editorial/methi-khakhra-1.jpg";
import METHI_MACRO from "@/assets/editorial/methi-khakhra-2.jpg";
import METHI_FLATLAY from "@/assets/editorial/methi-khakhra-3.jpg";
import KHAKHRA_CHAI from "@/assets/editorial/khakhra-stack.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAIHIRA — Artisanal Handmade Khakhras & Bhakhris · Best in Taste" },
      { name: "description", content: "Crunchy, hand-rolled Gujarati Bhakhris & Khakhras roasted on iron tawas. 19 authentic flavours made with pure ingredients." },
      { property: "og:title", content: "SAIHIRA — Best in Taste Handmade Gujarati Snacks" },
      { property: "og:description", content: "Crunchy, crispy handmade Bhakhris & Khakhras in delicious flavours." },
    ],
  }),
  component: Index,
});

const why = [
  ["Cast-Iron Tawa Roast", "Slowly toasted on seasoned iron tawas with traditional wooden presses. Never fried, crisp without greasy residue."],
  ["Stone-Ground Flours", "Pure whole wheat, bajri, ragi, barley, oats, and moong ground in small artisan batches every morning."],
  ["Cold-Pressed Oil Only", "Tempered lightly with cold-pressed sesame and groundnut oil. 100% free from palm oil and artificial preservatives."],
  ["Authentic Jain & Sattvik", "Dedicated options prepared without onion, garlic, or root vegetables, plus vrat-friendly farali crisps."],
];

const steps = [
  ["01", "Daily Stone-Ground Dough", "Whole grains milled fine, spiced with hand-roasted jeera, kasuri methi, and sea salt."],
  ["02", "Hand-Rolled Gossamer Thin", "Artisan women roll each disc paper-thin on traditional round wooden patlas."],
  ["03", "Even Wooden Block Press", "Pressed steadily on hot iron tawas using wooden 'dhabus' for delicate, uniform blisters."],
  ["04", "Vacuum-Sealed Freshness", "Sealed within minutes of cooling into multi-layer packs that keep crunch intact for months."],
];

const reviews = [
  [
    "The Methi and Jeera khakhras taste just like the ones from Saurashtra. Super thin, perfectly roasted on iron tawa, and not greasy at all. Our whole family loves them with morning ginger chai.",
    "Hetal Parekh",
    "Verified Patron · Mumbai"
  ],
  [
    "Ordered 35 custom gift hampers for our office Diwali gifting in Bangalore. Every single box arrived intact, vacuum-sealed, and fresh. The Jaggery Bhakhri was an instant favourite.",
    "Kavita & Anand S.",
    "Corporate Client · Bengaluru"
  ],
  [
    "I was skeptical ordering snacks online, but the crunch is incredible. Crisp, aromatic, zero palm oil aftertaste. Highly recommend the Pani Puri and Bajri Methi.",
    "Dr. Rajesh Vora",
    "Verified Patron · Ahmedabad"
  ],
];

const tastingMoments = [
  {
    tag: "Morning Chai",
    title: "The Classic Breakfast Pairing",
    desc: "Lightly spiced Jeera & Methi Khakhras paired with steaming adrak-wali chai to awaken the senses.",
    img: KHAKHRA_CHAI,
  },
  {
    tag: "Artisanal Table",
    title: "Afternoon Chutney Platter",
    desc: "Crispy roasted khakhras served with tangy sweet mango chundo, green chilli pickle, or cool mint dip.",
    img: METHI_FLATLAY,
  },
  {
    tag: "Master Roast",
    title: "Golden Tawa Perfection",
    desc: "Each piece pressed with traditional wooden blocks until the characteristic golden blisters emerge.",
    img: HERO_PLATTER,
  },
];

function Index() {
  // Curated 4 featured signature snacks matching the reference layout
  const signatureItems = [
    products.find((p) => p.slug === "methi-khakhra")!,
    products.find((p) => p.slug === "jeera-khakhra")!,
    products.find((p) => p.slug === "jaggery-bhakhri")!,
    products.find((p) => p.slug === "pani-puri-khakhra")!,
  ];

  const allFeatured = [
    "jeera-khakhra",
    "methi-khakhra",
    "pani-puri-khakhra",
    "masala-khakhra",
    "jaggery-bhakhri",
    "garlic-bhakhri",
    "black-pepper-bhakhri",
    "farali-bhakhri",
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Designed with light warm luxury overlay)
          Natural photography, light cream gradient scrim, left-aligned,
          dashes eyebrow, 2-line majestic headline with gold script,
          2 pill buttons, and bottom scroll indicator.
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-between py-16 sm:py-24 border-b border-border/80">
        {/* Full-Bleed Atmospheric Background Photography */}
        <img
          src={HERO_PLATTER}
          alt="SAIHIRA Artisanal Gujarati Khakhra Platter"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.98] filter"
        />

        {/* Lighter Warm Gourmet Scrim (Soft ivory/cream gradient for high readability & appetizing brightness) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0]/98 via-[#FAF6F0]/92 sm:via-[#FAF6F0]/84 md:to-[#FAF6F0]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/95 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />

        {/* Top Spacer for balance */}
        <div className="hidden sm:block" />

        {/* Main Content Area (Left-Aligned, clean typography on light warm background) */}
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 my-auto">
          <div className="max-w-2xl text-left">
            {/* Eyebrow with hairline dashes */}
            <div className="flex items-center gap-3 text-accent">
              <span className="h-px w-8 bg-accent/80" />
              <span className="font-sans text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.26em] text-accent">
                HAND-ROLLED IN RAJKOT · SLOW ROASTED ON IRON TAWAS
              </span>
            </div>

            {/* Headline: Line 1 dark espresso serif + Line 2 warm gold italic serif */}
            <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium tracking-tight text-primary leading-[1.05]">
              Asal Gujarati Khakhra, <br />
              <span className="font-serif italic font-normal text-accent">
                Tawa-Roasted to Crisp Perfection
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 font-sans text-base sm:text-lg font-normal leading-relaxed text-[#544237] max-w-xl">
              Gossamer-thin, non-greasy, and bursting with roasted cumin, fresh kasuri methi, and stone-ground grains. 19 authentic Kathiawadi recipes, vacuum-sealed for your daily chai.
            </p>

            {/* Row of 2 Pill Action Buttons (matching user reference) */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Button 1: Filled Primary Pill */}
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 sm:px-8 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Shop Fresh Crunch
              </Link>

              {/* Button 2: Outlined Glass Pill */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-primary/35 bg-[#FAF6F0]/85 px-7 sm:px-8 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary shadow-xs backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95"
              >
                Gift Hampers
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Centered Scroll Indicator */}
        <div className="relative text-center pb-2 text-primary/70">
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
                <h4 className="font-display text-base font-semibold text-primary leading-tight">Cast-Iron Roasted</h4>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">Slow tawa heat, never fried</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-display text-lg font-bold">
                02
              </span>
              <div>
                <h4 className="font-display text-base font-semibold text-primary leading-tight">Stone-Ground Grains</h4>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">Whole wheat, bajri & ragi</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-display text-lg font-bold">
                03
              </span>
              <div>
                <h4 className="font-display text-base font-semibold text-primary leading-tight">Sattvik & Jain Friendly</h4>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">Pure no onion, no garlic recipes</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-display text-lg font-bold">
                04
              </span>
              <div>
                <h4 className="font-display text-base font-semibold text-primary leading-tight">Vacuum-Sealed Crunch</h4>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">Multi-layer freshness barrier</p>
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
              Slow-roasted on cast-iron tawas for clean, oil-light crunch. Pick your tea-time favorites or build a bespoke gift hamper.
            </p>
          </div>
          <Link
            to="/products"
            className="nav-link inline-flex items-center gap-1.5 text-accent font-semibold hover:text-primary"
          >
            <span>View All 19 Flavours</span>
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
          SHOP BY CATEGORY (Khakhras vs Bhakhris)
          ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-border/70">
        <div className="text-center">
          <span className="eyebrow">Handcrafted Varieties</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
            Authentic Gujarati Delights
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            From gossamer paper-thin crisps to hearty rustic rounds pricked by hand.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {(["khakhra", "bhakhri"] as const).map((c) => {
            const p = products.find((x) => x.category === c)!;
            const n = products.filter((x) => x.category === c).length;
            return (
              <Link
                key={c}
                to="/products"
                search={{ c }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 pt-10 text-center shadow-deep transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
              >
                <div className="mx-auto h-64 overflow-hidden rounded-xl bg-secondary/30 p-4 transition-transform duration-500 group-hover:scale-105">
                  <img src={p.image} alt={c} className="h-full w-full object-contain" />
                </div>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-accent/40" />
                  <span className="font-display text-2xl font-medium text-primary">
                    {c === "khakhra" ? "Signature Khakhras" : "Hearty Bhakhris"}
                  </span>
                  <span className="h-px w-8 bg-accent/40" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {n} Flavours · {c === "khakhra" ? "Paper-thin, blistered crisp & roasted" : "Thick, rustic, roasted & pressed by hand"}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition-colors group-hover:text-primary">
                  <span>Explore Category</span>
                  <span>→</span>
                </span>
              </Link>
            );
          })}
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
              Whether welcoming the dawn with kadak masala chai or sharing festive hampers with loved ones.
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
            Roasted by hand using seasoned iron tawas and traditional wooden presses in Rajkot, Gujarat.
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
          MORE FAVOURITES: FULL COLLECTION TEASER
          ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-border/80 bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow">Explore The Pantry</span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
                More Hand-Rolled Flavours
              </h2>
            </div>
            <Link to="/products" className="nav-link hidden items-center gap-1.5 md:flex">
              <span>View All 19 Flavours</span>
              <span>→</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allFeatured.map((s) => (
              <ProductCard key={s} p={products.find((p) => p.slug === s)!} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MADE THE OLD WAY (Featuring Macro Craft Image)
          ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border-2 border-border/80 bg-card shadow-luxury">
          <img
            src={METHI_MACRO}
            alt="Close-up macro of paper-thin crispy layers of Gujarati khakhra"
            className="h-[440px] w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 rounded-lg bg-card/90 px-4 py-2 shadow-sm backdrop-blur">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent">Artisan Detail</span>
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
              ["19", "Recipes"],
              ["100%", "Handmade"],
            ].map(([a, b]) => (
              <div key={b} className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
                <div className="font-display text-3xl font-medium text-primary">{a}</div>
                <div className="mt-1 font-sans text-xs uppercase tracking-wider text-muted-foreground">{b}</div>
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
          src={METHI_FLATLAY}
          alt="Artisanal khakhra with hot tea in earthen cup"
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
            Gift a bespoke box of handmade goodness this festive season. Custom flavor selections, corporate gift hampers, and bulk orders dispatched across India.
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
                  <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
