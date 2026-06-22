/** @type {import('next').NextConfig} */

const nextConfig = {
  output:
    globalThis.process !== undefined &&
    globalThis.process.env.NEXT_EXPORT === "true"
      ? "export"
      : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  ...(globalThis.process?.env?.NEXT_EXPORT !== "true" && {
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,POST",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
            },
          ],
        },
      ];
    },
  }),
};

export default nextConfig;
