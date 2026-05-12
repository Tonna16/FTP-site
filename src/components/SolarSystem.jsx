import { useEffect, useRef } from "react";

const PLANETS = [
  { r: 3.5, orbitRx: 58,  orbitRy: 16, period: 4500,  color: "#aaaaaa", phase: 0.1 },   // Mercury
  { r: 5,   orbitRx: 86,  orbitRy: 24, period: 7200,  color: "#e8cda0", phase: 0.6 },   // Venus
  { r: 5.5, orbitRx: 118, orbitRy: 33, period: 10000, color: "#5baee0", phase: 0.3 },   // Earth
  { r: 4,   orbitRx: 150, orbitRy: 42, period: 13500, color: "#d05a30", phase: 0.8 },   // Mars
  { r: 9.5, orbitRx: 198, orbitRy: 56, period: 21000, color: "#d4a96e", phase: 0.45 },  // Jupiter
  { r: 8,   orbitRx: 246, orbitRy: 69, period: 29500, color: "#e2d09a", phase: 0.15 },  // Saturn (rings added via arc)
];

export default function SolarSystem() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SIZE = canvas.width;
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    let start = null;

    function draw(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // --- Orbit rings ---
      PLANETS.forEach((p) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, p.orbitRx, p.orbitRy, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // --- Sun glow ---
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 48);
      sunGlow.addColorStop(0, "rgba(125, 211, 252, 1)");
      sunGlow.addColorStop(0.5, "rgba(125, 211, 252, 0.6)");
      sunGlow.addColorStop(1, "rgba(125, 211, 252, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 48, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // --- Sun core ---
      const sunCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16);
      sunCore.addColorStop(0, "#fffbe8");
      sunCore.addColorStop(0.5, "#7dd3fc");
      sunCore.addColorStop(1, "#38bdf8");
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fillStyle = sunCore;
      ctx.fill();

      // --- Planets ---
      PLANETS.forEach((p, i) => {
        const angle = ((elapsed / p.period) + p.phase) * Math.PI * 2;
        const px = cx + p.orbitRx * Math.cos(angle);
        const py = cy + p.orbitRy * Math.sin(angle);

        // Planet glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, p.r * 2.5);
        glow.addColorStop(0, p.color + "cc");
        glow.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(px, py, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Planet body
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Saturn rings
        if (i === 5) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(-0.35);
          ctx.scale(1, 0.35);
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 2.0, 0, Math.PI * 2);
          ctx.strokeStyle = "#e2d09a66";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.restore();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={560}
      className="w-full max-w-[420px] h-auto mx-auto block"
      style={{ imageRendering: "auto" }}
    />
  );
}