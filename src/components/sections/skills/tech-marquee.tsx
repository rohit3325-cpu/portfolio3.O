import { skillCategories } from "@/content/skills";
import { techIconMap } from "@/lib/tech-icons";
import type { SkillCategory } from "@/types";

type Skill = SkillCategory["skills"][number];

const ALL_SKILLS = skillCategories.flatMap((c) => c.skills);
const MID = Math.ceil(ALL_SKILLS.length / 2);
const ROW_1 = ALL_SKILLS.slice(0, MID);
const ROW_2 = ALL_SKILLS.slice(MID);

function MarqueeRow({ items, reverse }: { items: Skill[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-3 animate-marquee hover:[animation-play-state:paused] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {doubled.map((skill, i) => {
          const Icon = techIconMap[skill.icon];
          return (
            <span
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-white/80"
            >
              {Icon && <Icon className="h-3.5 w-3.5 text-accent" />}
              {skill.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="space-y-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <MarqueeRow items={ROW_1} />
      <MarqueeRow items={ROW_2} reverse />
    </div>
  );
}
