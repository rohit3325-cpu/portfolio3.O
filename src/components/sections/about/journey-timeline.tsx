"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { journey } from "@/content/timeline";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !lineRef.current) return;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute top-0 left-3.75 h-full w-px bg-border sm:left-4.75" />
      <div
        ref={lineRef}
        className="absolute top-0 left-3.75 h-full w-px origin-top bg-linear-to-b from-accent to-accent-2 sm:left-4.75"
        style={{ transform: "scaleY(0)" }}
      />

      <ol className="space-y-12">
        {journey.map((item, i) => (
          <motion.li
            key={item.phase}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-12 sm:pl-14"
          >
            <span className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg text-[11px] font-medium text-accent sm:h-10 sm:w-10">
              {item.phase}
            </span>
            <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border-hover sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold text-white">{item.title}</h3>
                <span className="text-xs text-muted">{item.period}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
