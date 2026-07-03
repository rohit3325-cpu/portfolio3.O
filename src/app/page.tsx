import { HeroSection } from "@/components/sections/hero/hero-section";
import { AboutSection } from "@/components/sections/about/about-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";
import { ProjectsSection } from "@/components/sections/projects/projects-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { AchievementsSection } from "@/components/sections/achievements/achievements-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { ContactSection } from "@/components/sections/contact/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
