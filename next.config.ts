import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [{ source: "/", destination: "/pt", permanent: false }]
  },
  partialPrefetching: true,
  turbopack: {
    root: path.join(process.cwd()),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
