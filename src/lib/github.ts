export interface ContributionDay {
  date: string;
  level: number;
}

export interface GithubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  contributions: number;
  weeks: ContributionDay[][];
  avatarUrl: string | null;
}

const FALLBACK: GithubStats = {
  publicRepos: 0,
  followers: 0,
  totalStars: 0,
  contributions: 0,
  weeks: [],
  avatarUrl: null,
};

function parseContributions(html: string): { total: number; weeks: ContributionDay[][] } {
  const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="(\d)"/g;
  const days: ContributionDay[] = [];
  let match: RegExpExecArray | null;

  while ((match = dayRegex.exec(html))) {
    days.push({ date: match[1], level: Number(match[2]) });
  }
  days.sort((a, b) => (a.date < b.date ? -1 : 1));

  const countRegex = /(\d+)\s+contributions?\s+on\s+[A-Za-z]+\s+\d+/g;
  let total = 0;
  let countMatch: RegExpExecArray | null;
  while ((countMatch = countRegex.exec(html))) {
    total += Number(countMatch[1]);
  }

  if (!days.length) return { total, weeks: [] };

  const first = new Date(`${days[0].date}T00:00:00Z`);
  const gridStart = new Date(first);
  gridStart.setUTCDate(first.getUTCDate() - first.getUTCDay());

  const weeks: ContributionDay[][] = [];
  for (const day of days) {
    const date = new Date(`${day.date}T00:00:00Z`);
    const dayOfWeek = date.getUTCDay();
    const weekIndex = Math.round((date.getTime() - gridStart.getTime()) / (7 * 86_400_000));
    if (!weeks[weekIndex]) weeks[weekIndex] = [];
    weeks[weekIndex][dayOfWeek] = day;
  }

  return { total, weeks };
}

export async function getGithubStats(username: string): Promise<GithubStats> {
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }),
      fetch(`https://github.com/users/${username}/contributions`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const user = userRes.ok ? await userRes.json() : null;
    const repos = reposRes.ok ? await reposRes.json() : [];
    const contribHtml = contribRes.ok ? await contribRes.text() : "";

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum: number, repo: { stargazers_count?: number }) => sum + (repo.stargazers_count ?? 0), 0)
      : 0;

    const { total, weeks } = parseContributions(contribHtml);

    return {
      publicRepos: user?.public_repos ?? FALLBACK.publicRepos,
      followers: user?.followers ?? FALLBACK.followers,
      totalStars,
      contributions: total,
      weeks,
      avatarUrl: user?.avatar_url ?? null,
    };
  } catch {
    return FALLBACK;
  }
}
