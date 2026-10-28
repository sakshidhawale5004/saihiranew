import { useEffect, useRef, useState } from "react";
import chilliImg from "@/assets/floating/chilli-3d.png";

interface FloatingChilli3DProps {
  className?: string;
  showTag?: boolean;
}

export function FloatingChilli3D({ className = "", showTag = true }: FloatingChilli3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    // Only run on client with mouse pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let spinAngle = 0;
    let spinVelocity = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize mouse coords (-1 to 1) relative to window center
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx;
      targetY = ny;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let startTime = performance.now();

    const loop = (now: number) => {
      // Smooth lerp for buttery momentum
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      const elapsed = (now - startTime) / 1000;

      // Organic 3D floating oscillations
      const floatY = Math.sin(elapsed * 1.4) * 14;
      const floatX = Math.cos(elapsed * 0.9) * 8;
      const floatRoll = Math.sin(elapsed * 1.1) * 6; // gentle Z roll
      const floatPitch = Math.cos(elapsed * 1.3) * 5; // gentle X tilt

      // Spin physics when user clicks
      if (spinVelocity > 0.05) {
        spinAngle += spinVelocity;
        spinVelocity *= 0.93; // decay friction
      } else {
        spinVelocity = 0;
      }

      // Calculate 3D rotations based on mouse parallax + idle float + click spin
      const rotX = -currentY * 22 + floatPitch;
      const rotY = currentX * 28 + spinAngle;
      const rotZ = -12 + currentX * 10 + floatRoll;

      if (cardRef.current) {
        cardRef.current.style.transform = `
          translate3d(${floatX + currentX * 16}px, ${floatY + currentY * 16}px, 40px)
          rotateX(${rotX}deg)
          rotateY(${rotY}deg)
          rotateZ(${rotZ}deg)
        `;
      }

      // Dynamic 3D cast shadow shifts inversely to light
      if (shadowRef.current) {
        const shadowScale = 1 - floatY * 0.018;
        const shadowOpacity = 0.35 + floatY * 0.01;
        const shadowOffsetX = -currentX * 24 + floatX * 0.4;
        const shadowOffsetY = 40 + floatY * 0.3;

        shadowRef.current.style.transform = `
          translate3d(${shadowOffsetX}px, ${shadowOffsetY}px, -30px)
          scale(${Math.max(0.65, shadowScale)})
        `;
        shadowRef.current.style.opacity = `${Math.min(0.65, Math.max(0.15, shadowOpacity))}`;
      }

      // Specular 3D light reflection shifts with cursor angle
      if (sheenRef.current) {
        const sheenX = 50 + currentX * 40;
        const sheenY = 40 + currentY * 40;
        sheenRef.current.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleClick = () => {
    // Trigger playful 3D rotation pulse
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 900);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-auto cursor-pointer [perspective:1400px] ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Interactive 3D Floating Green Chilli"
    >
      {/* ──────────────── Background Depth Secondary Chilli (Micro DOF Blur) ──────────────── */}
      <div
        className="pointer-events-none absolute -bottom-6 -left-12 w-28 sm:w-36 opacity-35 blur-[2.5px] transition-transform duration-700 [transform-style:preserve-3d]"
        style={{
          transform: isHovered
            ? "translate3d(-20px, 15px, -80px) rotate(35deg) scale(0.9)"
            : "translate3d(-10px, 0px, -60px) rotate(25deg) scale(0.85)",
        }}
      >
        <img
          src={chilliImg}
          alt=""
          className="h-auto w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
        />
      </div>

      {/* ──────────────── Ground Dynamic Cast Shadow Plane ──────────────── */}
      <div
        ref={shadowRef}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-10 w-44 rounded-[100%] bg-black/40 blur-xl transition-opacity will-change-transform"
      />

      {/* ──────────────── Main 3D Floating Chilli Body ──────────────── */}
      <div
        ref={cardRef}
        className="relative [transform-style:preserve-3d] transition-[filter] duration-300 will-change-transform"
        style={{
          filter: isHovered
            ? "drop-shadow(0 28px 36px rgba(44, 122, 44, 0.28)) drop-shadow(0 14px 20px rgba(0,0,0,0.22))"
            : "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2))",
        }}
      >
        <div className="relative">
          <img
            src={chilliImg}
            alt="Realistic 3D Floating Green Chilli — Handpicked Kathiawadi Ingredient"
            className="h-auto w-56 sm:w-72 md:w-80 lg:w-[22rem] object-contain transition-transform duration-500 ease-out"
            draggable={false}
          />

          {/* Dynamic Specular 3D Glint */}
          <div
            ref={sheenRef}
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-80 rounded-full"
          />
        </div>

        {/* ──────────────── Interactive Tag Floating Near Chilli ──────────────── */}
        {showTag && (
          <div
            className={`pointer-events-none absolute -top-3 right-0 rounded-full border border-emerald-600/30 bg-[#FAF6F0]/95 px-3.5 py-1.5 shadow-luxury backdrop-blur-md transition-all duration-300 ${
              isHovered ? "scale-105 opacity-100 translate-y-0" : "scale-95 opacity-85 translate-y-1"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-sans text-[0.68rem] font-bold tracking-wider text-emerald-900 uppercase">
                Fresh Kathiawadi Chilli
              </span>
              <span className="font-serif text-xs text-accent">3D</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
