"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Command, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { scrollToSection } from "@/lib/scroll";
import { openCommandPalette } from "@/lib/command-palette-bus";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function handleNavClick(href: string) {
    setOpen(false);
    scrollToSection(href);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6",
          scrolled ? "glass mx-4 py-2.5 sm:mx-auto" : "border border-transparent bg-transparent py-1.5"
        )}
      >
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          className="group flex items-center gap-2 font-heading text-lg font-semibold tracking-tight"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-sm transition-colors group-hover:border-accent/60">
            {profile.initials}
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-white",
                active === link.href && "text-white"
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={openCommandPalette}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-hover hover:text-white"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>
          <MagneticButton
            as="a"
            href={profile.resumeHref}
            className="border border-border bg-white text-bg hover:bg-white/90"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open ? "true" : "false"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-4 mt-2 flex flex-col rounded-2xl p-4 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNavClick(link.href)}
                className="rounded-lg px-3 py-3 text-left text-sm font-medium text-muted hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href={profile.resumeHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-bg"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
