import { ImageResponse } from "@vercel/og";
import { fetchGitHubStats } from "@/lib/github";
import { renderCard, type Theme } from "@/lib/card";

export const runtime = "edge";

/**
 * Shared caching headers.
 *
 * - `Cache-Control`          → sent to downstream clients (browser, GitHub Camo
 *                               proxy). Camo respects max-age here.
 * - `Vercel-CDN-Cache-Control` → consumed by Vercel's CDN only, never forwarded
 *                               to the client. Keeps the generated PNG warm on
 *                               the edge so subsequent requests never hit the
 *                               origin (and therefore never risk a Camo timeout).
 */
const CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "public, max-age=1800, s-maxage=3600, stale-while-revalidate=7200",
  "Vercel-CDN-Cache-Control": "s-maxage=3600, stale-while-revalidate=7200",
};

/**
 * Helper: generate a PNG via ImageResponse, then re-wrap it in a plain Response
 * with explicit headers so they are not consumed/stripped by Vercel's edge layer.
 */
async function pngResponse(
  element: React.ReactElement,
  width: number,
  height: number,
  extraHeaders?: Record<string, string>
): Promise<Response> {
  const imgRes = new ImageResponse(element, { width, height });

  // Read the full body so we know Content-Length (helps Camo)
  const body = await imgRes.arrayBuffer();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": String(body.byteLength),
      ...CACHE_HEADERS,
      ...extraHeaders,
    },
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const { searchParams } = new URL(request.url);

  const theme = (searchParams.get("theme") ?? "dark") as Theme;
  const showParam = searchParams.get("show") ?? "";
  const show = showParam ? showParam.split(",").map((s) => s.trim()) : [];
  const accentParam = searchParams.get("accent") ?? "";
  // Accept hex without # (e.g. ?accent=f97316)
  const accent = /^[0-9a-fA-F]{3,6}$/.test(accentParam)
    ? `#${accentParam}`
    : undefined;

  // Validate theme
  const validTheme: Theme = theme === "light" ? "light" : "dark";

  try {
    const stats = await fetchGitHubStats(username);
    const card = renderCard(stats, validTheme, show, accent);

    return pngResponse(card, 400, 220);
  } catch (err) {
    const msg =
      err instanceof Error && err.message === "USER_NOT_FOUND"
        ? `User "${username}" not found`
        : "GitHub API error — try again later";

    const bg = validTheme === "dark" ? "#0d1117" : "#ffffff";
    const border = validTheme === "dark" ? "#30363d" : "#d0d7de";
    const text = validTheme === "dark" ? "#e6edf3" : "#1f2328";
    const muted = validTheme === "dark" ? "#8b949e" : "#57606a";

    return pngResponse(
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
      400,
      120,
      // Don't cache error responses as long
      {
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "Vercel-CDN-Cache-Control": "s-maxage=60",
      }
    );
  }
}
