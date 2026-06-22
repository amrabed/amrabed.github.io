/* global process */
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: process.env.NEXT_EXPORT === "true" ? "export" : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
