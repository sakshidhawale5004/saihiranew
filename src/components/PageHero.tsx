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
    <section className="relative overflow-hidden border-b border-border/80 bg-[#FAF6F0] py-14 sm:py-18 md:py-20">
      {/* Background Editorial Image with Soft Warm Luminous Scrim */}
      <img
        src={image}
        alt="Page hero background"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-25 filter brightness-100"
      />

      {/* Warm Scrim Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/95 via-[#FAF6F0]/90 to-[#FAF6F0]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center text-primary">
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#7D6B60]">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {b.to ? (
                  <Link to={b.to} className="transition-colors hover:text-accent">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-primary font-semibold">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="text-accent/60">/</span>}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow with Hairline Dashes */}
        {eyebrow && (
          <div className="flex items-center justify-center gap-3 text-accent mb-3">
            <span className="h-px w-8 bg-accent/70" />
            <span className="font-sans text-[0.7rem] sm:text-xs font-bold uppercase tracking-[0.26em] text-accent">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-accent/70" />
          </div>
        )}

        {/* Title */}
        <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-primary leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base sm:text-lg font-normal leading-relaxed text-[#544237]">
            {subtitle}
          </p>
        )}

        {/* Clean Heritage Pill */}
        {badge && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{badge}</span>
          </div>
        )}
      </div>
    </section>
  );
}
