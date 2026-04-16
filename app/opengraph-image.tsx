import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, rgb(29, 29, 29), rgb(44, 44, 44), rgb(67, 54, 24))",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <svg width="150" height="92" viewBox="0 0 330 330" fill="none">
            <path d="M54 234L164 70L274 234" stroke="rgb(242, 189, 29)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M104 214C125 206 145 202 165 202C185 202 205 206 226 214" stroke="rgb(242, 189, 29)" strokeWidth="14" strokeLinecap="round"/>
            <path d="M165 87V217" stroke="rgb(242, 189, 29)" strokeWidth="14" strokeLinecap="round"/>
            <circle cx="165" cy="223" r="16" fill="rgb(242, 189, 29)" />
            <path d="M90 212L162 108L162 212H90Z" fill="white" fillOpacity="0.14" />
            <path d="M240 212L168 108L168 212H240Z" fill="white" fillOpacity="0.08" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "28px", fontWeight: 700 }}>Glen Canopies</div>
            <div style={{ fontSize: "16px", opacity: 0.75, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              Ireland
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "760px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "68px", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.06em" }}>
            Premium canopy supply-and-fit specialists
          </div>
          <div style={{ fontSize: "28px", lineHeight: 1.4, color: "rgba(255,255,255,0.82)" }}>
            Project-led canopy installations for homes and developments.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
