import { fetchGitHubStats } from "@/lib/github";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ThemeToggle from "../ThemeToggle";
import ColorCustomizer from "../ColorCustomizer";

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ theme?: string; show?: string; accent?: string }>;
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
  const { theme = "dark", show = "", accent = "f97316" } = await searchParams;

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

  const cardUrl = [
    `${baseUrl}/api/${username}`,
    `?theme=${validTheme}`,
    `&accent=${accent}`,
    show ? `&show=${show}` : "",
  ].join("");

  const embedMd   = `![${username}'s GitHub stats](${cardUrl})`;
  const embedHtml = `<img src="${cardUrl}" alt="${username}'s GitHub stats" />`;

  return (
    <>
      <div className="bg-mesh" aria-hidden="true" />
      <ThemeToggle />

      <main className="page">
        {/* Card preview */}
        <div className="card fade-up">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cardUrl}
            alt={`${username}'s github stats`}
            style={{ display: "block" }}
          />
        </div>

        {/* User info */}
        <div
          className="fade-up fade-up-d1"
          style={{ textAlign: "center", lineHeight: 1.3 }}
        >
          <p
            className="display"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", marginBottom: 4 }}
          >
            {stats.name}
          </p>
          <p className="lead" style={{ fontSize: "0.9rem" }}>
            @{stats.username}
          </p>
        </div>

        {/* Theme toggle */}
        <div className="toggle-group fade-up fade-up-d2">
          <a
            href={`/${username}?theme=dark&accent=${accent}`}
            className={`toggle${validTheme === "dark" ? " active" : ""}`}
          >
            Dark
          </a>
          <a
            href={`/${username}?theme=light&accent=${accent}`}
            className={`toggle${validTheme === "light" ? " active" : ""}`}
          >
            Light
          </a>
        </div>

        {/* Color customizer */}
        <div className="fade-up fade-up-d2">
          <ColorCustomizer
            username={username}
            theme={validTheme}
            show={show}
            currentAccent={accent}
          />
        </div>

        {/* Embed codes */}
        <div
          className="fade-up fade-up-d3"
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
            { label: "HTML",     code: embedHtml },
          ].map(({ label, code }) => (
            <div key={label}>
              <p className="label" style={{ marginBottom: 8 }}>
                {label}
              </p>
              <div className="code-block">{code}</div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <a
          href="/"
          className="fade-up fade-up-d4 lead"
          style={{
            fontSize: "0.85rem",
            color: "var(--accent)",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ← gh-window
        </a>
      </main>
    </>
  );
}
