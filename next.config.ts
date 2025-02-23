import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 60,
      static: 3600,
    },
    optimisticClientCache: true,
    webVitalsAttribution: ["CLS", "LCP"],
    optimizePackageImports: ["@/components/ui", "recharts", "motion/react"],
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
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "de6turbfvinrohin.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
