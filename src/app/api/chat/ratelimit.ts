import { ratelimit } from "@/lib/upstash";

export default async function isRateLimited(req: Request): Promise<boolean> {
  let ip = req.headers.get("x-real-ip");

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
