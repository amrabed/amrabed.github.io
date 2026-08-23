import { ratelimit } from "@/lib/upstash";

function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    if (!/^\d+$/.test(part)) return false;
    if (part.length > 1 && part.startsWith("0")) return false;
    const num = Number(part);
    return num >= 0 && num <= 255;
  });
}

function isValidIPv6(ip: string): boolean {
  if (!ip || ip.length < 2) return false;
  const doubleColonCount = (ip.match(/::/g) || []).length;
  if (doubleColonCount > 1) return false;

  const parts = ip.split("::");
  const left = parts[0] ? parts[0].split(":") : [];
  const right = parts.length > 1 && parts[1] ? parts[1].split(":") : [];

  if (doubleColonCount === 0 && left.length !== 8) return false;
  if (doubleColonCount === 1 && left.length + right.length >= 8) return false;

  const allParts = [...left, ...right];
  return allParts.every((part) => /^[0-9a-fA-F]{1,4}$/.test(part));
}

function isValidIP(ip: string): boolean {
  return isValidIPv4(ip) || isValidIPv6(ip);
}

function extractCandidateIP(headerValue: string | null): string | null {
  if (!headerValue) return null;
  const parts = headerValue.split(",");
  for (let i = parts.length - 1; i >= 0; i--) {
    const candidate = parts[i].trim();
    if (isValidIP(candidate)) {
      return candidate;
    }
  }
  return null;
}

export default async function isRateLimited(req: Request): Promise<boolean> {
  // Extract and validate IP address from x-real-ip or x-forwarded-for headers to prevent spoofing/bypass
  const ip =
    extractCandidateIP(req.headers.get("x-real-ip")) ??
    extractCandidateIP(req.headers.get("x-forwarded-for")) ??
    "anonymous";

  const { success } = await ratelimit.limit(ip);
  return !success;
}
