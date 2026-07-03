"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { profile } from "@/content/profile";
import { education } from "@/content/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { JourneyTimeline } from "./journey-timeline";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="About" title="The path here, not just the résumé." />

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg text-muted"
        >
          {profile.bioShort}
        </motion.p>

        <div className="mt-16">
          <JourneyTimeline />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-16 flex flex-wrap gap-3"
        >
          {education.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-muted"
            >
              <GraduationCap className="h-3.5 w-3.5 text-accent-2" />
              <span className="text-white/80">{item.title}</span>
              
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
