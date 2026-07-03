import { skillCategories } from "@/content/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillCard } from "./skill-card";
import { TechMarquee } from "./tech-marquee";

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit shaped by shipping, not certificates."
          description="Every category below has at least one production app behind it."
        />

        <div className="mt-10">
          <TechMarquee />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.name} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
