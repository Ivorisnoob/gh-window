"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const PRESETS = [
  { label: "Orange",  value: "f97316" },
  { label: "Violet",  value: "8b5cf6" },
  { label: "Sky",     value: "0ea5e9" },
  { label: "Rose",    value: "f43f5e" },
  { label: "Emerald", value: "10b981" },
  { label: "Amber",   value: "f59e0b" },
  { label: "Pink",    value: "ec4899" },
  { label: "Lime",    value: "84cc16" },
];

interface Props {
  username: string;
  theme: string;
  show: string;
  currentAccent: string;
}

export default function ColorCustomizer({ username, theme, show, currentAccent }: Props) {
  const [accent, setAccent] = useState(() => currentAccent || "f97316");
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (accent === currentAccent) return;

    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (theme) params.set("theme", theme);
      if (show) params.set("show", show);
      params.set("accent", accent);

      startTransition(() => {
        router.replace(`/${username}?${params.toString()}`, { scroll: false });
      });
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [accent, currentAccent, router, show, startTransition, theme, username]);

  function applyColor(hex: string) {
    setAccent(hex);
  }

  return (
    <div style={{ width: "100%", maxWidth: 500 }}>
      <p className="label" style={{ marginBottom: 12 }}>Accent colour</p>

      {/* Preset swatches */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {PRESETS.map((p) => (
          <button
            key={p.value}
            title={p.label}
            onClick={() => applyColor(p.value)}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: `#${p.value}`,
              border: accent === p.value
                ? "3px solid var(--text)"
                : "2px solid transparent",
              outline: accent === p.value ? "2px solid var(--border)" : "none",
              cursor: "pointer",
              transition: "transform 0.15s ease, border 0.15s ease",
              transform: accent === p.value ? "scale(1.15)" : "scale(1)",
            }}
            aria-label={p.label}
          />
        ))}

        {/* Custom color input */}
        <label
          title="Custom colour"
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "2px dashed var(--border)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <span>+</span>
          <input
            type="color"
            value={`#${accent}`}
            onChange={(e) => {
              const hex = e.target.value.replace("#", "");
              applyColor(hex);
            }}
            style={{
              opacity: 0,
              position: "absolute",
              inset: 0,
              cursor: "pointer",
            }}
            aria-label="Custom accent colour"
          />
        </label>
      </div>

      {/* Current hex display */}
      <div
        className="code-block"
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px" }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 4,
            background: `#${accent}`,
            flexShrink: 0,
            border: "1px solid var(--border)",
          }}
        />
        <span style={{ flex: 1 }}>?accent={accent}</span>
      </div>
    </div>
  );
}
