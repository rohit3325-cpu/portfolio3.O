"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { profile } from "@/content/profile";

const TRIGGER_WORD = "tracelens";

const LINES = [
  "> analyzing portfolio.tsx",
  "> stack: Next.js · TypeScript · Tailwind · Framer Motion · GSAP · Three.js",
  "> easter eggs found: 1",
  "> curiosity score: 100/100",
  `> you read the source. let's talk → ${profile.email}`,
];

export function EasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(
      "%cLooking under the hood?",
      "color:#3B82F6;font-size:14px;font-weight:600;"
    );
    console.log(
      `%cType "${TRIGGER_WORD}" anywhere on this page, or email ${profile.email} — either way, I'd like to hear from you.`,
      "color:#A1A1AA;font-size:12px;"
    );
  }, []);

  useEffect(() => {
    let buffer = "";
    function handleKeydown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-TRIGGER_WORD.length);
      if (buffer === TRIGGER_WORD) setOpen(true);
    }
    function handleTrigger() {
      setOpen(true);
    }
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("easter-egg:trigger", handleTrigger);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("easter-egg:trigger", handleTrigger);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-bg/80 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Easter egg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md rounded-2xl p-6 font-mono text-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs text-muted">~/rohit-raj/portfolio</span>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-muted hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {LINES.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 * i }}
                  className="text-accent-2 last:text-white"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
