
"use client";

import { useEffect, useRef } from "react";

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = canvas.clientWidth;
      height = canvas.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const drawGlow = (
      x: number,
      y: number,
      radius: number,
      color: string,
      opacity: number
    ) => {
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
      );

      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "transparent");

      ctx.globalAlpha = opacity;
      ctx.fillStyle = gradient;
      ctx.fillRect(
        x - radius,
        y - radius,
        radius * 2,
        radius * 2
      );

      ctx.globalAlpha = 1;
    };

    const drawRay = (
      time: number,
      index: number,
      color: string
    ) => {
      const wave = Math.sin(time * 0.00035 + index * 0.7);

      const startX = width * (0.15 + index * 0.22);
      const startY = -height * 0.2;

      const endX = startX + wave * 220;
      const endY = height * 1.2;

      const gradient = ctx.createLinearGradient(
        startX, startY,
        endX, endY
      );

      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.35, color);
      gradient.addColorStop(0.55, color);
      gradient.addColorStop(1, "transparent");

      ctx.save();
      ctx.globalAlpha = 0.10;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 90;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        startX + wave * 150,
        height * 0.3,
        endX - wave * 100,
        height * 0.7,
        endX,
        endY
      );
      ctx.stroke();

      ctx.restore();
    };

    const drawAurora = (time: number) => {
      const colors = [
        "rgba(109, 77, 254, 0.22)",
        "rgba(255, 90, 54, 0.13)",
        "rgba(109, 77, 254, 0.17)",
      ];

      colors.forEach((color, i) => {
        const offset = Math.sin(time * 0.0003 + i * 2) * 80;

        const x = width * (0.2 + i * 0.3) + offset;
        const y = height * (0.35 + Math.sin(time * 0.0002 + i) * 0.2);

        drawGlow(
          x,
          y,
          Math.min(width, height) * 0.45,
          color,
          1
        );
      });
    };

    const drawWaves = (time: number) => {
      const colors = [
        "rgba(109, 77, 254, 0.16)",
        "rgba(255, 90, 54, 0.12)",
        "rgba(109, 77, 254, 0.10)",
      ];

      colors.forEach((color, index) => {
        ctx.beginPath();

        const baseY = height * (0.68 + index * 0.10);

        for (let x = 0; x <= width; x += 8) {
          const wave1 = Math.sin(x * 0.003 + time * 0.0005 + index) * 55;
          const wave2 = Math.sin(x * 0.0018 - time * 0.0003) * 35;

          const mouseDistance = Math.abs(x - mouse.x);
          const influence = Math.max(0, 1 - mouseDistance / 350);

          const mouseEffect = influence * (mouse.y - baseY) * 0.12;

          const y = baseY + wave1 + wave2 + mouseEffect;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const gradient = ctx.createLinearGradient(
          0, baseY - 100,
          width, baseY + 100
        );

        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, color);
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const draw = (time: number) => {
      frame++;

      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // Soft ambient aurora
      drawAurora(time);

      // Moving sunlight rays
      drawRay(time, 0, "#6D4DFE");
      drawRay(time, 1, "#FF5A36");
      drawRay(time, 2, "#6D4DFE");

      // Mouse reactive glow
      if (mouse.x > 0 && mouse.x < width) {
        drawGlow(
          mouse.x,
          mouse.y,
          260,
          "rgba(109, 77, 254, 0.18)",
          1
        );

        drawGlow(
          mouse.x + 40,
          mouse.y + 30,
          160,
          "rgba(255, 90, 54, 0.10)",
          1
        );
      }

      // Flowing liquid waves
      drawWaves(time);

      animationId = requestAnimationFrame(draw);
    };

    resize();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const start = () => {
      cancelAnimationFrame(animationId);
      if (reducedMotion.matches) {
        ctx.clearRect(0, 0, width, height);
        drawAurora(0);
        return;
      }
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    reducedMotion.addEventListener("change", start);

    start();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
