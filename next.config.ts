import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The combined text page was split into one page per tool
    return [{ source: "/text-tools", destination: "/case-converter", permanent: true }];
  },
};

export default nextConfig;
