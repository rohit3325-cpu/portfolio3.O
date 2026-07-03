import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "tracelens-ai",
    name: "TraceLens AI",
    category: "AI Product",
    flagship: true,
    tagline: "Understand any codebase in minutes, not days.",
    problem:
      "Onboarding onto an unfamiliar repository is one of the slowest parts of software work. Engineers lose days cloning, grepping, and reading code just to build a mental model of how a system fits together — before they can ship a single line.",
    solution:
      "TraceLens AI turns a GitHub URL into an instant, navigable understanding of the codebase. Paste a repo link and the platform analyzes structure, generates a plain-language overview, scores repository health, and lets you ask questions that are answered directly from the actual source — not generic guesses.",
    stack: ["Next.js", "TypeScript", "OpenAI", "Vercel", "GitHub API"],
    features: [
      "Instant repository analysis — paste a URL, get a structural breakdown in seconds",
      "AI-generated overview: project type, tech stack, core workflows, health score",
      "Interactive file explorer with AI-written summaries per file",
      "Auto-generated architecture diagrams showing how components connect",
      "Repository chat grounded in real code, not generic LLM answers",
      "Persistent workspaces — resume any analyzed repo where you left off",
    ],
    impact: [
      "Tiered product live in production: Free, Pro (₹999/mo), Team (₹2,999/mo)",
      "Replaces hours of manual onboarding with a single pasted link",
      "Built solo end-to-end: product, design, and infrastructure",
    ],
    links: {
      github: "https://github.com/rohit3325-cpu/tracelens-ai",
      live: "https://tracelensai-v1.vercel.app",
    },
    mockup: "analyzer",
  },
  {
    slug: "vakta-ai",
    name: "Vakta AI",
    category: "AI Product",
    tagline: "Voice-first AI for transcription and live Q&A.",
    problem:
      "Teams capture huge amounts of spoken information — meetings, lectures, interviews — that's expensive to transcribe accurately and even harder to query afterward, especially across languages.",
    solution:
      "Vakta AI is a voice assistant and transcription SaaS that converts speech to text in real time and lets users ask follow-up questions directly against the transcript, with native multi-language support.",
    stack: ["Next.js", "OpenAI Whisper", "FastAPI", "MongoDB"],
    features: [
      "Real-time speech-to-text powered by Whisper ASR",
      "Intelligent Q&A over transcripts using GPT-4",
      "Multi-language support out of the box",
      "FastAPI service layer for low-latency inference",
    ],
    impact: ["Secured ₹50K in seed funding to develop the product further"],
    links: {
      github: "https://github.com/rohit3325-cpu/vakta.ai",
      live: "https://vakta-ai.vercel.app",
    },
    mockup: "voice",
  },
  {
    slug: "blog-tech",
    name: "Blog-Tech",
    category: "Full Stack",
    tagline: "A writing platform built for developers.",
    problem:
      "Most blogging platforms either compromise on code presentation or bury writers in unnecessary complexity, making it harder than it should be to publish clean, technical content.",
    solution:
      "Blog-Tech is a developer-focused publishing platform with a rich markdown editor, accurate syntax highlighting, and AI-assisted writing suggestions — built for a fast, distraction-free reading and writing experience.",
    stack: ["Next.js", "Node.js", "MongoDB", "OpenAI", "Tailwind CSS"],
    features: [
      "Rich markdown editor with live preview",
      "Syntax highlighting tuned for technical writing",
      "AI-assisted suggestions while drafting",
      "Clean, fast reading experience on every device",
    ],
    impact: ["Deployed as a fully working full-stack reference product"],
    links: {
      github: "https://github.com/rohit3325-cpu/Blog-Tech",
      live: "https://blog-tech-ttnu.onrender.com",
    },
    mockup: "blog",
  },
  {
    slug: "shoply",
    name: "Shoply",
    category: "E-commerce",
    tagline: "Commerce infrastructure tuned for conversion.",
    problem:
      "E-commerce storefronts often trade off performance for features — slow product discovery, generic recommendations, and inventory drift between storefront and warehouse all cost real revenue.",
    solution:
      "Shoply is a high-performance e-commerce platform with AI-driven product recommendations, real-time inventory management, and a Stripe-powered checkout, built with conversion as a first-class metric.",
    stack: ["React", "Express", "MySQL", "Stripe", "Redis"],
    features: [
      "AI-powered product recommendations",
      "Real-time inventory sync across storefront and backend",
      "Stripe-based checkout and payments",
      "Redis caching for low-latency product browsing",
    ],
    impact: ["40%+ conversion optimization over baseline storefront flow"],
    links: {},
    mockup: "commerce",
  },
];

export const flagshipProject = projects.find((p) => p.flagship)!;
export const otherProjects = projects.filter((p) => !p.flagship);
