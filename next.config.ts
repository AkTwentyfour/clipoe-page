import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⛔ Build di Vercel gak akan gagal walau ada lint error
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
