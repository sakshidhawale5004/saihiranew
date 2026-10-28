import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  image: string;
  badge?: string;
  breadcrumbs?: Array<{ label: string; to?: string }>;
}

export function PageHero({
  eyebrow = "SAIHIRA · Artisanal Snacks",
  title,
  subtitle,
  image,
  badge = "Handmade · Small Batches",
  breadcrumbs = [{ label: "Home", to: "/" }],
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-primary/95 py-16 sm:py-20 md:py-24">
      {/* Background Editorial Image */}
      <img
        src={image}
        alt="Page hero background"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-90 filter"
      />

      {/* Luxury Layered Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/75 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 text-center text-white">
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {b.to ? (
                  <Link to={b.to} className="transition-colors hover:text-white">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-white/60">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="text-accent/60">/</span>}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/40 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-amber-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{eyebrow}</span>
        </div>

        {/* Title */}
        <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08]">
          {title}
        </h1>

        {/* Gold Diamond Divider */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-accent/60" />
          <div className="h-1.5 w-1.5 rotate-45 bg-accent" />
          <div className="h-px w-12 bg-accent/60" />
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base sm:text-lg font-light leading-relaxed text-amber-100/90">
            {subtitle}
          </p>
        )}

        {/* Floating Heritage Badge */}
        {badge && (
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-wider text-white/90 backdrop-blur-sm border border-white/15">
            <span>✨ {badge}</span>
          </div>
        )}
      </div>
    </section>
  );
}
