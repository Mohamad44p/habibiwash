import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 60,
      static: 3600,
    },
    optimisticClientCache: true,
    webVitalsAttribution: ["CLS", "LCP"],
    optimizePackageImports: ["@/components/ui", "lodash", "framer-motion"],
    optimizeServerReact: true,
    scrollRestoration: true,
    mdxRs: true,
    ppr: true,
    reactCompiler: true,
  },
  bundlePagesRouterDependencies: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
