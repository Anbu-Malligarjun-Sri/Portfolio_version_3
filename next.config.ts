import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    allowedReplitOrigins: true,
  },
};

export default nextConfig;
