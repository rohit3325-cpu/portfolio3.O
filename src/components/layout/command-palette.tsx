"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import {
  Search,
  User,
  Layers,
  FolderGit2,
  Briefcase,
  Mail,
  FileDown,
  ArrowUp,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { profile } from "@/content/profile";
import { scrollToSection } from "@/lib/scroll";
import { onCommandPaletteOpenRequest } from "@/lib/command-palette-bus";
import { LinkedInGlyph } from "@/components/ui/brand-icons";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => onCommandPaletteOpenRequest(() => setOpen(true)), []);

  function go(href: string) {
    setOpen(false);
    scrollToSection(href);
  }

  function openLink(href: string) {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 900);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      label="Command Menu"
      overlayClassName="fixed inset-0 z-100 bg-bg/70 backdrop-blur-sm"
      contentClassName="glass fixed top-[18%] left-1/2 z-100 w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="h-4 w-4 shrink-0 text-muted" />
        <CommandInput
          autoFocus
          placeholder="Jump to a section or take an action…"
          className="w-full bg-transparent py-4 text-sm text-white placeholder:text-muted focus:outline-none"
        />
      </div>
      <CommandList className="max-h-[60vh] overflow-y-auto p-2">
        <CommandEmpty className="px-3 py-6 text-center text-sm text-muted">
          No results found.
        </CommandEmpty>

        <CommandGroup heading="Navigate" className="px-1 py-1 text-xs font-medium text-muted **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-2">
          <PaletteItem icon={User} label="About" onSelect={() => go("#about")} />
          <PaletteItem icon={Layers} label="Skills" onSelect={() => go("#skills")} />
          <PaletteItem icon={FolderGit2} label="Projects" onSelect={() => go("#projects")} />
          <PaletteItem icon={Briefcase} label="Experience" onSelect={() => go("#experience")} />
          <PaletteItem icon={Mail} label="Contact" onSelect={() => go("#contact")} />
          <PaletteItem icon={ArrowUp} label="Back to top" onSelect={() => go("#hero")} />
        </CommandGroup>

        <CommandSeparator className="my-1 h-px bg-border" />

        <CommandGroup heading="Connect" className="px-1 py-1 text-xs font-medium text-muted **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-2">
          <PaletteItem
            icon={copied ? Check : Copy}
            label={copied ? "Email copied" : "Copy email address"}
            onSelect={copyEmail}
          />
          <PaletteItem icon={SiGithub} label="Open GitHub" onSelect={() => openLink(profile.social.github)} />
          <PaletteItem icon={LinkedInGlyph} label="Open LinkedIn" onSelect={() => openLink(profile.social.linkedin)} />
          <PaletteItem icon={FileDown} label="Download résumé" onSelect={() => openLink(profile.resumeHref)} />
        </CommandGroup>

        <CommandSeparator className="my-1 h-px bg-border" />

        <CommandGroup heading="Fun" className="px-1 py-1 text-xs font-medium text-muted **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-2">
          <PaletteItem
            icon={Sparkles}
            label="Surprise me"
            onSelect={() => {
              setOpen(false);
              window.dispatchEvent(new Event("easter-egg:trigger"));
            }}
          />
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

function PaletteItem({
  icon: Icon,
  label,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onSelect: () => void;
}) {
  return (
    <CommandItem
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/90 data-[selected=true]:bg-white/6"
    >
      <Icon className="h-4 w-4 text-muted" />
      {label}
    </CommandItem>
  );
}
