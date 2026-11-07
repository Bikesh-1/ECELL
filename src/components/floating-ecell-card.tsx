"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

export default function FloatingEcellCard() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable);
    const card = cardRef.current;
    const bounds = boundsRef.current;
    if (!card || !bounds) return;

    const floatTween = gsap.to(card, {
      y: -22,
      duration: 3.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const instances = Draggable.create(card, {
      type: "x,y",
      bounds,
      edgeResistance: 0.85,
      inertia: false,
      onPress: () => floatTween.pause(),
      onRelease: () => floatTween.resume(),
    });

    return () => {
      floatTween.kill();
      instances.forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div ref={boundsRef} className="relative mx-auto flex h-[390px] w-full max-w-[410px] items-center justify-center overflow-visible">
      <div className="absolute h-[285px] w-[285px] rotate-6 rounded-[34px] border border-[#6D4DFE]/10 bg-white/20" />
      <div className="absolute h-[260px] w-[260px] -rotate-6 rounded-[34px] border border-[#FF5A36]/15" />

      <div
        ref={cardRef}
        className="absolute z-10 h-[280px] w-[280px] cursor-grab touch-none select-none overflow-hidden rounded-[28px] border-[3px] border-white bg-white shadow-[0_22px_55px_rgba(23,23,23,0.16)] active:cursor-grabbing sm:h-[310px] sm:w-[310px]"
      >
        <img
          src="/images/ecell-team.jpg"
          alt="E-Cell SMVIT team"
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-[#171717]/10" />
        <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/40 bg-white/20 px-3 py-2 text-[10px] font-black tracking-[0.18em] text-white backdrop-blur-md">
          ✦ OUR COMMUNITY
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 p-6 text-white">
          <p className="text-[10px] font-bold tracking-[0.25em] text-white/75">E-CELL SMVIT</p>
          <h3 className="mt-2 text-2xl font-black">Think. Build. Inspire.</h3>
          <p className="mt-1 text-xs text-white/75">Drag me anywhere</p>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-7 z-20 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl">
        <p className="text-xs font-black text-[#6D4DFE]">IDEATE</p>
        <p className="text-[10px] text-[#777]">Make it happen.</p>
      </div>
      <div className="pointer-events-none absolute bottom-5 left-0 z-20 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl">
        <p className="text-xs font-black text-[#FF5A36]">EST. SMVIT</p>
        <p className="text-[10px] text-[#777]">Entrepreneurship</p>
      </div>
    </div>
  );
}
