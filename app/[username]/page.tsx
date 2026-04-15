import { fetchGitHubStats } from "@/lib/github";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ theme?: string; show?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} — gh-window`,
    description: `GitHub stats card for ${username}`,
  };
}

export default async function PreviewPage({ params, searchParams }: Props) {
  const { username } = await params;
  const { theme = "dark", show = "" } = await searchParams;

  let stats;
  try {
    stats = await fetchGitHubStats(username);
  } catch (e) {
    if (e instanceof Error && e.message === "USER_NOT_FOUND") notFound();
    throw e;
  }

  const validTheme = theme === "light" ? "light" : "dark";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://gh-window.vercel.app";
  const cardUrl = `${baseUrl}/api/${username}?theme=${validTheme}${show ? `&show=${show}` : ""}`;

  const isDark = validTheme === "dark";
  const bg = isDark ? "#0d1117" : "#f6f8fa";
  const text = isDark ? "#e6edf3" : "#1f2328";
  const muted = isDark ? "#8b949e" : "#57606a";
  const accent = isDark ? "#4affbd" : "#226655";
  const border = isDark ? "#30363d" : "#d0d7de";
  const codeBg = isDark ? "#161b22" : "#eaeef2";

  const embedMd = `![${username}'s GitHub stats](${cardUrl})`;
  const embedHtml = `<img src="${cardUrl}" alt="${username}'s GitHub stats" />`;

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: bg,
          color: text,
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          boxSizing: "border-box",
          gap: 32,
        }}
      >
        {/* Card preview */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cardUrl}
          alt={`${username}'s github stats`}
          style={{ maxWidth: "100%", borderRadius: 16 }}
        />

        {/* User info */}
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            {stats.name}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: muted }}>
            @{stats.username}
          </p>
        </div>

        {/* Theme toggle */}
        <div style={{ display: "flex", gap: 8 }}>
          <a
            href={`/${username}?theme=dark`}
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              border: `1px solid ${border}`,
              color: validTheme === "dark" ? accent : muted,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: validTheme === "dark" ? 700 : 400,
            }}
          >
            Dark
          </a>
          <a
            href={`/${username}?theme=light`}
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              border: `1px solid ${border}`,
              color: validTheme === "light" ? accent : muted,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: validTheme === "light" ? 700 : 400,
            }}
          >
            Light
          </a>
        </div>

        {/* Embed codes */}
        <div
          style={{
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[
            { label: "Markdown", code: embedMd },
            { label: "HTML", code: embedHtml },
          ].map(({ label, code }) => (
            <div key={label}>
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: 12,
                  color: muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </p>
              <div
                style={{
                  backgroundColor: codeBg,
                  border: `1px solid ${border}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 12,
                  fontFamily: "monospace",
                  overflowX: "auto",
                  wordBreak: "break-all",
                  color: text,
                }}
              >
                {code}
              </div>
            </div>
          ))}
        </div>

        <a
          href="/"
          style={{
            fontSize: 13,
            color: muted,
            textDecoration: "none",
          }}
        >
          ← gh-window
        </a>
      </body>
    </html>
  );
}
