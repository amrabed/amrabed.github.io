/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "avatars.githubusercontent.com",
      "brand.vt.edu",
      "images.credly.com",
      "bcert.me",
      "portal.eng.asu.edu.eg",
      "open-scope.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
