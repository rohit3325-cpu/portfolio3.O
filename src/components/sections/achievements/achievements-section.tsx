import { getGithubStats } from "@/lib/github";
import { profile } from "@/content/profile";
import { staticStats } from "@/content/stats";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "./animated-counter";
import { GithubPanel } from "./github-panel";

export async function AchievementsSection() {
  const github = await getGithubStats(profile.githubUsername);
  const liveContributions = github.contributions > 0;
  const contributions = liveContributions ? github.contributions : staticStats.fallbackContributions;

  const stats = [
    { label: "Problems Solved", value: staticStats.problemsSolved, suffix: "+" },
    { label: "GitHub Contributions", value: contributions, suffix: liveContributions ? "" : "+" },
    { label: "Projects Built", value: staticStats.projectsBuilt, suffix: "+" },
    { label: "Technologies Used", value: staticStats.technologiesUsed, suffix: "+" },
  ];

  return (
    <section id="achievements" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Achievements" title="Numbers that took years, not a weekend." />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8"
            >
              <p className="font-heading text-3xl font-semibold text-white sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <GithubPanel
            weeks={github.weeks}
            publicRepos={github.publicRepos}
            followers={github.followers}
            totalStars={github.totalStars}
            contributions={contributions}
            avatarUrl={github.avatarUrl}
          />
        </div>
      </div>
    </section>
  );
}
