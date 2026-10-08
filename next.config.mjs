/** @type {import('next').NextConfig} */

const isExport =
  globalThis.process !== undefined &&
  globalThis.process.env.NEXT_EXPORT === "true";

const nextConfig = {
  output: isExport ? "export" : undefined,
  reactStrictMode: true,
  transpilePackages: ["@amrabed/ui"],
  images: {
    unoptimized: isExport,
  },
};

export default nextConfig;
