import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logoSrc from "@/assets/logo-hd.png";
const logo = { url: logoSrc };
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

const tickerItems = ["Free delivery on orders above ₹499", "100% handmade & baked", "No onion · No garlic options", "19 delicious flavours", "Fresh batches every week", "Bulk & gifting orders welcome"];

export function Ticker() {
  return (
    <div className="overflow-hidden bg-primary py-2.5 text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {[0, 1].flatMap((j) => tickerItems.map((t, i) => <span key={`${j}-${i}`}>{t} <span className="ml-10 opacity-50">—</span></span>))}
      </div>
    </div>
  );
}

function CartLink() {
  const { count } = useCart();
  return (
    <Link to="/cart" className="relative inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
      <span>Cart</span>
      {count > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.65rem] font-bold text-accent-foreground">{count}</span>}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur">
      <Ticker />
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-border px-5 py-3">
        <Link to="/"><img src={logo.url} alt="SHM Asal – Best in Taste" className="h-16 w-auto" /></Link>
        <nav className="hidden gap-7 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link" activeOptions={{ exact: n.to === "/" }} activeProps={{ className: "nav-link text-primary font-semibold" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <CartLink />
          <button className="text-sm tracking-widest md:hidden" onClick={() => setOpen(!open)}>{open ? "CLOSE" : "MENU"}</button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col gap-3 border-b border-border p-6 md:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display text-xl">{n.label}</Link>)}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo.url} alt="SHM Asal" className="h-20 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Handmade Bhakhris & Khakhras, roasted slowly and made with love by SAIHIRA.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="eyebrow">Explore</span>
          {nav.map((n) => <Link key={n.to} to={n.to} className="hover:text-primary">{n.label}</Link>)}
          <Link to="/cart" className="hover:text-primary">Cart</Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="eyebrow">Say hello</span>
          <p className="mt-2">hello@saihira.com</p>
          <p>Mumbai, India</p>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} SAIHIRA · SHM Asal. Best in Taste.</p>
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
