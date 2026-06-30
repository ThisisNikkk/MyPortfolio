import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.22"],

  // Reduce network payload — serve AVIF first, WebP as fallback
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // cache optimized images for 1 year
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable gzip compression
  compress: true,

  // Remove X-Powered-By header (minor security + payload improvement)
  poweredByHeader: false,

  // Strict mode helps catch performance issues early
  reactStrictMode: true,
};

export default nextConfig;
