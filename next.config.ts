import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  basePath: "/nuzhat-nower-portfolio",
  output: "export",
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
