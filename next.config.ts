import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'image.yes24.com',
      },
      {
        protocol: 'https',
        hostname: 'contents.kyobobook.co.kr',
      },
    ],
  },
};

export default nextConfig;
