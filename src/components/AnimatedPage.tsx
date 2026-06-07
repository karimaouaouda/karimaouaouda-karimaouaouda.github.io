"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedPage({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".page-wipe",
        { scaleX: 1 },
        { scaleX: 0, duration: 1, ease: "expo.inOut", transformOrigin: "right" },
      );

      gsap.fromTo(
        "[data-hero]",
        { y: 34, autoAlpha: 0, filter: "blur(10px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", stagger: 0.09 },
      );

      const sections = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 46, autoAlpha: 0, scale: 0.985 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -12 : 12,
          duration: 2.8 + index * 0.18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((item) => {
        gsap.to(item, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <div className="page-wipe pointer-events-none fixed inset-0 z-[100] origin-right bg-[#111827]" />
      {children}
    </div>
  );
}
