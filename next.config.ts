import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  staleTimes: {
    dynamic: 60 * 5,
  },
};

export default nextConfig;
