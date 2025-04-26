import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["skillicons.dev"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
