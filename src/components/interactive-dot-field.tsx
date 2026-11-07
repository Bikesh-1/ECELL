"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; baseX: number; baseY: number; phase: number };

export default function InteractiveDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let dots: Dot[] = [];
    const pointer = { x: -1000, y: -1000, active: false };
    const spacing = 34;
    const mouseRadius = 170;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = 18; y < height + spacing; y += spacing) {
        for (let x = 18; x < width + spacing; x += spacing) {
          const jitterX = Math.sin(x * 0.07 + y * 0.03) * 2.2;
          const jitterY = Math.cos(y * 0.06 + x * 0.025) * 2.2;
          const px = x + jitterX;
          const py = y + jitterY;
          dots.push({ x: px, y: py, baseX: px, baseY: py, phase: (x * y) % 6 });
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const nearby: { x: number; y: number; distance: number; phase: number }[] = [];

      for (const dot of dots) {
        let dx = 0;
        let dy = 0;
        let distance = Infinity;
        if (pointer.active && !reduceMotion) {
          const mx = dot.baseX - pointer.x;
          const my = dot.baseY - pointer.y;
          distance = Math.hypot(mx, my);
          if (distance < mouseRadius && distance > 0) {
            const force = (1 - distance / mouseRadius) * 13;
            dx = (mx / distance) * force;
            dy = (my / distance) * force;
          }
        }
        dot.x += (dot.baseX + dx - dot.x) * 0.14;
        dot.y += (dot.baseY + dy - dot.y) * 0.14;
        nearby.push({ x: dot.x, y: dot.y, distance, phase: dot.phase });
      }

      for (let i = 0; i < nearby.length; i++) {
        const a = nearby[i];
        const col = Math.round(width / spacing) + 1;
        for (const j of [i + 1, i + col]) {
          const b = nearby[j];
          if (!b) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 48) {
            const proximity = pointer.active ? Math.max(0, 1 - Math.min(a.distance, b.distance) / mouseRadius) : 0;
            ctx.strokeStyle = proximity > 0.08
              ? `rgba(109,77,254,${0.10 + proximity * 0.22})`
              : "rgba(35,35,45,0.045)";
            ctx.lineWidth = 0.7 + proximity * 0.45;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const dot of nearby) {
        const proximity = pointer.active ? Math.max(0, 1 - dot.distance / mouseRadius) : 0;
        const accent = dot.phase < 2;
        const radius = 1.05 + proximity * 1.7;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = proximity > 0.12
          ? `rgba(109,77,254,${0.22 + proximity * 0.52})`
          : accent ? "rgba(109,77,254,0.17)" : "rgba(35,35,45,0.15)";
        ctx.fill();
      }

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
    />
  );
}
