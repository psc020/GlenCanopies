import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgb(29, 29, 29)",
          borderRadius: "96px",
        }}
      >
        <svg width="330" height="330" viewBox="0 0 330 330" fill="none">
          <path
            d="M54 234L164 70L274 234"
            stroke="rgb(242, 189, 29)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M104 214C125 206 145 202 165 202C185 202 205 206 226 214"
            stroke="rgb(242, 189, 29)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M165 87V217"
            stroke="rgb(242, 189, 29)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <circle cx="165" cy="223" r="16" fill="rgb(242, 189, 29)" />
          <path d="M90 212L162 108L162 212H90Z" fill="white" fillOpacity="0.14" />
          <path d="M240 212L168 108L168 212H240Z" fill="white" fillOpacity="0.08" />
        </svg>
      </div>
    ),
    size,
  );
}
