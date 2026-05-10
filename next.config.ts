import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
