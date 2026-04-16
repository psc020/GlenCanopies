import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/services/door-canopies",
        destination: "/services/canopies",
        permanent: true,
      },
      {
        source: "/services/window-canopies",
        destination: "/services/canopies",
        permanent: true,
      },
      {
        source: "/services/apex-door-canopies",
        destination: "/services/canopies/apex-canopies",
        permanent: true,
      },
      {
        source: "/services/roman-door-canopies",
        destination: "/services/canopies/roman-canopies",
        permanent: true,
      },
      {
        source: "/services/lean-too-canopies",
        destination: "/services/canopies/large-lean-to-canopies",
        permanent: true,
      },
      {
        source: "/services/grp-canopies",
        destination: "/services/canopies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
