import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Embeds — gh-window",
  description: "Test the gh-window embed variants in one page.",
};

interface Props {
  searchParams: Promise<{ username?: string }>;
}

export default async function TestPage({ searchParams }: Props) {
  const { username: rawUsername } = await searchParams;
  const username = rawUsername?.trim() || "ivorisnoob";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://gh-window.vercel.app";

  const variants = [
    {
      title: "Default",
      description: "Default theme with the standard card payload.",
      src: `${baseUrl}/api/${username}`,
    },
    {
      title: "Light Theme",
      description: "For READMEs or pages that need a lighter card.",
      src: `${baseUrl}/api/${username}?theme=light`,
    },
    {
      title: "Focused Stats",
      description: "Only repos, stars, and streak for a tighter embed.",
      src: `${baseUrl}/api/${username}?show=repos,stars,streak`,
    },
  ];

  return (
    <>
      <div className="bg-mesh" aria-hidden="true" />

      <main className="page" style={{ justifyContent: "flex-start" }}>
        <section
          className="fade-up"
          style={{
            width: "100%",
            maxWidth: 980,
            display: "grid",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <p className="label" style={{ marginBottom: 10 }}>
                Embed Test Bench
              </p>
              <h1 className="display" style={{ marginBottom: 12 }}>
                Test all three
                <br />
                <em>embed variants.</em>
              </h1>
              <p className="lead">
                Open this page locally and swap the username with
                {" "}
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                  /test?username=YOUR_USERNAME
                </span>
                .
              </p>
            </div>

            <div
              className="code-block"
              style={{
                minWidth: 260,
                maxWidth: 320,
                alignSelf: "stretch",
              }}
            >
              <p className="label" style={{ marginBottom: 8 }}>
                Active Username
              </p>
              <div style={{ fontSize: "1rem", fontWeight: 700 }}>{username}</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <Link href="/" className="toggle active">
              Home
            </Link>
            <Link href={`/${username}`} className="toggle">
              Preview Builder
            </Link>
          </div>
        </section>

        <section
          className="fade-up fade-up-d1"
          style={{
            width: "100%",
            maxWidth: 980,
            display: "grid",
            gap: 24,
          }}
        >
          {variants.map((variant) => {
            const markdown = `![GitHub Stats](${variant.src})`;

            return (
              <article
                key={variant.title}
                className="card"
                style={{
                  padding: "clamp(18px, 3vw, 28px)",
                  display: "grid",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gap: 6,
                  }}
                >
                  <p className="label">{variant.title}</p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {variant.title} embed
                  </h2>
                  <p className="lead" style={{ fontSize: "0.95rem" }}>
                    {variant.description}
                  </p>
                </div>

                <div
                  className="test-variant-grid"
                >
                  <div className="card" style={{ overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={variant.src}
                      alt={`${variant.title} GitHub stats card for ${username}`}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    <div>
                      <p className="label" style={{ marginBottom: 8 }}>
                        Markdown Embed
                      </p>
                      <div className="code-block">{markdown}</div>
                    </div>

                    <div>
                      <p className="label" style={{ marginBottom: 8 }}>
                        Direct Image URL
                      </p>
                      <div className="code-block">{variant.src}</div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}
