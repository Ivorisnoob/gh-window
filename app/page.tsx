import type { Metadata } from "next";
import SearchForm from "./SearchForm";

export const metadata: Metadata = {
  title: "gh-window — GitHub Stats Cards",
  description:
    "Beautiful browser-window style GitHub stats cards. Embed anywhere — READMEs, portfolios, websites.",
};

export default function LandingPage() {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://gh-window.vercel.app";

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#0d1117",
          color: "#e6edf3",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          boxSizing: "border-box",
          gap: 48,
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", maxWidth: 560 }}>
          <h1
            style={{
              margin: "0 0 12px",
              fontSize: 40,
              fontWeight: 800,
              background: "linear-gradient(135deg, #4affbd, #4d8aff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            gh-window
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: "#8b949e",
              lineHeight: 1.6,
            }}
          >
            Beautiful browser-window style GitHub stats cards.
            <br />
            Embed anywhere — READMEs, portfolios, websites.
          </p>
        </div>

        {/* Demo card */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/api/ivorisnoob`}
          alt="demo card"
          style={{ maxWidth: "100%", borderRadius: 16 }}
        />

        {/* Try it */}
        <SearchForm />

        {/* Usage */}
        <div
          style={{
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "#8b949e",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Usage
          </p>
          {[
            `![GitHub Stats](${BASE}/api/YOUR_USERNAME)`,
            `![GitHub Stats](${BASE}/api/YOUR_USERNAME?theme=light)`,
            `![GitHub Stats](${BASE}/api/YOUR_USERNAME?show=repos,stars,streak)`,
          ].map((snippet) => (
            <div
              key={snippet}
              style={{
                backgroundColor: "#161b22",
                border: "1px solid #30363d",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 12,
                fontFamily: "monospace",
                color: "#e6edf3",
                wordBreak: "break-all",
              }}
            >
              {snippet}
            </div>
          ))}
        </div>

        <p style={{ margin: 0, fontSize: 13, color: "#8b949e" }}>
          Made with ♥ by{" "}
          <a
            href="https://ivorisnoob.lol"
            style={{ color: "#4affbd", textDecoration: "none" }}
          >
            ivorisnoob
          </a>
        </p>
      </body>
    </html>
  );
}
