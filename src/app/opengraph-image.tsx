import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(59,130,246,0.22), transparent 45%), radial-gradient(circle at 85% 85%, rgba(139,92,246,0.22), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "#3B82F6",
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {profile.role}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#A1A1AA",
            maxWidth: 880,
          }}
        >
          Building AI-powered software that transforms complex ideas into intuitive products.
        </div>
      </div>
    ),
    { ...size }
  );
}
