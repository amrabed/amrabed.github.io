import { ratelimit } from "@/middleware/upstash";

export default async function isRateLimited(req: Request): Promise<boolean> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
  const { success } = await ratelimit.limit(ip);
  return !success;
}
