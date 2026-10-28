import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logoSrc from "@/assets/logo-hd.png";
const logo = { url: logoSrc };
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/about", label: "Founder's Story" },
  { to: "/products", label: "Signature Snacks" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Gifting & Contact" },
] as const;

const tickerItems = [
  "🪔 FESTIVE & DIWALI HAMPERS STARTING ₹499",
  "🥖 100% ARTISANAL TAWA ROASTED ON IRON",
  "🥟 10,000+ HAPPY PATRONS ACROSS INDIA",
  "📞 CORPORATE GIFTING & BULK ENQUIRIES: hello@saihira.com",
  "✨ PURE SATTVIK & JAIN OPTIONS AVAILABLE",
  "🌾 19 HAND-ROLLED SIGNATURE RECIPES",
];

export function Ticker() {
  return (
    <div className="overflow-hidden bg-primary py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-primary-foreground border-b border-primary/20">
      <div className="marquee flex w-max gap-8 whitespace-nowrap">
        {[0, 1].flatMap((j) =>
          tickerItems.map((t, i) => (
            <span key={`${j}-${i}`} className="inline-flex items-center">
              <span>{t}</span>
              <span className="mx-6 text-accent font-bold">·</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function CartLink() {
  const { count } = useCart();
  return (
    <Link
      to="/cart"
      className="relative inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm transition-all hover:border-primary hover:text-accent"
    >
      <span className="font-serif">🛍</span>
      <span>Cart</span>
      {count > 0 && (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1.5 text-[0.65rem] font-bold text-accent-foreground shadow-sm">
          {count}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/60">
      <Ticker />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        {/* Brand Logo & Tagline (as seen in Bakelette design) */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="SAIHIRA Asal – Best in Taste" className="h-14 sm:h-16 w-auto" />
          <div className="hidden sm:block text-left">
            <span className="font-display text-xl font-bold tracking-tight text-primary block leading-none">
              SAIHIRA
            </span>
            <span className="font-sans text-[0.68rem] text-muted-foreground uppercase tracking-wider block mt-1">
              Best in Taste in every bite.
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link
            to="/"
            className="nav-link"
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-link text-accent font-semibold" }}
          >
            Home
          </Link>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="nav-link"
              activeProps={{ className: "nav-link text-accent font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:+919876543210"
            className="hidden xl:inline-block font-sans text-xs font-semibold tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            +91 98765 43210
          </a>
          <CartLink />
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
          >
            Order Now
          </Link>
          <button
            className="text-xs font-semibold tracking-widest uppercase md:hidden rounded-lg border border-border px-3 py-1.5"
            onClick={() => setOpen(!open)}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="flex flex-col gap-3 border-t border-border bg-card p-6 md:hidden">
          <Link to="/" onClick={() => setOpen(false)} className="font-display text-xl text-primary">
            Home
          </Link>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display text-xl text-primary">
              {n.label}
            </Link>
          ))}
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="btn-warm mt-2 justify-center"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-5">
        <div className="sm:col-span-2">
          <img src={logo.url} alt="SHM Asal" className="h-20 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Authentic handmade Bhakhris & Khakhras, roasted slowly on cast-iron tawas and made with love by SAIHIRA.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-accent">
            <span>✨ 100% Preservative Free</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <span className="eyebrow">Explore</span>
          {nav.map((n) => <Link key={n.to} to={n.to} className="transition-colors hover:text-primary">{n.label}</Link>)}
          <Link to="/cart" className="transition-colors hover:text-primary">Cart</Link>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <span className="eyebrow">Customer Care</span>
          <Link to="/return-policy" className="transition-colors hover:text-primary">Return Policy</Link>
          <Link to="/terms" className="transition-colors hover:text-primary">Terms & Conditions</Link>
          <Link to="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
          <Link to="/faq" className="transition-colors hover:text-primary">FAQ & Support</Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="eyebrow">Say hello</span>
          <p className="mt-2 font-medium text-primary">hello@saihira.com</p>
          <p className="mt-1">Mumbai, Maharashtra, India</p>
          <p className="mt-3 text-xs text-muted-foreground">Pan-India Express Shipping Available</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SAIHIRA · SHM Asal. Best in Taste. All rights reserved.
      </div>
    </footer>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${shown ? "reveal-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`tilt ${className}`}>{children}</div>;
}

export function PageTitle({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <div className="border-b border-border bg-secondary py-14 text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-3 text-5xl md:text-6xl">{title}</h1>
      {sub && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{sub}</p>}
    </div>
  );
}
