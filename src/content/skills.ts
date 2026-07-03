import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    description: "Interfaces that feel inevitable, not assembled.",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Framer Motion", icon: "framer" },
      { name: "Shadcn UI", icon: "shadcn" },
      { name: "GSAP", icon: "gsap" },
    ],
  },
  {
    name: "Backend",
    description: "Services built to hold up under real traffic.",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", icon: "rest" },
      { name: "WebSockets", icon: "websocket" },
      { name: "JWT Auth", icon: "jwt" },
      { name: "Microservices", icon: "microservices" },
    ],
  },
  {
    name: "AI",
    description: "AI woven into product flows, not bolted on top.",
    skills: [
      { name: "OpenAI API", icon: "openai" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "LangChain", icon: "langchain" },
      { name: "Whisper ASR", icon: "whisper" },
      { name: "RAG Systems", icon: "rag" },
      { name: "Vector DBs", icon: "vectordb" },
    ],
  },
  {
    name: "Databases",
    description: "Data modeled once, queried with confidence.",
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "Redis", icon: "redis" },
      { name: "Prisma", icon: "prisma" },
    ],
  },
  {
    name: "DevOps",
    description: "Shipping pipelines that don't get in the way.",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "AWS S3", icon: "aws" },
      { name: "Vercel", icon: "vercel" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Linux", icon: "linux" },
    ],
  },
  {
    name: "Tools",
    description: "The daily kit behind every shipped feature.",
    skills: [
      { name: "Git / GitHub", icon: "git" },
      { name: "VS Code", icon: "vscode" },
      { name: "Figma", icon: "figma" },
      { name: "Postman", icon: "postman" },
      { name: "Cursor AI", icon: "cursor" },
    ],
  },
];
