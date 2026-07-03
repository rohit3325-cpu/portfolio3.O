import { SectionHeading } from "@/components/ui/section-heading";
import { ExperienceTimeline } from "./experience-timeline";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where the work actually happened."
          description="Click a role to expand what shipped."
        />

        <div className="mt-14">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  );
}
