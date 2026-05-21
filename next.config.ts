import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/admin/index.html",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
