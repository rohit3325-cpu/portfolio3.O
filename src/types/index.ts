export type ProjectCategory = "AI Product" | "Full Stack" | "E-commerce";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  flagship?: boolean;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  impact: string[];
  links: {
    github?: string;
    live?: string;
  };
  mockup: "analyzer" | "voice" | "blog" | "commerce";
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: { name: string; icon: string }[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  context: string;
  period: string;
  bullets: string[];
}

export interface TimelineItem {
  phase: string;
  title: string;
  period: string;
  description: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
