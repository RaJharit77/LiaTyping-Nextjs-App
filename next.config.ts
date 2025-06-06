import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverActions: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

export default nextConfig;
