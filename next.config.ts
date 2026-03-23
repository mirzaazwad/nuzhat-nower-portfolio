import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  basePath: "/nuzhat-nower-portfolio",
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  },
  output: "export",
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
