
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

export default function FloatingEcellCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const card = cardRef.current;
    const container = containerRef.current;

    if (!card || !container) return;

    const floatTween = gsap.to(card, {
      y: -45,
      duration: 3.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const draggable = Draggable.create(card, {
      type: "x,y",
      bounds: container,
      edgeResistance: 0.8,
      onPress: () => floatTween.pause(),
      onRelease: () => floatTween.resume(),
    });

    return () => {
      floatTween.kill();
      draggable.forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-[390px] w-full max-w-[390px] shrink-0 items-center justify-center lg:mx-0"
    >
      {/* Background decorative square */}
      <div className="absolute h-[270px] w-[270px] rotate-6 rounded-[35px] border border-[#6D4DFE]/15 bg-[#6D4DFE]/[0.035]" />

      {/* Draggable photo card */}
      <div
        ref={cardRef}
        className="absolute z-10 h-[280px] w-[280px] cursor-grab touch-none overflow-hidden rounded-[28px] border-[3px] border-white bg-white shadow-[0_20px_50px_rgba(23,23,23,0.14)] active:cursor-grabbing sm:h-[310px] sm:w-[310px]"
      >
        <img
          src="/images/ecell-team.jpg"
          alt="E-Cell SMVIT Team"
          draggable={false}
          className="pointer-events-none h-full w-full select-none object-cover"
        />

        {/* Image gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        {/* Bottom text */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full p-6 text-white">
          <p className="text-xs font-bold tracking-[0.25em] text-white/70">
            E-CELL SMVIT
          </p>
          <h3 className="mt-2 text-2xl font-black">
            Think. Build. Inspire.
          </h3>
        </div>

        {/* Top label */}
        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/40 bg-white/30 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
          ✦ OUR COMMUNITY
        </div>
      </div>

      {/* Small decorative badge */}
      <div className="pointer-events-none absolute -right-1 top-8 z-20 rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl sm:right-0">
        <p className="text-xs font-black text-[#6D4DFE]">IDEATE</p>
        <p className="text-[10px] text-[#777]">Make it happen.</p>
      </div>

      <div className="pointer-events-none absolute -bottom-1 left-0 z-20 rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl">
        <p className="text-xs font-black text-[#FF5A36]">EST. SMVIT</p>
        <p className="text-[10px] text-[#777]">Entrepreneurship</p>
      </div>
    </div>
  );
}
