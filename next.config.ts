import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true
  // If you load remote images, add domains:
  // images: { domains: ["example.com"] },
  // If you use experimental features, enable here:
  // experimental: { typedRoutes: true },
};

export default nextConfig;

