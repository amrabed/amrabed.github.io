/** @type {import('next').NextConfig} */

const nextConfig = {
  output:
    typeof globalThis.process !== "undefined" &&
    globalThis.process.env.NEXT_EXPORT === "true"
      ? "export"
      : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
