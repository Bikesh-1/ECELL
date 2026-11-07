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

    gsap.set(card, { transformPerspective: 1100, transformStyle: "preserve-3d" });
    const floatTween = gsap.to(card, { y: -22, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
    const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.55, ease: "power3.out" });
    const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.55, ease: "power3.out" });
    const floatingCards = gsap.utils.toArray<HTMLElement>(".floating-quest-card", bounds);
    const floatTweens = floatingCards.map((item, index) =>
      gsap.to(item, {
        y: index % 2 === 0 ? -18 : 16,
        rotateZ: index % 2 === 0 ? 5 : -5,
        duration: 3.2 + index * 0.55,
        delay: index * 0.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );

    const onPointerMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      rotateXTo(y * -13);
      rotateYTo(x * 15);
    };
    const onPointerLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
    };
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerleave", onPointerLeave);

    const instances = Draggable.create(card, {
      type: "x,y", bounds, edgeResistance: 0.85, inertia: false,
      onPress: () => floatTween.pause(),
      onRelease: () => floatTween.resume(),
    });

    return () => {
      floatTween.kill();
      floatTweens.forEach((tween) => tween.kill());
      instances.forEach((instance) => instance.kill());
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={boundsRef} className="relative mx-auto flex h-[410px] w-full max-w-[440px] items-center justify-center overflow-visible [perspective:1200px] sm:h-[460px]">
      <div className="absolute h-[280px] w-[280px] rotate-6 rounded-[36px] border border-[#6D4DFE]/15 bg-white/20 sm:h-[320px] sm:w-[320px]" />
      <div className="absolute h-[260px] w-[260px] -rotate-6 rounded-[36px] border border-[#FF5A36]/20 sm:h-[295px] sm:w-[295px]" />

      <div className="floating-quest-card absolute left-[1%] top-[12%] z-0 w-[145px] -rotate-[13deg] rounded-2xl border border-white/70 bg-[#F8F5EF] p-4 shadow-[0_20px_55px_rgba(23,23,23,.16)] sm:left-[-2%] sm:w-[165px]">
        <p className="text-[8px] font-black tracking-[.2em] text-[#6D4DFE]">QUEST / 001</p>
        <p className="mt-3 font-serif text-xl leading-[.95] text-[#171717]">Think of a problem worth solving.</p>
        <p className="mt-4 text-[8px] font-bold uppercase tracking-[.15em] text-[#777]">IDEATION · 10 MIN</p>
      </div>
      <div className="floating-quest-card absolute right-[0%] top-[17%] z-20 w-[130px] rotate-[12deg] rounded-2xl border border-white/15 bg-[#171717] p-4 shadow-[0_20px_55px_rgba(23,23,23,.25)] sm:right-[-1%] sm:w-[150px]">
        <p className="text-[8px] font-black tracking-[.2em] text-[#FF8B72]">FIELD NOTE / 02</p>
        <p className="mt-3 font-serif text-xl leading-[.95] text-white">Meet. Make. Repeat.</p>
        <p className="mt-4 text-[8px] font-bold uppercase tracking-[.15em] text-white/45">THE COMMUNITY</p>
      </div>
      <div className="floating-quest-card absolute bottom-[8%] right-[5%] z-20 w-[132px] -rotate-[8deg] rounded-2xl border border-[#171717]/10 bg-[#B9A9FF] p-4 shadow-[0_20px_55px_rgba(23,23,23,.16)] sm:right-[1%] sm:w-[150px]">
        <p className="text-[8px] font-black tracking-[.2em] text-[#171717]/60">BUILD / 003</p>
        <p className="mt-3 font-serif text-xl leading-[.95] text-[#171717]">Make your move.</p>
        <p className="mt-4 text-[8px] font-bold uppercase tracking-[.15em] text-[#171717]/55">START HERE ↗</p>
      </div>

      <div ref={cardRef} className="relative z-10 h-[285px] w-[285px] cursor-grab touch-none select-none overflow-hidden rounded-[30px] border-[3px] border-white bg-white shadow-[0_28px_70px_rgba(23,23,23,.24)] active:cursor-grabbing sm:h-[340px] sm:w-[340px]">
        <img src="/images/ecell-team.jpg" alt="E-Cell SMVIT team" draggable={false} className="pointer-events-none h-full w-full object-cover" />
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
      <div className="pointer-events-none absolute bottom-3 left-0 z-30 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-xl">
        <p className="text-[10px] font-black text-[#FF5A36]">EST. SMVIT</p><p className="mt-1 text-[9px] text-[#777]">Entrepreneurship</p>
      </div>
    </div>
    </div>
  );
}
