"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/types";
import { ProjectMockup } from "./project-mockup";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className="grid grid-cols-1 gap-8 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-12"
    >
      <div className={reversed ? "lg:order-2" : ""}>
        <ProjectMockup type={project.mockup} />
      </div>

      <div className={reversed ? "lg:order-1" : ""}>
        <span className="text-xs font-medium tracking-wide text-accent-2 uppercase">
          {project.category}
        </span>
        <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{project.name}</h3>
        <p className="mt-1 text-sm text-muted">{project.tagline}</p>

        <div className="mt-5 space-y-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">Problem</p>
            <p className="mt-1 text-sm leading-relaxed text-white/80">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">Solution</p>
            <p className="mt-1 text-sm leading-relaxed text-white/80">{project.solution}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-bg px-3 py-1 text-xs text-white/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="mt-5 text-xs text-muted">
          <span className="text-white/70">Impact —</span> {project.impact[0]}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-white transition-colors hover:border-border-hover"
            >
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-white transition-colors hover:border-border-hover"
            >
              <SiGithub className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
