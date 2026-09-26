import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Pages go through Next; static files get the same header from public/_headers
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Content-Type-Options", value: "nosniff" }],
      },
    ];
  },
  async redirects() {
    // The combined text page was split into one page per tool
    return [{ source: "/text-tools", destination: "/case-converter", permanent: true }];
  },
};

export default nextConfig;
