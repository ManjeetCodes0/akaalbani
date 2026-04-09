import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required for Docker / Cloud Run deployment
  output: "standalone",
  images: {
    remotePatterns: [
      // Sanity CDN images
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Placeholder images used in dev/fallback
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
