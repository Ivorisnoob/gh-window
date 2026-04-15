import { ImageResponse } from "next/og";
import { IconArt } from "./icon-shared";

export const size = {
  width: 256,
  height: 256,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    IconArt({
      size: 256,
      inset: 18,
      radius: 56,
      dotSize: 20,
      barWidth: 36,
    }),
    size
  );
}
