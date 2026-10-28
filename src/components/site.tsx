import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logoSrc from "@/assets/logo-hd.png";
const logo = { url: logoSrc };
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/products", label: "Our Snacks" },
  { to: "/about", label: "Our Story" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

const tickerItems = [
  "AUTHENTIC GUJARATI KHAKHRA & BHAKHRI · ESTD. RAJKOT",
  "100% SLOW-ROASTED ON IRON TAWAS · ZERO PALM OIL",
  "19 ARTISANAL RECIPES · VEGETARIAN & JAIN OPTIONS",
  "COMPLIMENTARY SHIPPING ON ORDERS OVER ₹499",
  "CUSTOM FESTIVE & CORPORATE GIFT HAMPERS · CALL +91 98765 43210",
  "FRESH BATCHES ROASTED DAILY & VACUUM SEALED",
];

export function Ticker() {
  return (
    <div className="overflow-hidden bg-primary py-2 text-[0.66rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.24em] text-primary-foreground border-b border-primary/20">
      <div className="marquee flex w-max gap-8 whitespace-nowrap">
        {[0, 1].flatMap((j) =>
          tickerItems.map((t, i) => (
            <span key={`${j}-${i}`} className="inline-flex items-center">
              <span>{t}</span>
              <span className="mx-6 text-accent font-bold">✦</span>
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
      aria-label={`Shopping Cart with ${count} items`}
      className="relative inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-primary shadow-xs transition-all hover:border-accent hover:text-accent active:scale-95"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span className="hidden sm:inline text-[0.72rem] tracking-wider">Cart</span>
      {count > 0 && (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1.5 text-[0.62rem] font-bold text-accent-foreground shadow-xs">
          {count}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-border/70 shadow-xs">
      <Ticker />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3.5">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo.url}
            alt="SAIHIRA Asal – Best in Taste"
            className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.08em] text-primary leading-none group-hover:text-accent transition-colors">
              SAIHIRA
            </span>
            <span className="font-sans text-[0.62rem] sm:text-[0.66rem] font-semibold text-accent uppercase tracking-[0.22em] mt-1">
              Asal Gujarati Snacks
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="nav-link text-foreground/80 hover:text-accent py-1 relative transition-colors"
            activeProps={{ className: "nav-link text-accent font-semibold relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full" }}
          >
            Home
          </Link>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="nav-link text-foreground/80 hover:text-accent py-1 relative transition-colors"
              activeProps={{ className: "nav-link text-accent font-semibold relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:+919876543210"
            className="hidden xl:inline-flex items-center gap-2 font-sans text-xs font-medium tracking-wide text-foreground/75 hover:text-primary transition-colors"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <span>+91 98765 43210</span>
          </a>
          <CartLink />
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm transition-all duration-300 hover:bg-accent hover:shadow-md active:scale-95"
          >
            Order Now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/80 bg-card text-primary hover:border-accent hover:text-accent transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md px-6 py-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="font-display text-xl font-medium text-primary hover:text-accent transition-colors py-1"
            >
              Home
            </Link>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-xl font-medium text-primary hover:text-accent transition-colors py-1"
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/60 flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary py-1"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span>+91 98765 43210</span>
              </a>
              <Link
                to="/products"
                onClick={() => setOpen(false)}
                className="btn-warm justify-center text-center mt-2"
              >
                Order Now
              </Link>
            </div>
          </div>
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
