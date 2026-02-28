import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "doitlive.guide — Go live on Twitch";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c0b0a",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#c4a35a",
            marginBottom: 32,
          }}
        >
          Start streaming in ~15 minutes
        </div>
        <div
          style={{
            fontSize: 72,
            fontStyle: "italic",
            color: "#e8e4de",
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Go live on Twitch.
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#6b6560",
            lineHeight: 1.6,
            maxWidth: 700,
          }}
        >
          No fluff, no affiliate links, no gear you need to buy. Just the
          fastest path from zero to streaming.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 18,
            color: "#e8e4de",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          doitlive<span style={{ color: "#c4a35a" }}>.guide</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 14,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#3d3a36",
          }}
        >
          a buildstory project
        </div>
      </div>
    ),
    { ...size }
  );
}
