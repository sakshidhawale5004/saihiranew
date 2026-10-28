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
  badge,
  breadcrumbs = [{ label: "Home", to: "/" }],
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-[#FAF6F0] py-16 sm:py-20 md:py-24">
      {/* Background Editorial Image - Clearly Visible & Appetizing */}
      <img
        src={image}
        alt="Page hero background"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.98] filter"
      />

      {/* Gentle Luminous Warm Scrim - Balances Image Visibility & Crisp Dark Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/75 via-[#FAF6F0]/60 to-[#FAF6F0]/90 backdrop-blur-[0.5px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-100/25 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center text-primary">
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#5C4D44] font-medium">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {b.to ? (
                  <Link to={b.to} className="transition-colors hover:text-accent font-medium">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-primary font-bold">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="text-accent/60">/</span>}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow with Hairline Dashes */}
        {eyebrow && (
          <div className="flex items-center justify-center gap-3 text-accent mb-3">
            <span className="h-px w-8 bg-accent/80" />
            <span className="font-sans text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.26em] text-accent">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-accent/80" />
          </div>
        )}

        {/* Title */}
        <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-primary leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base sm:text-lg font-normal leading-relaxed text-[#4A3B32] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            {subtitle}
          </p>
        )}

        {/* Clean Heritage Pill */}
        {badge && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent shadow-xs backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{badge}</span>
          </div>
        )}
      </div>
    </section>
  );
}
