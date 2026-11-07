"use client";

function HomeMotion() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = ref.current?.parentElement;
    if (!root) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(".hero-badge", { y: 22, opacity: 0, duration: .7 })
        .from(".hero-eyebrow", { y: 18, opacity: 0, duration: .6 }, "-=.35")
        .from(".hero-title", { y: 70, opacity: 0, duration: 1.05, ease: "power4.out" }, "-=.3")
        .from(".hero-description", { y: 24, opacity: 0, duration: .7 }, "-=.45")
        .from(".hero-actions", { y: 18, opacity: 0, duration: .6 }, "-=.35")
        .from(".hero-visual", { x: 55, opacity: 0, scale: .96, duration: 1 }, "-=.8")
        .from(".hero-footnote", { y: 12, opacity: 0, duration: .5 }, "-=.45");

      gsap.to(".hero-visual", { y: -45, ease: "none", scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.from(".impact-strip > div", { y: 25, opacity: 0, stagger: .1, duration: .65, ease: "power3.out", scrollTrigger: { trigger: ".impact-strip", start: "top 88%" } });
      gsap.from(".events-heading > *", { y: 38, opacity: 0, stagger: .12, duration: .8, ease: "power3.out", scrollTrigger: { trigger: ".events-heading", start: "top 82%" } });
      gsap.from(".event-card", { y: 55, opacity: 0, scale: .97, stagger: .12, duration: .75, ease: "power3.out", scrollTrigger: { trigger: ".events-grid", start: "top 85%" } });
      gsap.from(".closing-cta > div", { y: 35, opacity: 0, stagger: .1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: ".closing-cta", start: "top 82%" } });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.speed || .1);
        gsap.to(el, { y: () => window.innerHeight * speed, ease: "none", scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className="pointer-events-none absolute left-0 top-0 h-0 w-0" aria-hidden="true" />;
}
