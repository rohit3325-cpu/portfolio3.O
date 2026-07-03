"use client";

import { motion } from "framer-motion";
import type { ProjectCategory } from "@/types";

const FILTERS: Array<ProjectCategory | "All"> = ["All", "AI Product", "Full Stack", "E-commerce"];

export function ProjectFilter({
  active,
  onChange,
}: {
  active: ProjectCategory | "All";
  onChange: (filter: ProjectCategory | "All") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          aria-pressed={active === filter ? "true" : "false"}
          className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === filter ? "text-bg" : "text-muted hover:text-white"
          }`}
        >
          {active === filter && (
            <motion.span
              layoutId="project-filter-active"
              className="absolute inset-0 rounded-full bg-white"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </button>
      ))}
    </div>
  );
}
