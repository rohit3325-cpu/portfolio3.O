"use client";

import { motion } from "framer-motion";
import { Mail, FileDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { profile } from "@/content/profile";
import { LinkedInGlyph } from "@/components/ui/brand-icons";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { fadeUp, blurReveal, viewportOnce } from "@/lib/motion";

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12 sm:py-24"
        >
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

          <span className="relative text-xs font-medium tracking-[0.2em] text-accent uppercase">
            Contact
          </span>

          <motion.h2
            variants={blurReveal}
            className="relative mt-4 font-heading text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Let&rsquo;s build something exceptional together.
          </motion.h2>

          <p className="relative mx-auto mt-5 max-w-xl text-muted">
            {profile.availability}. {profile.responseTime}
          </p>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              as="a"
              href={`mailto:${profile.email}`}
              className="bg-white text-bg hover:bg-white/90"
            >
              <Mail className="h-4 w-4" />
              Email
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border text-white hover:border-border-hover"
            >
              <LinkedInGlyph className="h-4 w-4" />
              LinkedIn
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border text-white hover:border-border-hover"
            >
              <SiGithub className="h-4 w-4" />
              GitHub
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border text-white hover:border-border-hover"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
