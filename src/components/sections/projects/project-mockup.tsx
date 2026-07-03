"use client";

import { motion } from "framer-motion";
import { Sparkles, FileCode2, Folder } from "lucide-react";
import type { Project } from "@/types";

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-border bg-bg">
      <div className="flex items-center gap-1.5 border-b border-border bg-card px-3.5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <div className="ml-3 h-5 flex-1 rounded-full bg-white/5" />
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Skeleton({ width = "w-full", tone = "bg-white/8" }: { width?: string; tone?: string }) {
  return <div className={`h-2.5 rounded-full ${tone} ${width}`} />;
}

function AnalyzerMockup({ large }: { large?: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_1.6fr] gap-4">
      <div className="space-y-2 rounded-lg border border-border bg-card p-3">
        <div className="mb-2 flex items-center gap-1.5 text-muted">
          <Folder className="h-3 w-3" />
          <span className="text-[10px] tracking-wide uppercase">Repository</span>
        </div>
        {["w-4/5", "w-3/5", "w-full", "w-2/3", "w-3/4"].map((w, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <FileCode2 className="h-3 w-3 shrink-0 text-accent/70" />
            <Skeleton width={w} tone="bg-white/10" />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <svg viewBox="0 0 36 36" className="h-10 w-10 shrink-0">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <motion.circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="94 100"
              pathLength="100"
              transform="rotate(-90 18 18)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="flex-1 space-y-1.5">
            <Skeleton width="w-2/3" />
            <Skeleton width="w-1/3" tone="bg-white/6" />
          </div>
          <span className="font-heading text-sm font-semibold text-white">94</span>
        </div>
        <div className={`space-y-2 rounded-lg border border-border bg-card p-3 ${large ? "" : "hidden sm:block"}`}>
          <Skeleton width="w-full" />
          <Skeleton width="w-5/6" />
          <Skeleton width="w-2/3" />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs text-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent-2" />
          Ask anything about this repository…
        </div>
      </div>
    </div>
  );
}

function VoiceMockup() {
  const heights = [0.3, 0.7, 0.45, 0.9, 0.5, 0.8, 0.35, 0.6, 0.4, 0.75, 0.5, 0.3];
  return (
    <div className="space-y-4">
      <div className="flex h-20 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-4">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-linear-to-t from-accent to-accent-2"
            style={{ height: `${h * 100}%` }}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="space-y-2">
        <div className="max-w-[70%] space-y-1.5 rounded-xl rounded-tl-sm bg-white/6 p-3">
          <Skeleton width="w-full" />
          <Skeleton width="w-2/3" />
        </div>
        <div className="ml-auto max-w-[60%] space-y-1.5 rounded-xl rounded-tr-sm bg-accent/15 p-3">
          <Skeleton width="w-full" tone="bg-accent/40" />
        </div>
      </div>
    </div>
  );
}

function BlogMockup() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-3.5 w-3/4 rounded-full bg-white/12" />
        <Skeleton width="w-full" />
        <Skeleton width="w-5/6" />
        <Skeleton width="w-2/3" />
      </div>
      <div className="space-y-1.5 rounded-lg border border-border bg-card p-3">
        <div className="mb-1.5 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent/60" />
          <span className="h-2 w-2 rounded-full bg-accent-2/60" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <Skeleton width="w-4/5" tone="bg-white/10" />
        <Skeleton width="w-3/5" tone="bg-white/10" />
        <Skeleton width="w-2/3" tone="bg-white/10" />
      </div>
    </div>
  );
}

function CommerceMockup() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2 rounded-lg border border-border bg-card p-2.5">
          <div className="aspect-square w-full rounded-md bg-linear-to-br from-accent/20 to-accent-2/20" />
          <Skeleton width="w-full" />
          <div className="h-2.5 w-1/2 rounded-full bg-accent/40" />
        </div>
      ))}
    </div>
  );
}

const MOCKUPS: Record<Project["mockup"], (props: { large?: boolean }) => React.ReactElement> = {
  analyzer: AnalyzerMockup,
  voice: VoiceMockup,
  blog: BlogMockup,
  commerce: CommerceMockup,
};

export function ProjectMockup({ type, large }: { type: Project["mockup"]; large?: boolean }) {
  const Mockup = MOCKUPS[type];
  return (
    <BrowserFrame>
      <Mockup large={large} />
    </BrowserFrame>
  );
}
