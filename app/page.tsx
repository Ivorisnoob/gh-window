import type { Metadata } from "next";
import SearchForm from "./SearchForm";

export const metadata: Metadata = {
  title: "gh-window — GitHub Stats Cards",
  description:
    "Beautiful browser-window style GitHub stats cards. Embed anywhere — READMEs, portfolios, websites.",
};

export default function LandingPage() {
  const BASE =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://gh-window.vercel.app";

  return (
    <>
      <div className="bg-mesh" aria-hidden="true" />

      <main className="page">
        {/* Hero */}
        <section
          style={{ textAlign: "center", maxWidth: 560 }}
          className="fade-up"
        >
          <div className="chip fade-up" style={{ marginBottom: 20 }}>
            <span>🪟</span> Open Source
          </div>
          <h1 className="display" style={{ marginBottom: 16 }}>
            Your GitHub stats,<br />
            <em>beautifully windowed.</em>
          </h1>
          <p className="lead">
            Browser-window style stat cards for GitHub profiles.
            <br />
            Drop them in READMEs, portfolios, anywhere.
          </p>
        </section>

        {/* Demo card */}
        <div className="card fade-up fade-up-d1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/api/ivorisnoob`}
            alt="ivorisnoob's GitHub stats demo card"
            style={{ display: "block" }}
          />
        </div>

        {/* Search */}
        <div
          className="fade-up fade-up-d2"
          style={{ width: "100%", maxWidth: 460 }}
        >
          <p className="label" style={{ marginBottom: 10 }}>
            Try it with your username
          </p>
          <SearchForm />
        </div>

        {/* Usage */}
        <div
          className="fade-up fade-up-d3"
          style={{
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <p className="label">Embed anywhere</p>
          {[
            `![GitHub Stats](${BASE}/api/YOUR_USERNAME)`,
            `![GitHub Stats](${BASE}/api/YOUR_USERNAME?theme=light)`,
            `![GitHub Stats](${BASE}/api/YOUR_USERNAME?show=repos,stars,streak)`,
          ].map((snippet) => (
            <div key={snippet} className="code-block">
              {snippet}
            </div>
          ))}
        </div>

        {/* Footer */}
        <p
          className="fade-up fade-up-d4 lead"
          style={{ fontSize: "0.82rem", textAlign: "center" }}
        >
          Made with ♥ by{" "}
          <a
            href="https://ivorisnoob.lol"
            style={{ color: "var(--accent)", fontWeight: 600 }}
          >
            ivorisnoob
          </a>
        </p>
      </main>
    </>
  );
}
