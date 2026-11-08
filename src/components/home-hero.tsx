"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=85",
    alt: "Students collaborating on an idea",
    label: "Build together",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=85",
    alt: "Entrepreneurship workshop and discussion",
    label: "Make it happen",
  },
];

function PhotoCard({ photo }: { photo: (typeof photos)[number] }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border-2 border-[#171717] bg-white p-2 shadow-[0_6px_0_#171717]">
      <img src={photo.src} alt={photo.alt} className="h-24 w-full rounded-lg object-cover sm:h-28" />
      <p className="px-2 pb-1 pt-2 text-left text-[10px] font-black uppercase tracking-wider text-[#6D4DFE] sm:text-xs">{photo.label}</p>
    </div>
  );
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const targetRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useLayoutEffect(() => {
    const overlay = loaderRef.current;
    const targets = targetRefs.map((ref) => ref.current);
    if (!overlay) return;

    const sources = Array.from(overlay.querySelectorAll<HTMLElement>("[data-intro-photo]"));
    let timeline: gsap.core.Timeline | null = null;
    let finished = false;
    let fallbackTimer = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      timeline?.kill();
      if (targets.length) gsap.set(targets.filter(Boolean), { clearProps: "opacity,visibility,transform" });
      overlay.remove();
    };

    // Hard deadline: this runs even if GSAP, image decoding, or animation callbacks fail.
    fallbackTimer = window.setTimeout(finish, 4000);

    const begin = () => {
      if (finished || !overlay.isConnected) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || targets.some((node) => !node)) {
        finish();
        return;
      }

      try {
        const fromRects = sources.map((node) => node.getBoundingClientRect());
        const toRects = targets.map((node) => node!.getBoundingClientRect());
        gsap.set(targets, { autoAlpha: 0 });

        timeline = gsap.timeline({
          onComplete: finish,
          onInterrupt: finish,
        });

        timeline
          .fromTo("[data-welcome]", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" })
          .to("[data-welcome]", { y: -14, autoAlpha: 0, duration: 0.3, delay: 0.35, ease: "power2.in" });

        sources.forEach((source, index) => {
          const from = fromRects[index];
          const to = toRects[index];
          timeline!.to(source, {
            x: to.left - from.left,
            y: to.top - from.top,
            width: to.width,
            height: to.height,
            rotation: 0,
            duration: 0.85,
            ease: "power3.inOut",
          }, index === 0 ? "<" : "<+=0.08");
        });

        timeline.to("[data-loader-mark]", { scale: 0.8, autoAlpha: 0, duration: 0.25 }, "-=0.55");
      } catch {
        finish();
      }
    };

    const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(begin));

    return () => {
      window.cancelAnimationFrame(frame);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      timeline?.kill();
      gsap.killTweensOf(sources);
      gsap.killTweensOf(targets);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative isolate mx-auto mt-5 flex min-h-[570px] max-w-7xl flex-col items-center justify-center overflow-hidden px-5 py-14 text-center sm:min-h-[610px] sm:px-10"
        style={{ backgroundImage: "radial-gradient(#6D4DFE22 1.15px, transparent 1.15px)", backgroundSize: "19px 19px" }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#E0E0E1]/30 to-transparent" />
        <div className="relative z-10 mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#171717] bg-white p-3 shadow-[0_5px_0_#171717] sm:h-24 sm:w-24">
          <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg" alt="E-Cell SMVIT logo" className="h-full w-full object-contain" />
        </div>
        <p className="relative z-10 text-[10px] font-black uppercase tracking-[.22em] text-[#6D4DFE] sm:text-xs">Entrepreneurship Cell · SMVIT</p>
        <h1 className="relative z-10 mt-5 max-w-4xl text-[clamp(2rem,4.4vw,4rem)] font-black leading-[1.04] tracking-[-.065em] text-[#171717]">
          Where ideas meet <span className="text-[#6D4DFE]">opportunity.</span>
        </h1>
        <p className="relative z-10 mt-5 max-w-xl text-sm font-medium leading-7 text-[#686870] sm:text-base">
          A space for curious minds, bold builders and future founders to connect, create and turn ambition into action.
        </p>
        <div className="relative z-10 mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/events" className="inline-flex min-h-11 items-center gap-3 rounded-xl border-2 border-[#171717] bg-[#6D4DFE] px-5 py-2.5 text-sm font-black text-white shadow-[0_4px_0_#171717] transition-all hover:-translate-y-1 hover:bg-white hover:text-[#6D4DFE] active:translate-y-1 active:shadow-none">
            Explore events <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/signup" className="inline-flex min-h-11 items-center rounded-xl border-2 border-[#171717] bg-white px-5 py-2.5 text-sm font-black text-[#171717] shadow-[0_4px_0_#171717] transition-all hover:-translate-y-1 hover:bg-[#6D4DFE] hover:text-white active:translate-y-1 active:shadow-none">
            Join the community
          </Link>
        </div>

        <div className="relative z-0 mt-9 flex w-full max-w-md justify-center gap-5 lg:contents">
          {photos.map((photo, index) => (
            <div
              key={photo.label}
              ref={targetRefs[index]}
              className={index === 0
                ? "relative w-[42%] max-w-[190px] -rotate-6 lg:absolute lg:left-5 lg:top-1/2 lg:mt-0 lg:w-52 lg:max-w-none lg:-translate-y-1/2 xl:left-12 xl:w-60"
                : "relative w-[42%] max-w-[190px] rotate-6 lg:absolute lg:right-5 lg:top-1/2 lg:mt-0 lg:w-52 lg:max-w-none lg:-translate-y-[42%] xl:right-12 xl:w-60"}
            >
              <PhotoCard photo={photo} />
            </div>
          ))}
        </div>
      </section>

      <div
        ref={loaderRef}
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#E0E0E1]"
        aria-label="Welcome to E-Cell SMVIT"
        role="status"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(#6D4DFE2b 1.2px, transparent 1.2px)", backgroundSize: "19px 19px" }} />
        <div data-welcome className="relative z-10 flex flex-col items-center px-6 text-center">
          <div data-loader-mark className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#171717] bg-white p-3 shadow-[0_5px_0_#171717] sm:h-24 sm:w-24">
            <img src="https://ik.imagekit.io/es6xialea/blacklogo.svg" alt="" className="h-full w-full object-contain" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#6D4DFE] sm:text-xs">Entrepreneurship Cell · SMVIT</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-.06em] text-[#171717] sm:text-6xl">WELCOME TO <span className="text-[#6D4DFE]">SMVIT.</span></h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[.18em] text-[#686870]">Ideas start here. Futures take shape.</p>
        </div>
        <div data-intro-photo className="absolute left-[5vw] top-[58%] w-[34vw] max-w-[210px] -rotate-6 sm:left-[9vw] sm:top-[55%] sm:w-[23vw]">
          <PhotoCard photo={photos[0]} />
        </div>
        <div data-intro-photo className="absolute right-[5vw] top-[24%] w-[34vw] max-w-[210px] rotate-6 sm:right-[9vw] sm:top-[23%] sm:w-[23vw]">
          <PhotoCard photo={photos[1]} />
        </div>
      </div>
    </>
  );
}
