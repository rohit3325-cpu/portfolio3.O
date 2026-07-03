import { profile } from "@/content/profile";
import { flagshipProject, projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { skillCategories } from "@/content/skills";

interface AssistantEntry {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
}

export const assistantEntries: AssistantEntry[] = [
  {
    id: "tracelens",
    question: "What is TraceLens AI?",
    keywords: ["tracelens", "flagship", "trace", "lens"],
    answer: `${flagshipProject.tagline} ${flagshipProject.solution}`,
  },
  {
    id: "stack",
    question: "What's your tech stack?",
    keywords: ["stack", "tech", "technologies", "tools", "languages"],
    answer: `Day to day I work across ${skillCategories
      .map((c) => c.name)
      .join(", ")}. The short version: React/Next.js and TypeScript on the frontend, Node.js and FastAPI on the backend, and OpenAI/LangChain/RAG when a product calls for AI. Full breakdown is in the Skills section above.`,
  },
  {
    id: "looking-for",
    question: "What are you looking for right now?",
    keywords: ["looking", "available", "hire", "opportunity", "internship", "job"],
    answer: `${profile.availability}. I'm most interested in roles or projects where I can own product surface area end-to-end — not just implement tickets.`,
  },
  {
    id: "hire",
    question: "How can I get in touch?",
    keywords: ["contact", "email", "reach", "hire", "talk"],
    answer: `Fastest way is email at ${profile.email} — ${profile.responseTime} You can also find the contact buttons in the section below: Email, LinkedIn, GitHub, and a downloadable résumé.`,
  },
  {
    id: "impact",
    question: "What's your most impactful project?",
    keywords: ["impact", "impressive", "best", "proud", "funding"],
    answer: `Two answers: TraceLens AI is the most technically ambitious — it's the flagship product I'm building right now. Vakta AI is the most validated — it secured ₹50K in seed funding as a voice AI and transcription SaaS.`,
  },
  {
    id: "experience",
    question: "Tell me about your experience.",
    keywords: ["experience", "background", "career", "work history"],
    answer: `${experience[0].role} since ${experience[0].period.split(" — ")[0]}, with ${experience[0].bullets[1]?.toLowerCase()}. Before that: an internship that shipped features used by 2,000+ daily active users, and open-source work with 20+ merged pull requests.`,
  },
  {
    id: "projects",
    question: "What else have you built?",
    keywords: ["projects", "built", "portfolio", "shipped"],
    answer: `${projects.length} production projects are featured here, spanning AI products, full-stack platforms, and e-commerce. Scroll to the Projects section to see problem, solution, and impact for each one.`,
  },
];

const fallback =
  "I don't have a scripted answer for that one yet. Try one of the suggested questions, or email Rohit directly — he reads every message.";

export function findAssistantAnswer(query: string): string {
  const normalized = query.toLowerCase();
  let best: { entry: AssistantEntry; score: number } | null = null;

  for (const entry of assistantEntries) {
    const score = entry.keywords.reduce(
      (acc, kw) => (normalized.includes(kw) ? acc + 1 : acc),
      0
    );
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best ? best.entry.answer : fallback;
}
