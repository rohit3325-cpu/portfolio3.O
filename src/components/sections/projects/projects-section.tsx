"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/content/projects";
import type { ProjectCategory } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectFilter } from "./project-filter";
import { FlagshipProject } from "./flagship-project";
import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const visible = useMemo(
    () => projects.filter((p) => filter === "All" || p.category === filter),
    [filter]
  );

  return (
    <section id="projects" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Products, not just repositories."
            description="Every project below shipped to real users — not a tutorial clone."
          />
          <ProjectFilter active={filter} onChange={setFilter} />
        </div>

        <div className="mt-14 space-y-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) =>
              project.flagship ? (
                <motion.div key={project.slug} layout exit={{ opacity: 0, scale: 0.98 }}>
                  <FlagshipProject project={project} />
                </motion.div>
              ) : (
                <motion.div key={project.slug} layout exit={{ opacity: 0, scale: 0.98 }}>
                  <ProjectCard project={project} index={i} />
                </motion.div>
              )
            )}
          </AnimatePresence>

          {visible.length === 0 && (
            <p className="py-16 text-center text-sm text-muted">
              No projects in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
