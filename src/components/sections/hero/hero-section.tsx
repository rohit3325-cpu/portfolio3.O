"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, GitBranch } from "lucide-react";
import { profile } from "@/content/profile";
import { scrollToSection } from "@/lib/scroll";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, fadeUp, blurReveal } from "@/lib/motion";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => <VisualPlaceholder />,
});

function VisualPlaceholder() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}

const [headBefore, headEmphasis, headAfter] = splitHeadline(profile.heroHeadline);

function splitHeadline(headline: string): [string, string, string] {
  const marker = "AI-powered software";
  const idx = headline.indexOf(marker);
  if (idx === -1) return [headline, "", ""];
  return [headline.slice(0, idx), marker, headline.slice(idx + marker.length)];
}

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[420px] w-[420px] rounded-full bg-accent/[0.08] blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[480px] w-[480px] rounded-full bg-accent-2/[0.08] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12, 1.0)}
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.h1
            variants={blurReveal}
            className="font-heading text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {headBefore}
            <span className="text-gradient">{headEmphasis}</span>
            {headAfter}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg text-muted">
            {profile.heroSubcopy}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => scrollToSection("#projects")}
              className="bg-white text-bg hover:bg-white/90"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection("#contact")}
              className="border border-border text-white hover:border-border-hover"
            >
              Let&rsquo;s Work Together
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-6 text-xs text-muted">
            <span>{profile.role}</span>
            <span className="h-1 w-1 rounded-full bg-border-hover" />
            <span>{profile.location}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[480px]"
        >
          {reducedMotion ? <VisualPlaceholder /> : <HeroScene />}
          <div className="glass absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs text-muted">
            <GitBranch className="h-3.5 w-3.5 text-accent" />
            Live repository-graph engine — same one behind TraceLens AI
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted sm:flex"
      >
        Scroll
        <span className="h-8 w-px bg-linear-to-b from-muted to-transparent" />
      </motion.button>
    </section>
  );
}
