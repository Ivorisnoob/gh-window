import { ImageResponse } from "next/og";
import { IconArt } from "./icon-shared";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    IconArt({
      size: 180,
      inset: 12,
      radius: 40,
      dotSize: 14,
      barWidth: 24,
    }),
    size
  );
}
