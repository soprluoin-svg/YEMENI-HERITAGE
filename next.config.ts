import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [{ source: "/", destination: "/en" }];
  },
};

export default config;
