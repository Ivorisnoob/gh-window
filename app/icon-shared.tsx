import type { ReactElement } from "react";

interface IconArtProps {
  size: number;
  inset: number;
  radius: number;
  dotSize: number;
  barWidth: number;
}

export function IconArt({
  size,
  inset,
  radius,
  dotSize,
  barWidth,
}: IconArtProps): ReactElement {
  const panelHeight = size - inset * 2;
  const titlebarHeight = Math.round(panelHeight * 0.26);
  const barGap = Math.round(size * 0.042);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(145deg, #fffaf2 0%, #f6ead6 38%, #f0c89a 100%)",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: size - inset * 2,
          height: panelHeight,
          borderRadius: radius,
          overflow: "hidden",
          border: `${Math.max(4, Math.round(size * 0.024))}px solid #24160f`,
          boxShadow: "0 16px 40px rgba(84, 39, 5, 0.16)",
          background: "#fffdf9",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: Math.round(dotSize * 0.5),
            height: titlebarHeight,
            paddingLeft: Math.round(size * 0.07),
            paddingRight: Math.round(size * 0.07),
            background: "#1f1510",
          }}
        >
          <div
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: 999,
              background: "#ff725c",
            }}
          />
          <div
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: 999,
              background: "#f3bd3f",
            }}
          />
          <div
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: 999,
              background: "#4ccd76",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: Math.round(size * 0.08),
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,244,229,1) 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: Math.round(size * 0.08),
              right: Math.round(size * 0.08),
              width: Math.round(size * 0.33),
              height: Math.round(size * 0.08),
              borderRadius: 999,
              background: "#f3e4ce",
              border: `${Math.max(2, Math.round(size * 0.012))}px solid #ead6bc`,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: barGap,
              height: Math.round(size * 0.34),
            }}
          >
            {[
              { height: 0.48, color: "#fb923c" },
              { height: 0.82, color: "#f97316" },
              { height: 0.62, color: "#84cc16" },
            ].map((bar) => (
              <div
                key={`${bar.color}-${bar.height}`}
                style={{
                  width: barWidth,
                  height: Math.round(size * 0.34 * bar.height),
                  borderRadius: Math.round(size * 0.04),
                  background: bar.color,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
