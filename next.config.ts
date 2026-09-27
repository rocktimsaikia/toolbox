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
      // The multi-format converter was split into one page per conversion; JSON to YAML
      // was its default, so old links land on the closest match
      { source: "/yamlc", destination: "/json-to-yaml", permanent: true },
      { source: "/data-format-converter", destination: "/json-to-yaml", permanent: true },
    ];
  },
};

export default nextConfig;
