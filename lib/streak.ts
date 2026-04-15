import type { ContributionDay } from "./github";

export function calcStreaks(days: ContributionDay[]): {
  current: number;
  longest: number;
  totalThisYear: number;
} {
  const sorted = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const totalThisYear = sorted.reduce((s, d) => s + d.contributionCount, 0);

  let longest = 0;
  let run = 0;
  for (const d of sorted) {
    if (d.contributionCount > 0) {
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const reversed = [...sorted].reverse();
  let current = 0;
  let started = false;

  for (const d of reversed) {
    if (d.date > today) continue;
    if (d.contributionCount > 0) {
      started = true;
      current++;
    } else if (started) {
      if (d.date === today) continue;
      break;
    }
  }

  return { current, longest, totalThisYear };
}
