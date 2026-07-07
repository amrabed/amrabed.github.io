import { describe, expect, it, vi } from "vitest";

import isRateLimited from "./ratelimit";

const mockLimit = vi.fn();

vi.mock("@/lib/upstash", () => ({
  ratelimit: {
    limit: (ip: string) => mockLimit(ip),
  },
}));

describe("isRateLimited", () => {
  it("should extract IP from x-real-ip header and call limit", async () => {
    mockLimit.mockResolvedValue({ success: true });

    const req = new Request("http://localhost/api/chat", {
      headers: { "x-real-ip": "1.2.3.4" },
    });

    const result = await isRateLimited(req);

    expect(mockLimit).toHaveBeenCalledWith("1.2.3.4");
    expect(result).toBe(false);
  });

  it("should prioritize x-real-ip over x-forwarded-for", async () => {
    mockLimit.mockResolvedValue({ success: true });

    const req = new Request("http://localhost/api/chat", {
      headers: {
        "x-forwarded-for": "1.1.1.1",
        "x-real-ip": "2.2.2.2",
      },
    });

    await isRateLimited(req);
    expect(mockLimit).toHaveBeenCalledWith("2.2.2.2");
  });

  it("should extract IP from x-forwarded-for header and call limit if x-real-ip is missing", async () => {
    mockLimit.mockResolvedValue({ success: true });

    const req = new Request("http://localhost/api/chat", {
      headers: { "x-forwarded-for": "12.34.56.78, 98.76.54.32" },
    });

    const result = await isRateLimited(req);

    expect(mockLimit).toHaveBeenCalledWith("98.76.54.32");
    expect(result).toBe(false);
  });

  it("should use anonymous as fallback if x-forwarded-for is missing", async () => {
    mockLimit.mockResolvedValue({ success: true });

    const req = new Request("http://localhost/api/chat");
    const result = await isRateLimited(req);

    expect(mockLimit).toHaveBeenCalledWith("anonymous");
    expect(result).toBe(false);
  });

  it("should return true if rate limit is exceeded (success: false)", async () => {
    mockLimit.mockResolvedValue({ success: false });

    const req = new Request("http://localhost/api/chat");
    const result = await isRateLimited(req);

    expect(result).toBe(true);
  });
});
