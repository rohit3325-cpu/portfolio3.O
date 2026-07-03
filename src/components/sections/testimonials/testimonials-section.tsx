"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, viewportOnce } from "@/lib/motion";

const PLACEHOLDERS = [
  "First client testimonial — reserved for the next collaboration that ships.",
  "This space is earned, not filled. Check back soon.",
  "Mentor and founder feedback will land here as new work goes live.",
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="The proof is still being written."
          description="Every project above shipped to real users — the words from the people behind them are next."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PLACEHOLDERS.map((text, i) => (
            <motion.div
              key={text}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-dashed border-border bg-card/40 p-6"
            >
              <Quote className="h-5 w-5 text-accent/50" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted italic">{text}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-linear-to-br from-white/10 to-white/5" />
                <div className="space-y-1">
                  <span className="block h-2 w-20 rounded-full bg-white/8" />
                  <span className="block h-2 w-14 rounded-full bg-white/6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
