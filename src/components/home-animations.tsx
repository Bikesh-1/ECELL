
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // NAVBAR ENTRANCE
      gsap.from(".nav-animate", {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // HERO BADGE
      gsap.from(".hero-badge", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });

      // HERO HEADING
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.35,
        ease: "power4.out",
      });

      // HERO DESCRIPTION
      gsap.from(".hero-description", {
        y: 35,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
      });

      // HERO BUTTON
      gsap.from(".hero-button", {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.9,
        ease: "back.out(1.7)",
      });

      // PARALLAX BACKGROUND ELEMENTS
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const speed = Number(element.dataset.speed || 0.2);

        gsap.to(element, {
          y: () => window.innerHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // HERO SECTION SCROLL EFFECT
      gsap.to(".hero-content", {
        y: -100,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // UPCOMING EVENTS HEADING
      gsap.from(".events-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".events-heading",
          start: "top 85%",
        },
      });

      // EVENT CARDS STAGGER
      gsap.from(".event-card", {
        y: 70,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".events-grid",
          start: "top 85%",
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
