"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandPageMotion() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const node = root.current;
    if (!node) return;
    const ctx = gsap.context(() => {
      gsap.from(".page-hero-copy > *", { y: 34, opacity: 0, duration: .8, stagger: .1, ease: "power3.out" });
      gsap.from(".page-hero-image", { x: 55, opacity: 0, scale: .96, duration: 1, ease: "power3.out", delay: .2 });
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.from(el, { y: 42, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((el) => {
        gsap.from(el, { y: 35, opacity: 0, scale: .97, duration: .7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.to(".page-orb", { y: -30, rotate: 18, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, node);
    return () => ctx.revert();
  }, []);
  return <div ref={root} className="pointer-events-none absolute left-0 top-0 h-0 w-0" aria-hidden="true" />;
}
