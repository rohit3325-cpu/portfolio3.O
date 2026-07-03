"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/types";
import { ProjectMockup } from "./project-mockup";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function FlagshipProject({ project }: { project: Project }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="relative overflow-hidden rounded-3xl border border-accent/25 bg-linear-to-b from-card to-bg p-1"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-2/15 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-10 p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
        <div className="order-2 flex flex-col lg:order-1">
          <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Flagship Project
          </div>

          <h3 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm text-accent-2">{project.tagline}</p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Problem</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/80">{project.problem}</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Solution</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/80">{project.solution}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>

          <ul className="mt-6 space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-white/75">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.impact.map((point) => (
              <span
                key={point}
                className="rounded-lg border border-accent-2/25 bg-accent-2/10 px-3 py-2 text-xs text-white/85"
              >
                {point}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.live && (
              <MagneticButton
                as="a"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-bg hover:bg-white/90"
              >
                Live Demo
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            )}
            {project.links.github && (
              <MagneticButton
                as="a"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border text-white hover:border-border-hover"
              >
                <SiGithub className="h-4 w-4" />
                GitHub
              </MagneticButton>
            )}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-28">
            <ProjectMockup type={project.mockup} large />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
