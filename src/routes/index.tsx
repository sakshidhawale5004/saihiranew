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
  const featured = [
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
          PREMIUM EDITORIAL HERO SECTION WITH BACKGROUND IMAGE
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/70 py-16 md:py-24 lg:py-32 min-h-[85vh] flex items-center">
        {/* Full Hero Background Image */}
        <img
          src={HERO_PLATTER}
          alt="Artisanal Tawa Roasted Khakhra background"
          className="absolute inset-0 h-full w-full object-cover object-right lg:object-center brightness-[0.92] filter"
        />

        {/* Ambient Gradient Overlays for High-Contrast Luxury Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/95 sm:via-[#FAF6F0]/90 md:via-[#FAF6F0]/80 to-[#FAF6F0]/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-[#FAF6F0]/60" />
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-14 w-full">
          {/* Left Column: Editorial Storytelling */}
          <Reveal className="lg:col-span-6 xl:col-span-7">
            <div className="badge-luxury">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span>Est. Gujarat · Handcrafted in Small Batches</span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-primary sm:text-6xl md:text-7xl xl:text-[5rem] leading-[1.04]">
              The Art of the{" "}
              <em className="font-serif italic font-normal text-gradient block sm:inline">
                Perfect Crunch.
              </em>
            </h1>

            <div className="mt-7 flex items-center gap-3">
              <div className="h-px w-14 bg-accent/60" />
              <div className="h-1.5 w-1.5 rotate-45 bg-accent" />
              <div className="h-px w-8 bg-accent/30" />
            </div>

            <p className="mt-7 max-w-xl font-sans text-base sm:text-lg font-light leading-relaxed text-muted-foreground">
              Paper-thin Khakhras and hearty Bhakhris, hand-rolled one by one and slow-roasted on seasoned iron tawas. Crisp, wholesome, and perfected across three decades of authentic Gujarati kitchen craft.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/products" className="btn-warm group">
                <span>Explore The Collection</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/about" className="btn-ghost">
                Our 30-Year Story
              </Link>
            </div>

            {/* Heritage Metric Badges */}
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border/80 pt-7">
              {[
                ["19", "Signature Flavours", "Sweet, spicy & sattvik"],
                ["0%", "Preservatives", "Zero palm oil, 100% baked"],
                ["100%", "Tawa Roasted", "Hand-rolled daily"],
              ].map(([stat, label, note]) => (
                <div key={label} className="space-y-1">
                  <dt className="font-display text-3xl sm:text-4xl font-medium text-primary">{stat}</dt>
                  <dd className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {label}
                  </dd>
                  <p className="text-[0.68rem] text-muted-foreground hidden sm:block">{note}</p>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Right Column: Floating Luxury Composition */}
          <div className="relative lg:col-span-6 xl:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Showcase Card: Kasuri Methi on Tray */}
              <div className="relative overflow-hidden rounded-2xl border-4 border-card/90 bg-card shadow-luxury">
                <img
                  src={METHI_TRAY}
                  alt="Artisanal Kasuri Methi Khakhra stack on rich wooden tray"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="p-5 bg-card flex items-center justify-between">
                  <div>
                    <span className="font-display text-xl font-medium text-primary block">Kasuri Methi Khakhra</span>
                    <span className="text-xs uppercase tracking-wider text-accent">Aromatic Fenugreek & Tawa Roast</span>
                  </div>
                  <span className="rounded-full bg-accent/15 px-3 py-1 font-sans text-xs font-semibold text-accent uppercase tracking-wider">
                    Best Seller
                  </span>
                </div>
              </div>

              {/* Floating Chai Companion Pill Card */}
              <div className="absolute -bottom-6 -left-6 z-20 flex items-center gap-3 rounded-2xl border-2 border-white/80 bg-card/95 p-3 shadow-luxury backdrop-blur-md transition-transform hover:-translate-y-1 sm:-bottom-8 sm:-left-8">
                <img
                  src={KHAKHRA_CHAI}
                  alt="Tea pairing"
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="pr-3">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-accent block">Chai Ritual</span>
                  <span className="font-display text-sm font-medium text-primary block leading-tight">Adrak Chai Companion</span>
                  <span className="text-[0.65rem] text-muted-foreground">Crisp & non-greasy</span>
                </div>
              </div>

              {/* Heritage Circular Seal Medallion with Float Animation */}
              <div className="absolute -top-6 -right-3 z-20 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-accent/40 bg-card/95 p-3 text-center shadow-deep backdrop-blur-md animate-float">
                <span className="font-cinzel text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                  Authentic
                </span>
                <span className="font-display text-2xl font-medium leading-none text-primary">Tawa</span>
                <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Slow Roasted
                </span>
              </div>

              {/* Fresh Batch Pill Indicator with Pulse */}
              <div className="absolute -top-4 left-6 z-20 hidden items-center gap-2.5 rounded-full border border-border/80 bg-card/95 px-4 py-2 text-xs font-medium text-primary shadow-deep backdrop-blur-md sm:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Fresh Batches Rolled Daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SHOP BY CATEGORY (Khakhras vs Bhakhris)
          ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
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
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 pt-10 text-center shadow-deep transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
              >
                <div className="mx-auto h-64 overflow-hidden rounded-lg bg-secondary/30 p-4 transition-transform duration-500 group-hover:scale-105">
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
                className="group overflow-hidden rounded-xl border border-border/90 bg-card shadow-deep transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury"
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
              className="rounded-xl border border-border/80 bg-card p-8 text-center shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-deep"
            >
              <div className="mx-auto mb-5 h-px w-10 bg-accent" />
              <h3 className="font-display text-xl font-medium text-primary">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FEATURED PRODUCTS: PICK YOUR CRUNCH
          ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-border/80 bg-secondary/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow">Curated Favourites</span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-primary">
                Pick Your Crunch
              </h2>
            </div>
            <Link to="/products" className="nav-link hidden items-center gap-1.5 md:flex">
              <span>View All 19 Flavours</span>
              <span>→</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((s) => (
              <ProductCard key={s} p={products.find((p) => p.slug === s)!} />
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link to="/products" className="btn-warm">
              View All 19 Flavours
            </Link>
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
              className="relative rounded-xl border border-border/80 bg-card p-8 pt-10 text-center shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-deep"
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
