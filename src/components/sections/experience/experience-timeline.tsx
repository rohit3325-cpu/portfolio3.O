"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/content/experience";

export function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      <div className="absolute top-2 left-3.75 h-[calc(100%-1rem)] w-px bg-border sm:left-4.75" />

      <ol className="space-y-3">
        {experience.map((item, i) => {
          const isOpen = activeIndex === i;
          return (
            <li key={item.role} className="relative pl-12 sm:pl-14">
              <span
                className={`absolute top-2 left-0 flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-medium transition-colors sm:h-10 sm:w-10 ${
                  isOpen
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-bg text-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => setActiveIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen ? "true" : "false"}
                className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-border-hover sm:p-6"
              >
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {item.org} · {item.context}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-muted sm:inline">{item.period}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 rounded-2xl border border-border bg-bg/60 p-5 sm:p-6">
                      <p className="mb-2 text-xs text-muted sm:hidden">{item.period}</p>
                      <ul className="space-y-2">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-white/80">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {bullet}
                        </li>
                      ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
