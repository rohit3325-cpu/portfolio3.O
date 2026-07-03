"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/types";
import { techIconMap } from "@/lib/tech-icons";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/40"
    >
      <h3 className="font-heading text-lg font-semibold text-white">{category.name}</h3>
      <p className="mt-1.5 text-sm text-muted">{category.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {category.skills.map((skill) => {
          const Icon = techIconMap[skill.icon];
          return (
            <li
              key={skill.name}
              className="flex items-center gap-1.5 rounded-full border border-border bg-bg/60 px-3 py-1.5 text-xs text-white/80 transition-colors group-hover:border-border-hover"
            >
              {Icon && <Icon className="h-3.5 w-3.5 text-accent" />}
              {skill.name}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
