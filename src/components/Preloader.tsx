import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo-hd.png";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Increment progress smoothly
    const t1 = setTimeout(() => setProgress(45), 150);
    const t2 = setTimeout(() => setProgress(85), 400);
    const t3 = setTimeout(() => setProgress(100), 750);
    const t4 = setTimeout(() => setLoading(false), 950);
    const t5 = setTimeout(() => setHidden(true), 1550); // unmount after fade

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF6F0] transition-all duration-700 ease-out ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Loading page"
    >
      {/* Decorative ambient background blur */}
      <div className="absolute h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        {/* Brand Logo with golden pulse ring */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 rounded-full border border-accent/30 animate-ping opacity-30" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent/40 bg-card p-3 shadow-deep">
            <img src={logoSrc} alt="SAIHIRA Logo" className="h-full w-auto object-contain" />
          </div>
        </div>

        {/* Title */}
        <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-accent">
          Estd. Gujarat · 1994
        </span>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-primary sm:text-4xl">
          SAIHIRA <span className="font-serif italic font-normal text-accent">· SHM Asal</span>
        </h2>
        <p className="mt-2 font-sans text-xs font-light tracking-widest text-muted-foreground uppercase">
          Handcrafting the perfect crunch
        </p>

        {/* Golden Progress Bar */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-border/60">
          <div
            className="h-full bg-gradient-to-r from-accent via-amber-400 to-amber-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
