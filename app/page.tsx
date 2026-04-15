import Link from "next/link";
import type { Metadata } from "next";
import SearchForm from "./SearchForm";

export const metadata: Metadata = {
  title: "gh-window — GitHub Stats Cards",
  description:
    "Browser-window style GitHub stats cards for README files, portfolios, and personal sites.",
};

export default function LandingPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://gh-window.vercel.app";

  const embedExamples = [
    `![GitHub Stats](${baseUrl}/api/YOUR_USERNAME)`,
    `![GitHub Stats](${baseUrl}/api/YOUR_USERNAME?theme=light)`,
    `![GitHub Stats](${baseUrl}/api/YOUR_USERNAME?show=repos,stars,streak)`,
  ];

  const quickSteps = [
    {
      title: "Pick a username",
      copy: "Open the preview builder and point the card at any public GitHub account.",
    },
    {
      title: "Tune the output",
      copy: "Adjust theme, accent color, and visible sections until the card fits your README.",
    },
    {
      title: "Paste the embed",
      copy: "Copy the generated Markdown or image URL and drop it into GitHub, a site, or any HTML page.",
    },
  ];

  const recipeCards = [
    {
      label: "Default",
      note: "Balanced, full card for most profiles.",
      code: embedExamples[0],
    },
    {
      label: "Light Theme",
      note: "Best when the surrounding page is already bright.",
      code: embedExamples[1],
    },
    {
      label: "Focused Stats",
      note: "Tighter payload when you only want the headline numbers.",
      code: embedExamples[2],
    },
  ];

  return (
    <>
      <div className="bg-mesh" aria-hidden="true" />

      <main className="page home-page">
        <section className="home-nav fade-up">
          <div className="home-brand">
            <div className="home-brand-mark" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon"
                alt=""
                className="home-brand-icon"
              />
            </div>
            <div>
              <p className="label">gh-window</p>
              <p className="home-brand-copy">
                GitHub stats rendered like a polished browser window.
              </p>
            </div>
          </div>

          <div className="home-nav-actions">
            <Link href="/docs" className="toggle active">
              Docs
            </Link>
            <Link href="/test" className="toggle">
              Test Embeds
            </Link>
          </div>
        </section>

        <section className="home-hero fade-up fade-up-d1">
          <div className="home-copy">
            <a
              href="https://github.com/Ivorisnoob/gh-window"
              target="_blank"
              rel="noreferrer"
              className="chip home-repo-chip"
              style={{ marginBottom: 18 }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                width="14"
                height="14"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.66 7.66 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              ivorisnoob.gh-window
            </a>

            <h1 className="display home-display">
              GitHub stats that feel
              <br />
              <em>placed, not pasted.</em>
            </h1>

            <p className="lead home-lead">
              gh-window turns a raw GitHub profile into a browser-window style
              card you can embed in README files, personal sites, and portfolio
              pages without extra setup.
            </p>

            <div className="home-value-strip">
              <div className="home-value-item">
                <strong>Themeable</strong>
                <span>dark or light output</span>
              </div>
              <div className="home-value-item">
                <strong>Embeddable</strong>
                <span>Markdown and plain HTML</span>
              </div>
              <div className="home-value-item">
                <strong>Tunable</strong>
                <span>accent and stat selection</span>
              </div>
            </div>

            <div className="home-search-panel">
              <div className="home-search-head">
                <div>
                  <p className="label" style={{ marginBottom: 6 }}>
                    Start Here
                  </p>
                  <h2 className="home-panel-title">Preview your card</h2>
                </div>
                <p className="home-panel-hint">
                  Enter a GitHub username to open the live preview builder.
                </p>
              </div>

              <SearchForm />

              <div className="home-example-row">
                {["ivorisnoob", "vercel", "torvalds"].map((user) => (
                  <Link
                    key={user}
                    href={`/${user}`}
                    className="home-example-link"
                  >
                    @{user}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="home-showcase">
            <div className="home-preview-frame">
              <div className="home-preview-caption">
                <span className="label">Live Example</span>
                <span className="home-preview-url">{baseUrl}/api/ivorisnoob</span>
              </div>
              <div className="card home-preview-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${baseUrl}/api/ivorisnoob`}
                  alt="ivorisnoob's GitHub stats demo card"
                  style={{ display: "block" }}
                />
              </div>
            </div>

            <div className="home-mini-grid">
              <div className="home-mini-card">
                <p className="label">What makes it useful</p>
                <p className="home-mini-copy">
                  Designed for first-run clarity: preview, tune, copy, and ship.
                </p>
              </div>
              <div className="home-mini-card">
                <p className="label">Good defaults</p>
                <p className="home-mini-copy">
                  A valid embed works immediately even before customization.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-steps fade-up fade-up-d2">
          <div className="home-section-heading">
            <p className="label" style={{ marginBottom: 8 }}>
              Quick Flow
            </p>
            <h2 className="home-section-title">From username to README in three moves</h2>
          </div>

          <div className="home-step-grid">
            {quickSteps.map((step, index) => (
              <article key={step.title} className="home-step-card">
                <span className="home-step-number">0{index + 1}</span>
                <h3 className="home-step-title">{step.title}</h3>
                <p className="lead home-step-copy">{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-recipes fade-up fade-up-d3">
          <div className="home-section-heading">
            <p className="label" style={{ marginBottom: 8 }}>
              Embed Recipes
            </p>
            <h2 className="home-section-title">Use the production URLs directly</h2>
          </div>

          <div className="home-recipe-grid">
            {recipeCards.map((recipe) => (
              <article key={recipe.label} className="home-recipe-card">
                <div>
                  <p className="label" style={{ marginBottom: 8 }}>
                    {recipe.label}
                  </p>
                  <p className="home-recipe-note">{recipe.note}</p>
                </div>
                <div className="code-block">{recipe.code}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-bottom-bar fade-up fade-up-d4">
          <div className="home-bottom-copy">
            <p className="label" style={{ marginBottom: 6 }}>
              Need More Control
            </p>
            <p className="lead">
              The docs cover supported parameters, deployment notes, and testing
              routes. The test bench shows the same embeds in a production-like
              context.
            </p>
          </div>

          <div className="home-bottom-actions">
            <Link href="/docs" className="toggle active">
              Open Docs
            </Link>
            <Link href="/test" className="toggle">
              Open Test Bench
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
