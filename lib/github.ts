export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface GitHubStats {
  username: string;
  name: string;
  avatarUrl: string;
  repos: number;
  stars: number;
  followers: number;
  topLanguages: string[];
  streak: {
    current: number;
    longest: number;
    totalThisYear: number;
  };
  streakAvailable: boolean;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "gh-window",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
      { headers, next: { revalidate: 3600 } }
    ),
  ]);

  if (userRes.status === 404) throw new Error("USER_NOT_FOUND");
  if (!userRes.ok || !reposRes.ok) throw new Error("GITHUB_API_ERROR");

  const user = await userRes.json();
  const repos = await reposRes.json();

  const stars = (repos as { stargazers_count: number; fork: boolean }[]).reduce(
    (sum, r) => sum + (r.fork ? 0 : r.stargazers_count),
    0
  );

  const langCounts: Record<string, number> = {};
  (repos as { language: string | null; fork: boolean }[]).forEach((r) => {
    if (r.language && !r.fork) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  });
  const topLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([lang]) => lang);

  // GraphQL for streaks (requires token)
  let streakAvailable = false;
  let streak = { current: 0, longest: 0, totalThisYear: 0 };

  if (process.env.GITHUB_TOKEN) {
    try {
      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays { date contributionCount }
                  }
                }
              }
            }
          }`,
        }),
        next: { revalidate: 3600 },
      });

      if (gqlRes.ok) {
        const gql = await gqlRes.json();
        const weeks: { contributionDays: ContributionDay[] }[] =
          gql?.data?.user?.contributionsCollection?.contributionCalendar
            ?.weeks ?? [];
        const allDays = weeks.flatMap((w) => w.contributionDays);

        if (allDays.length > 0) {
          const { calcStreaks } = await import("./streak");
          streak = calcStreaks(allDays);
          streakAvailable = true;
        }
      }
    } catch {
      // streak stays default
    }
  }

  return {
    username,
    name: user.name || username,
    avatarUrl: user.avatar_url,
    repos: user.public_repos,
    stars,
    followers: user.followers,
    topLanguages,
    streak,
    streakAvailable,
  };
}
