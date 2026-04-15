import type { GitHubStats } from "./github";
import type { ReactNode } from "react";

// Satori-compatible JSX — inline styles only, flex layout only

export type Theme = "dark" | "light";

interface ThemeColors {
  bg: string;
  border: string;
  barBg: string;
  accent: string;
  text: string;
  muted: string;
  chipBorder: string;
  urlBg: string;
}

const themes: Record<Theme, ThemeColors> = {
  dark: {
    bg: "#0d1117",
    border: "#30363d",
    barBg: "#161b22",
    accent: "#4affbd",
    text: "#e6edf3",
    muted: "#8b949e",
    chipBorder: "#30363d",
    urlBg: "#21262d",
  },
  light: {
    bg: "#ffffff",
    border: "#d0d7de",
    barBg: "#f6f8fa",
    accent: "#226655",
    text: "#1f2328",
    muted: "#57606a",
    chipBorder: "#d0d7de",
    urlBg: "#eaeef2",
  },
};

function Dot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );
}

function StatBlock({
  value,
  label,
  c,
}: {
  value: string | number;
  label: string;
  c: ThemeColors;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        gap: 4,
      }}
    >
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: c.text,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 11,
          color: c.accent,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          opacity: 0.85,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider({ c }: { c: ThemeColors }) {
  return (
    <div
      style={{
        width: "100%",
        height: 1,
        backgroundColor: c.border,
      }}
    />
  );
}

export function renderCard(
  stats: GitHubStats,
  theme: Theme = "dark",
  show: string[]
): ReactNode {
  const c = themes[theme];
  const showAll = show.length === 0;
  const want = (key: string) => showAll || show.includes(key);

  const showStreak = want("streak") && stats.streakAvailable;
  const showLangs = want("langs") && stats.topLanguages.length > 0;
  const showCore =
    want("repos") || want("stars") || want("followers");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 400,
        border: `1px solid ${c.border}`,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: c.bg,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          backgroundColor: c.barBg,
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        {/* Traffic light dots */}
        <div style={{ display: "flex", gap: 6 }}>
          <Dot color="#ff5f57" />
          <Dot color="#febc2e" />
          <Dot color="#28c840" />
        </div>
        {/* URL bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: c.urlBg,
            borderRadius: 999,
            padding: "4px 12px",
            fontSize: 12,
            color: c.muted,
          }}
        >
          github.com/{stats.username}
        </div>
      </div>

      {/* Core stats */}
      {showCore && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "18px 12px 14px",
            }}
          >
            {want("repos") && (
              <StatBlock value={stats.repos} label="Repos" c={c} />
            )}
            {want("stars") && (
              <StatBlock value={stats.stars} label="Stars" c={c} />
            )}
            {want("followers") && (
              <StatBlock value={stats.followers} label="Followers" c={c} />
            )}
          </div>
        </>
      )}

      {/* Streak row */}
      {showStreak && (
        <>
          <Divider c={c} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 12px",
            }}
          >
            <StatBlock
              value={`${stats.streak.current}d`}
              label="Streak"
              c={c}
            />
            <StatBlock
              value={`${stats.streak.longest}d`}
              label="Best"
              c={c}
            />
            <StatBlock
              value={stats.streak.totalThisYear}
              label="This Year"
              c={c}
            />
          </div>
        </>
      )}

      {/* Languages */}
      {showLangs && (
        <>
          <Divider c={c} />
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "10px 14px 14px",
              flexWrap: "wrap",
            }}
          >
            {stats.topLanguages.map((lang) => (
              <div
                key={lang}
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: `1px solid ${c.chipBorder}`,
                  color: c.accent,
                  fontWeight: 600,
                }}
              >
                {lang}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
