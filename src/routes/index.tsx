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
  ["Hand-Rolled & Tawa Roasted", "Every piece is rolled thin and slow-roasted on hot iron tawas in small artisan batches."],
  ["Baked Wholesomeness", "Light on cold-pressed oil, huge on crunch — a wholesome daily snack you can feel proud about."],
  ["Traditional Grains", "Stone-ground whole wheat, bajri, ragi, barley, oats and moong for authentic nutrition."],
  ["Pure & Sattvik Heritage", "Authentic Jain options without onion and garlic, plus farali snacks for fasting periods."],
];

const steps = [
  ["01", "Fresh Artisanal Dough", "Stone-ground flour, fragrant spices and cold-pressed oil kneaded fresh every morning."],
  ["02", "Hand-Rolled Paper Thin", "Khakhras rolled exquisitely thin; hearty Bhakhris pressed and pricked by hand."],
  ["03", "Slow Cast-Iron Roast", "Evenly pressed on seasoned iron tawas until golden brown, fragrant and crisp."],
  ["04", "Vacuum-Sealed Fresh", "Sealed immediately in protective packaging to lock in crispness for months."],
];

const reviews = [
  ["The Kasuri Methi khakhra tastes exactly like grandma's kitchen in Rajkot. Evening chai is an elevated ritual now!", "Priya Shah, Mumbai"],
  ["Jaggery bhakhri has replaced biscuits in my kids' school tiffin. Wholesome, crunchy, and zero guilt.", "Neha Kulkarni, Pune"],
  ["Incredible crispness, non-oily and aromatic. Ordered 20 gift hampers for Diwali and guests couldn't stop praising it.", "Rajesh Patel, Ahmedabad"],
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
          1. HERO SECTION (Designed exactly like reference Image 1)
          Full photographic backdrop, left-aligned, dashes eyebrow,
          2-line majestic headline with gold script, 3 pill buttons,
          and bottom scroll indicator.
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-between py-16 sm:py-24 border-b border-border/80">
        {/* Full-Bleed Atmospheric Background Photography */}
        <img
          src={HERO_PLATTER}
          alt="SAIHIRA Artisanal Gujarati Khakhra Platter"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.72] filter"
        />

        {/* Deep Gourmet Vignette Scrim (Preserving our warm palette with high contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 sm:via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/45" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

        {/* Top Spacer for balance */}
        <div className="hidden sm:block" />

        {/* Main Content Area (Left-Aligned, exact typography structure from Image 1) */}
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 my-auto">
          <div className="max-w-2xl text-left text-white">
            {/* Eyebrow with hairline dashes (as seen in Bakelette design) */}
            <div className="flex items-center gap-3 text-amber-300">
              <span className="h-px w-8 bg-amber-400/80" />
              <span className="font-sans text-[0.72rem] sm:text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                ARTISANAL GUJARATI SNACKS. EST. 1994
              </span>
            </div>

            {/* Headline: Line 1 white serif + Line 2 gold italic serif */}
            <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium tracking-tight text-white leading-[1.05]">
              Wholesome Crunch, <br />
              <span className="font-serif italic font-normal text-amber-300 drop-shadow-sm">
                Crafted with Devotion
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 font-sans text-base sm:text-lg font-light leading-relaxed text-amber-100/90 max-w-xl">
              Because Your Tea-Time Snacks Should Uplift You, Not Weigh You Down. Hand-rolled paper-thin and slow-roasted on seasoned iron tawas.
            </p>

            {/* Row of 3 Pill Action Buttons (matching Image 1) */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Button 1: Filled Accent Pill */}
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 sm:px-8 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent-foreground shadow-lg transition-all duration-300 hover:bg-amber-400 hover:scale-105 active:scale-95"
              >
                Shop Fresh Crunch
              </Link>

              {/* Button 2: Outlined Glass Pill */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 sm:px-8 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-primary active:scale-95"
              >
                Gift Hampers
              </Link>

              {/* Button 3: Outlined Pill with Festive Emoji */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/40 bg-black/40 px-6 sm:px-7 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-200 backdrop-blur-md transition-all duration-300 hover:border-amber-300 hover:text-white active:scale-95"
              >
                <span>🪔</span>
                <span>Festive 2026</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Centered Scroll Indicator (matching Image 1) */}
        <div className="relative text-center pb-2 text-white/70">
          <a
            href="#signature-collection"
            className="inline-flex flex-col items-center gap-1 font-sans text-[0.68rem] uppercase tracking-[0.3em] transition-colors hover:text-amber-300"
          >
            <span>SCROLL</span>
            <span className="text-sm animate-bounce">↓</span>
          </a>
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
          <span className="eyebrow">Why SAIHIRA</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
            Goodness in Every Bite
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-border/80 bg-card p-8 text-center shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-deep"
            >
              <div className="mx-auto mb-5 h-px w-10 bg-accent" />
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
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map(([q, a]) => (
            <figure
              key={a}
              className="relative rounded-2xl border border-border/80 bg-card p-8 pt-10 text-center shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-deep"
            >
              <span className="font-serif text-5xl text-accent/30 absolute top-3 left-6">“</span>
              <blockquote className="relative font-display text-lg italic leading-relaxed text-primary">
                “{q}”
              </blockquote>
              <figcaption className="mt-6 font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                — {a}
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
