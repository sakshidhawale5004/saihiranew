import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  shape: "circle" | "sparkle" | "seed";
}

const COLORS = [
  "#D4AF37", // Warm Gold
  "#C68A4C", // Rich Amber
  "#E6A15C", // Saffron Spice
  "#8C4A1A", // Roasted Cinnamon
  "#F5EBE0", // White Sesame
  "#FFD166", // Crisp Turmeric
];

export function SprinklesCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on touch devices or mobile
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: Particle[] = [];
    const MAX_PARTICLES = 28;

    let mouseX = -100;
    let mouseY = -100;
    let lastSpawn = 0;

    const createParticle = (x: number, y: number, isBurst = false): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? 0.8 + Math.random() * 1.8 : 0.2 + Math.random() * 0.8;
      const shapes: Array<"circle" | "sparkle" | "seed"> = ["circle", "sparkle", "seed"];

      return {
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.15,
        size: isBurst ? 1.2 + Math.random() * 1.6 : 0.8 + Math.random() * 1.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.75,
        decay: 0.025 + Math.random() * 0.03,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const now = performance.now();
      if (now - lastSpawn > 45) {
        lastSpawn = now;
        if (particles.length < MAX_PARTICLES) {
          particles.push(createParticle(mouseX, mouseY));
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Subtle sparkle hint on click
      for (let i = 0; i < 5; i++) {
        if (particles.length < MAX_PARTICLES + 8) {
          particles.push(createParticle(e.clientX, e.clientY, true));
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035; // gentle downward drift
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.x < 0 || p.x > width || p.y > height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "seed") {
          // Oval sesame / cumin seed
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 4-point golden sparkle diamond
          ctx.beginPath();
          const s = p.size * 1.2;
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.3, 0);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.3, 0);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
