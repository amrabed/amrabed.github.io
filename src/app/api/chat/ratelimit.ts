import { NextRequest } from "next/server";

import { ratelimit } from "@/lib/upstash";

export default async function isRateLimited(
  req: NextRequest | Request,
): Promise<boolean> {
  let ip = "ip" in req ? (req as NextRequest).ip : null;
  ip = ip ?? req.headers.get("x-real-ip");

  if (!ip) {
    const forwardedFor = req.headers.get("x-forwarded-for");
    if (forwardedFor) {
      const parts = forwardedFor.split(",");
      ip = parts[parts.length - 1].trim();
    }
  }

  ip = ip ?? "anonymous";
  const { success } = await ratelimit.limit(ip);
  return !success;
}
