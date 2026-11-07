"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters = [
  {
    number: "01",
    eyebrow: "THE SPARK",
    title: "Every big thing starts with a question.",
    body: "A thought you cannot ignore. A problem worth solving. A little curiosity that refuses to sit still.",
    tag: "IDEAS INTO ACTION",
    accent: "#B9A9FF",
  },
  {
    number: "02",
    eyebrow: "THE PEOPLE",
    title: "Find your kind of ambitious.",
    body: "Meet builders, dreamers and doers. Share what you know, learn what you don't, and make better things together.",
    tag: "BETTER, TOGETHER",
    accent: "#FF8A70",
  },
  {
    number: "03",
    eyebrow: "THE BUILD",
    title: "Make something real.",
    body: "From the first sketch to the first pitch, turn your curiosity into experiences, ventures and impact.",
    tag: "START RIGHT HERE",
    accent: "#B9A9FF",
  },
];

export default function EcellScrollStory() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
      const visual = section.querySelector(".story-orbit");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      panels.forEach((panel, index) => {
        if (index === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 70 });
        }
      });

      timeline.to(visual, { rotate: 7, scale: 1.04, duration: 1, ease: "none" }, 0);
      timeline.to(panels[0], { autoAlpha: 0, y: -55, duration: 0.8 }, 0.72);
      timeline.fromTo(panels[1], { autoAlpha: 0, y: 65 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.78);
      timeline.to(visual, { rotate: -5, scale: 0.98, duration: 1, ease: "none" }, 1);
      timeline.to(panels[1], { autoAlpha: 0, y: -55, duration: 0.8 }, 1.72);
      timeline.fromTo(panels[2], { autoAlpha: 0, y: 65 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.78);
      timeline.to(visual, { rotate: 0, scale: 1.02, duration: 1, ease: "none" }, 2);

      gsap.to(".story-ring-one", {
        rotate: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".story-ring-two", {
        rotate: -360,
        duration: 48,
        repeat: -1,
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="story-section relative my-12 min-h-[300vh] bg-[#111014] text-[#F4F0EB]" aria-label="The E-Cell journey">
      <div className="story-sticky sticky top-0 flex h-screen min-h-screen items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#ffffff_0.7px,transparent_0.7px)] [background-size:25px_25px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full border border-[#6D4DFE]/25" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-[-12rem] h-[560px] w-[560px] rounded-full border border-[#FF5A36]/20" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1320px] items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="story-copy relative min-h-[340px] sm:min-h-[390px]">
            {chapters.map((chapter, index) => (
              <article key={chapter.number} className="story-panel absolute inset-0 flex flex-col justify-center" style={{ visibility: index === 0 ? "visible" : "hidden" }}>
                <p className="mb-7 flex items-center gap-3 text-[10px] font-bold tracking-[.28em] text-white/50">
                  <span style={{ color: chapter.accent }}>{chapter.number}</span>
                  <span className="h-px w-10 bg-white/25" />
                  {chapter.eyebrow}
                </p>
                <h2 className="max-w-[760px] font-serif text-[clamp(3.1rem,6.2vw,6.6rem)] leading-[.92] tracking-[-.065em]">
                  {chapter.title}
                </h2>
                <p className="mt-7 max-w-lg text-sm leading-7 text-white/55 sm:text-base sm:leading-8">{chapter.body}</p>
                <p className="mt-9 text-[9px] font-black tracking-[.24em]" style={{ color: chapter.accent }}>{chapter.tag} ↗</p>
              </article>
            ))}
          </div>

          <div className="story-visual relative mx-auto flex h-[390px] w-full max-w-[510px] items-center justify-center sm:h-[520px]">
            <div className="story-orbit relative flex h-[300px] w-[300px] items-center justify-center sm:h-[390px] sm:w-[390px]">
              <div className="story-ring-one absolute inset-0 rounded-full border border-[#B9A9FF]/30" />
              <div className="story-ring-two absolute inset-[8%] rounded-full border border-dashed border-white/20" />
              <div className="absolute -left-5 top-[16%] z-20 -rotate-12 rounded-xl border border-white/15 bg-[#6D4DFE] px-4 py-3 shadow-2xl sm:-left-12">
                <p className="text-[8px] font-black tracking-[.2em] text-white/65">01 / THINK</p>
                <p className="mt-1 text-sm font-black text-white">Question everything.</p>
              </div>
              <div className="absolute -right-5 bottom-[15%] z-20 rotate-[9deg] rounded-xl border border-white/15 bg-[#FF5A36] px-4 py-3 shadow-2xl sm:-right-12">
                <p className="text-[8px] font-black tracking-[.2em] text-[#171717]/60">02 / BUILD</p>
                <p className="mt-1 text-sm font-black text-[#171717]">Make it happen.</p>
              </div>
              <div className="relative h-[235px] w-[235px] rotate-[-4deg] overflow-hidden rounded-[28px] border-[5px] border-white/90 bg-[#27242D] shadow-[0_35px_100px_rgba(0,0,0,.5)] sm:h-[310px] sm:w-[310px]">
                <img src="/images/ecell-team.jpg" alt="E-Cell SMVIT community" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                <div className="absolute bottom-0 left-0 p-5 sm:p-7">
                  <p className="text-[8px] font-bold tracking-[.28em] text-white/65">ENTREPRENEURSHIP CELL</p>
                  <p className="mt-2 font-serif text-3xl leading-none text-white sm:text-4xl">Think bigger.</p>
                </div>
              </div>
              <span className="absolute -right-3 top-[7%] h-4 w-4 rounded-full bg-[#B9A9FF] shadow-[0_0_30px_#6D4DFE]" />
              <span className="absolute -bottom-2 left-[18%] h-3 w-3 rounded-full bg-[#FF5A36] shadow-[0_0_25px_#FF5A36]" />
            </div>
            <p className="absolute bottom-0 text-[9px] font-bold uppercase tracking-[.22em] text-white/35">Scroll to move through the story ↓</p>
          </div>
        </div>
        <div className="pointer-events-none absolute right-8 top-8 hidden text-[9px] font-bold tracking-[.25em] text-white/30 lg:block">E-CELL / SMVIT — THE JOURNEY</div>
      </div>
    </section>
  );
}
