
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EditorialBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const purple = purpleRef.current;
      const orange = orangeRef.current;
      const frame = frameRef.current;
      const watermark = textRef.current;
      const star = starRef.current;

      if (!purple || !orange || !frame || !watermark || !star) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Purple sculpture
        gsap.to(purple, {
          y: -35,
          rotation: 9,
          duration: 7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Orange editorial ribbon
        gsap.to(orange, {
          x: 35,
          y: -20,
          rotation: -8,
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Thin geometric frame
        gsap.to(frame, {
          rotation: -4,
          scale: 1.035,
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Background typography
        gsap.to(watermark, {
          x: 30,
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Decorative star
        gsap.to(star, {
          rotation: 180,
          scale: 1.12,
          duration: 15,
          ease: "none",
          repeat: -1,
        });

        // Mouse parallax
        const movePurple = gsap.quickTo(purple, "x", {
          duration: 1.2,
          ease: "power3.out",
        });

        const moveOrange = gsap.quickTo(orange, "x", {
          duration: 1.4,
          ease: "power3.out",
        });

        const moveFrame = gsap.quickTo(frame, "y", {
          duration: 1.1,
          ease: "power3.out",
        });

        const moveStar = gsap.quickTo(star, "y", {
          duration: 1.3,
          ease: "power3.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;

          movePurple(x * 28);
          moveOrange(x * -22);
          moveFrame(y * 22);
          moveStar(y * -18);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Soft ambient background */}
      <div className="absolute inset-0 bg-[#E0E0E1]" />

      {/* Subtle editorial light */}
      <div
        className="absolute -right-40 top-[-10%] h-[600px] w-[600px] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #C8BEFF 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute -bottom-40 -left-40 h-[550px] w-[550px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #FFB5A1 0%, transparent 70%)",
        }}
      />

      {/* Giant editorial watermark */}
      <div
        ref={textRef}
        className="absolute left-[-3%] top-[26%] select-none whitespace-nowrap"
      >
        <span className="font-black text-[clamp(100px,19vw,280px)] leading-none tracking-[-0.09em] text-[#171717]/[0.035]">
          CREATE.
        </span>
      </div>

      {/* Purple geometric sculpture */}


      {/* Orange moving ribbon */}


      {/* Thin geometric outline */}
      <div
        ref={frameRef}
        className="absolute right-[17%] top-[48%] h-[180px] w-[180px] border-[1.5px] border-[#171717]/20 sm:right-[23%] sm:h-[280px] sm:w-[280px]"
        style={{
          transform: "rotate(25deg)",
          willChange: "transform",
        }}
      >
        <div className="absolute -right-3 -top-3 h-5 w-5 bg-[#FF5A36]" />
      </div>

      {/* Editorial star */}
      <div
        ref={starRef}
        className="absolute right-[8%] bottom-[12%] select-none text-[80px] font-black leading-none text-[#FF5A36] sm:right-[15%] sm:bottom-[15%] sm:text-[130px]"
      >
        ✳
      </div>

      {/* Tiny editorial labels */}
      <div className="absolute left-[5%] top-[20%] hidden text-[10px] font-bold uppercase tracking-[0.35em] text-[#171717]/35 sm:block">
        Innovation / 001
      </div>

      <div className="absolute bottom-[7%] right-[4%] hidden text-[10px] font-bold uppercase tracking-[0.35em] text-[#171717]/35 sm:block">
        E-Cell / SMVIT
      </div>

      {/* Fine horizontal editorial line */}
      <div className="absolute left-[5%] right-[5%] top-[16%] h-px bg-[#171717]/10" />
    </div>
  );
}
