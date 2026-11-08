"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

export default function FloatingEcellCard() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const bounds = boundsRef.current;
    if (!card || !bounds) return;

    gsap.registerPlugin(Draggable);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const floatTween = reduceMotion
      ? null
      : gsap.to(card, { y: -10, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true });
    const instances = Draggable.create(card, {
      type: "x,y",
      bounds,
      edgeResistance: 0.9,
      inertia: false,
      onPress: () => floatTween?.pause(),
      onRelease: () => floatTween?.resume(),
    });

    return () => {
      floatTween?.kill();
      instances.forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div ref={boundsRef} className="relative mx-auto flex h-[390px] w-full max-w-[420px] items-center justify-center overflow-visible sm:h-[440px]">
      <div className="absolute h-[290px] w-[290px] rounded-[28px] border border-[#6D4DFE]/20 bg-white/30 sm:h-[330px] sm:w-[330px]" />
      <div className="absolute h-[270px] w-[270px] rotate-6 rounded-[28px] border border-[#FF5A36]/20 sm:h-[305px] sm:w-[305px]" />
      <div ref={cardRef} className="relative z-10 h-[285px] w-[285px] cursor-grab touch-none select-none overflow-hidden rounded-2xl border border-white bg-white shadow-[0_18px_48px_rgba(23,23,23,.15)] active:cursor-grabbing sm:h-[340px] sm:w-[340px]">
        <img
          src="/images/ecell-team.jpg"
          alt="E-Cell SMVIT team"
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/75 via-transparent to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 p-6 text-white">
          <p className="text-[10px] font-semibold tracking-[.16em] text-white/75">E-CELL SMVIT</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Think. Build. Inspire.</h3>
          <p className="mt-2 text-xs text-white/70">Drag to explore</p>
        </div>
      </div>
    </div>
  );
}
