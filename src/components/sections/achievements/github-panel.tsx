"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FolderGit2, Star, Users } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { ContributionDay } from "@/lib/github";
import { profile } from "@/content/profile";

const LEVEL_CLASSES = ["bg-white/6", "bg-accent/25", "bg-accent/50", "bg-accent/75", "bg-accent"];

interface GithubPanelProps {
  weeks: ContributionDay[][];
  publicRepos: number;
  followers: number;
  totalStars: number;
  contributions: number;
  avatarUrl: string | null;
}

export function GithubPanel({
  weeks,
  publicRepos,
  followers,
  totalStars,
  contributions,
  avatarUrl,
}: GithubPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${profile.name} on GitHub`}
              width={20}
              height={20}
              className="rounded-full"
            />
          ) : (
            <SiGithub className="h-4 w-4" />
          )}
          github.com/{profile.githubUsername}
        </a>

        <div className="flex gap-6 text-xs text-muted">
          <MiniStat icon={FolderGit2} value={publicRepos} label="Repos" />
          <MiniStat icon={Star} value={totalStars} label="Stars" />
          <MiniStat icon={Users} value={followers} label="Followers" />
        </div>
      </div>

      {weeks.length > 0 ? (
        <div
          className="mt-6 overflow-x-auto pb-1"
          role="img"
          aria-label={`GitHub contribution graph, ${contributions} contributions in the last year`}
        >
          <div className="flex gap-0.75" aria-hidden="true">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.75">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week?.[di];
                  return (
                    <motion.div
                      key={di}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(wi * 0.006, 0.4) }}
                      title={day ? `${day.date}` : undefined}
                      className={`h-2.5 w-2.5 rounded-xs ${
                        day ? LEVEL_CLASSES[day.level] : "bg-transparent"
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">Live contribution graph temporarily unavailable.</p>
      )}
    </div>
  );
}

function MiniStat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-accent" />
      <span className="font-medium text-white/85">{value.toLocaleString()}</span>
      {label}
    </span>
  );
}
