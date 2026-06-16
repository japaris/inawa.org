import { ImageResponse } from "next/og";

// Image d'aperçu au partage (LinkedIn, Facebook, WhatsApp, Slack, iMessage...).
// Next la branche automatiquement sur og:image. Générée au build (1200x630).
export const alt = "Inawa - Product Manager freelance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #ffffff 0%, #faf8f5 45%, #f3ede3 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 16,
              background: "#1e3a5f",
              color: "#faf8f5",
              fontSize: 42,
              fontWeight: 700,
            }}
          >
            I
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#1e3a5f", letterSpacing: "-0.01em" }}>
            Inawa
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#1e3a5f",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            Tu as une idée. Construisons le projet.
          </div>
          <div style={{ fontSize: 32, color: "#6f685e", maxWidth: 860 }}>
            Product Manager freelance - de la vision au lancement.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: 28, fontWeight: 600, color: "#c0613a" }}>
          <div style={{ width: 44, height: 5, borderRadius: 3, background: "#c0613a" }} />
          inawa.org
        </div>
      </div>
    ),
    { ...size },
  );
}
