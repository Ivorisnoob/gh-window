import Link from "next/link";
import type { Metadata } from "next";
import CopyMarkdownButton from "./CopyMarkdownButton";

export const metadata: Metadata = {
  title: "Docs — gh-window",
  description:
    "Detailed documentation for gh-window, including API parameters, embed examples, testing routes, and deployment notes.",
};

const BASE_URL = "https://gh-window.vercel.app";

const DOCS_MARKDOWN = `# gh-window

gh-window generates browser-window style GitHub stats cards that can be embedded in README files, portfolios, and any page that can render a remote image.

## What it does

- Renders a 400x220 Open Graph style image for a GitHub username
- Supports dark and light card themes
- Supports custom accent colors through a hex query parameter
- Lets callers limit visible stats with the show query parameter
- Falls back to a compact error card when the user does not exist or GitHub fails

## Main endpoint

\`\`\`
${BASE_URL}/api/YOUR_USERNAME
\`\`\`

## Query parameters

- \`theme\`: \`dark\` or \`light\`
- \`accent\`: 3-digit or 6-digit hex without \`#\`
- \`show\`: comma-separated stat keys

## Supported show keys

- \`repos\`
- \`stars\`
- \`followers\`
- \`streak\`
- \`langs\`

## Notes on streak data

- Streak data only appears when \`GITHUB_TOKEN\` is configured
- Without a token, streak values stay unavailable and that section is omitted

## Embed examples

\`\`\`md
![GitHub Stats](${BASE_URL}/api/YOUR_USERNAME)
![GitHub Stats](${BASE_URL}/api/YOUR_USERNAME?theme=light)
![GitHub Stats](${BASE_URL}/api/YOUR_USERNAME?show=repos,stars,streak)
![GitHub Stats](${BASE_URL}/api/YOUR_USERNAME?theme=light&accent=84cc16)
\`\`\`

## HTML example

\`\`\`html
<img src="${BASE_URL}/api/YOUR_USERNAME" alt="GitHub stats" />
\`\`\`

## Testing surfaces

- \`/test\`: in-app live test bench for the current deployment
- \`/readme-test.html\`: plain HTML page that uses the production domain directly
- \`README.test.md\`: markdown test file with production embeds

## Caching

- The image route returns cache headers for CDN reuse
- GitHub user and repository data are fetched with revalidation enabled

## Deployment requirements

- \`NEXT_PUBLIC_BASE_URL\` should point to the deployed site URL
- \`GITHUB_TOKEN\` is optional, but recommended for better API headroom and streak support

## Project structure

- \`app/api/[username]/route.tsx\`: image endpoint
- \`lib/github.ts\`: GitHub REST and GraphQL data fetching
- \`lib/card.tsx\`: card rendering for the image response
- \`app/[username]/page.tsx\`: preview builder
- \`app/test/page.tsx\`: embed test bench
`;

const embedExamples = [
  `![GitHub Stats](${BASE_URL}/api/YOUR_USERNAME)`,
  `![GitHub Stats](${BASE_URL}/api/YOUR_USERNAME?theme=light)`,
  `![GitHub Stats](${BASE_URL}/api/YOUR_USERNAME?show=repos,stars,streak)`,
  `![GitHub Stats](${BASE_URL}/api/YOUR_USERNAME?theme=light&accent=84cc16)`,
];

const htmlExample = `<img src="${BASE_URL}/api/YOUR_USERNAME" alt="GitHub stats" />`;

export default function DocsPage() {
  return (
    <>
      <div className="bg-mesh" aria-hidden="true" />

      <main className="page docs-page">
        <section className="docs-hero fade-up">
          <div className="docs-hero-bar">
            <div className="docs-hero-copy">
              <p className="label" style={{ marginBottom: 8 }}>
                Documentation
              </p>
              <h1 className="docs-hero-title">gh-window</h1>
              <p className="lead docs-hero-lead">
                Browser-window style GitHub stats cards delivered as image
                responses for README files, HTML embeds, and profile pages.
              </p>
            </div>

            <div className="docs-hero-meta">
              <div className="docs-hero-stat">
                <span className="docs-hero-stat-label">Endpoint</span>
                <strong>/api/[username]</strong>
              </div>
              <div className="docs-hero-stat">
                <span className="docs-hero-stat-label">Themes</span>
                <strong>dark, light</strong>
              </div>
              <div className="docs-hero-stat">
                <span className="docs-hero-stat-label">Formats</span>
                <strong>Markdown, HTML</strong>
              </div>
            </div>
          </div>

          <div className="docs-action-stack">
            <CopyMarkdownButton markdown={DOCS_MARKDOWN} />
            <Link href="/test" className="docs-action docs-action-secondary">
              Open Test Bench
            </Link>
            <a
              href="/readme-test.html"
              className="docs-action docs-action-secondary"
            >
              Open HTML Test Page
            </a>
          </div>

          <div className="code-block docs-hero-endpoint">
            {BASE_URL}/api/YOUR_USERNAME?theme=light&accent=84cc16&show=repos,stars,streak
          </div>
        </section>

        <section className="docs-grid fade-up fade-up-d1">
          <article className="docs-card docs-card-primary">
            <p className="label" style={{ marginBottom: 10 }}>
              Overview
            </p>
            <h2 className="docs-title">What this project ships</h2>
            <div className="docs-list">
              <p>Image endpoint for GitHub stats cards at `/api/[username]`.</p>
              <p>Theme support for dark and light card variants.</p>
              <p>Optional accent color control with hex values.</p>
              <p>Selective stat rendering through the `show` query parameter.</p>
              <p>Preview and testing surfaces for both app and plain HTML usage.</p>
            </div>
          </article>

          <article className="docs-card">
            <p className="label" style={{ marginBottom: 10 }}>
              Endpoint
            </p>
            <h2 className="docs-title">Main production URL</h2>
            <div className="code-block">{BASE_URL}/api/YOUR_USERNAME</div>
            <p className="lead docs-inline-copy">
              The endpoint returns a generated image, so it works in README
              markdown, raw HTML, and any consumer that accepts a remote image
              URL.
            </p>
          </article>
        </section>

        <section className="docs-grid docs-grid-wide fade-up fade-up-d2">
          <article className="docs-card">
            <p className="label" style={{ marginBottom: 10 }}>
              Query Parameters
            </p>
            <h2 className="docs-title">Supported inputs</h2>
            <div className="docs-table">
              <div className="docs-table-row">
                <strong>theme</strong>
                <span>`dark` or `light`</span>
              </div>
              <div className="docs-table-row">
                <strong>accent</strong>
                <span>3-digit or 6-digit hex without `#`</span>
              </div>
              <div className="docs-table-row">
                <strong>show</strong>
                <span>Comma-separated subset of supported stat keys</span>
              </div>
            </div>
          </article>

          <article className="docs-card">
            <p className="label" style={{ marginBottom: 10 }}>
              show Keys
            </p>
            <h2 className="docs-title">Visible sections</h2>
            <div className="docs-chip-row">
              {["repos", "stars", "followers", "streak", "langs"].map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <p className="lead docs-inline-copy">
              If `show` is omitted, gh-window renders all available sections.
              `streak` only appears when streak data is available.
            </p>
          </article>

          <article className="docs-card docs-card-emphasis">
            <p className="label" style={{ marginBottom: 10 }}>
              Streak Data
            </p>
            <h2 className="docs-title">Token-dependent section</h2>
            <div className="docs-list">
              <p>`GITHUB_TOKEN` enables the GraphQL contribution query.</p>
              <p>Without the token, streak values remain unavailable.</p>
              <p>The image still renders cleanly; the streak row is omitted.</p>
            </div>
          </article>
        </section>

        <section className="docs-grid docs-grid-wide fade-up fade-up-d3">
          <article className="docs-card docs-card-code">
            <p className="label" style={{ marginBottom: 10 }}>
              Markdown Embeds
            </p>
            <h2 className="docs-title">Copy-ready examples</h2>
            <div className="docs-code-stack">
              {embedExamples.map((example) => (
                <div key={example} className="code-block">
                  {example}
                </div>
              ))}
            </div>
          </article>

          <article className="docs-card docs-card-code">
            <p className="label" style={{ marginBottom: 10 }}>
              HTML
            </p>
            <h2 className="docs-title">Direct image usage</h2>
            <div className="code-block">{htmlExample}</div>
            <p className="lead docs-inline-copy">
              Use the raw image URL when the consumer is not markdown-aware.
            </p>
          </article>
        </section>

        <section className="docs-grid docs-grid-wide fade-up fade-up-d4">
          <article className="docs-card">
            <p className="label" style={{ marginBottom: 10 }}>
              Testing
            </p>
            <h2 className="docs-title">Ways to verify production behavior</h2>
            <div className="docs-list">
              <p>
                `/test` shows the embed variants inside the Next app and lets
                you change usernames.
              </p>
              <p>
                `/readme-test.html` uses the production domain directly in a
                plain browser page.
              </p>
              <p>
                `README.test.md` lets you verify markdown rendering with the
                real deployed image URLs.
              </p>
            </div>
          </article>

          <article className="docs-card">
            <p className="label" style={{ marginBottom: 10 }}>
              Deployment
            </p>
            <h2 className="docs-title">Environment and caching notes</h2>
            <div className="docs-list">
              <p>`NEXT_PUBLIC_BASE_URL` should resolve to the deployed site.</p>
              <p>`GITHUB_TOKEN` improves rate limits and unlocks streak data.</p>
              <p>The image route sets CDN-friendly cache headers.</p>
              <p>GitHub fetches use revalidation to avoid hot-path overfetching.</p>
            </div>
          </article>

          <article className="docs-card">
            <p className="label" style={{ marginBottom: 10 }}>
              Files
            </p>
            <h2 className="docs-title">Important implementation paths</h2>
            <div className="docs-list">
              <p>[app/api/[username]/route.tsx](/E:/Ivors/Developement/open-source/gh-window/app/api/[username]/route.tsx)</p>
              <p>[lib/github.ts](/E:/Ivors/Developement/open-source/gh-window/lib/github.ts)</p>
              <p>[lib/card.tsx](/E:/Ivors/Developement/open-source/gh-window/lib/card.tsx)</p>
              <p>[app/[username]/page.tsx](/E:/Ivors/Developement/open-source/gh-window/app/[username]/page.tsx)</p>
              <p>[app/test/page.tsx](/E:/Ivors/Developement/open-source/gh-window/app/test/page.tsx)</p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
