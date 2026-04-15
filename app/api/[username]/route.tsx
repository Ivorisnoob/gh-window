import { ImageResponse } from "@vercel/og";
import { fetchGitHubStats } from "@/lib/github";
import { renderCard, type Theme } from "@/lib/card";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const { searchParams } = new URL(request.url);

  const theme = (searchParams.get("theme") ?? "dark") as Theme;
  const showParam = searchParams.get("show") ?? "";
  const show = showParam ? showParam.split(",").map((s) => s.trim()) : [];

  // Validate theme
  const validTheme: Theme = theme === "light" ? "light" : "dark";

  try {
    const stats = await fetchGitHubStats(username);
    const card = renderCard(stats, validTheme, show);

    return new ImageResponse(card, {
      width: 400,
      height: 220,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (err) {
    const msg =
      err instanceof Error && err.message === "USER_NOT_FOUND"
        ? `User "${username}" not found`
        : "GitHub API error — try again later";

    const errorTheme = validTheme;
    const bg = errorTheme === "dark" ? "#0d1117" : "#ffffff";
    const border = errorTheme === "dark" ? "#30363d" : "#d0d7de";
    const text = errorTheme === "dark" ? "#e6edf3" : "#1f2328";
    const muted = errorTheme === "dark" ? "#8b949e" : "#57606a";

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          height: 120,
          border: `1px solid ${border}`,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: bg,
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 28 }}>⚠️</span>
        <span style={{ fontSize: 14, color: text }}>{msg}</span>
        <span style={{ fontSize: 11, color: muted }}>gh-window</span>
      </div>,
      { width: 400, height: 120 }
    );
  }
}
