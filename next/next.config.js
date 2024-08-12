/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "brand.vt.edu",
      "images.credly.com",
      "bcert.me",
      "portal.eng.asu.edu.eg",
      "open-scope.com",
    ],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
