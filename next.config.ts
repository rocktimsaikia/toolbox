import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
    return [
      // The combined text page was split into one page per tool
      { source: "/text-tools", destination: "/case-converter", permanent: true },
      // Renamed to a slug that matches what people search for
      { source: "/yamlc", destination: "/data-format-converter", permanent: true },
    ];
  },
};

export default nextConfig;
