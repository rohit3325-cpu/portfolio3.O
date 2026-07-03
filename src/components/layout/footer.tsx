"use client";

import { Mail, ArrowUp } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { profile } from "@/content/profile";
import { scrollToSection } from "@/lib/scroll";
import { LinkedInGlyph } from "@/components/ui/brand-icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-hover hover:text-white"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-hover hover:text-white"
          >
            <SiGithub className="h-4 w-4" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-hover hover:text-white"
          >
            <LinkedInGlyph className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("#hero")}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/60 hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 text-xs text-muted">
        © {year} {profile.name}. Designed and built from scratch.
      </div>
    </footer>
  );
}
