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

    const floatTween = gsap.to(card, { y: -22, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
    const instances = Draggable.create(card, {
      type: "x,y", bounds, edgeResistance: 0.85, inertia: false,
      onPress: () => floatTween.pause(), onRelease: () => floatTween.resume(),
    });
    return () => { floatTween.kill(); instances.forEach((instance) => instance.kill()); };
  }, []);

  return (
    <div ref={boundsRef} className="relative mx-auto flex h-[410px] w-full max-w-[440px] items-center justify-center overflow-visible sm:h-[460px]">
      <div className="absolute h-[280px] w-[280px] rotate-6 rounded-[36px] border border-[#6D4DFE]/15 bg-white/20 sm:h-[320px] sm:w-[320px]" />
      <div className="absolute h-[260px] w-[260px] -rotate-6 rounded-[36px] border border-[#FF5A36]/20 sm:h-[295px] sm:w-[295px]" />
      <div ref={cardRef} className="absolute z-10 h-[285px] w-[285px] cursor-grab touch-none select-none overflow-hidden rounded-[30px] border-[3px] border-white bg-white shadow-[0_28px_70px_rgba(23,23,23,.19)] active:cursor-grabbing sm:h-[340px] sm:w-[340px]">
        <img src="https://images.unsplash.com/photo-1793253261549-d86da28fe7a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" draggable={false} className="pointer-events-none h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-[#171717]/5 to-[#171717]/10" />
        <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/45 bg-white/20 px-3 py-2 text-[9px] font-black tracking-[.2em] text-white backdrop-blur-md">✦ OUR COMMUNITY</div>
        <div className="pointer-events-none absolute bottom-0 left-0 p-6 text-white sm:p-7">
          <p className="text-[9px] font-bold tracking-[.25em] text-white/75">E-CELL SMVIT</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Think. Build. Inspire.</h3>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/65">Drag to explore</p>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-0 z-20 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-xl">
        <p className="text-[10px] font-black text-[#FF5A36]">EST. SMVIT</p><p className="mt-1 text-[9px] text-[#777]">Entrepreneurship</p>
      </div>
    </div>
  );
}
