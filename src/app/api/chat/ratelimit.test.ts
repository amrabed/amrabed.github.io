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

  it("should validate IPv6 address correctly from header", async () => {
    mockLimit.mockResolvedValue({ success: true });

    const req = new Request("http://localhost/api/chat", {
      headers: { "x-real-ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334" },
    });

    await isRateLimited(req);
    expect(mockLimit).toHaveBeenCalledWith(
      "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    );
  });

  it("should reject invalid IPv4 leading zeros or invalid IPv6 structures", async () => {
    mockLimit.mockResolvedValue({ success: true });

    // Test cases hitting various branch checks in IPv4 and IPv6 validators
    const invalidIps = [
      "01.2.3.4",
      "2001::1::2",
      "1:2:3",
      "1:2:3:4:5:6:7:8:9",
      "2001:xyz::1",
      "",
    ];

    for (const invalidIp of invalidIps) {
      const req = new Request("http://localhost/api/chat", {
        headers: { "x-real-ip": invalidIp },
      });
      await isRateLimited(req);
      expect(mockLimit).toHaveBeenCalledWith("anonymous");
    }
  });

  it("should fall back to anonymous when headers contain invalid IP strings", async () => {
    mockLimit.mockResolvedValue({ success: true });

    const req = new Request("http://localhost/api/chat", {
      headers: {
        "x-real-ip": "invalid-ip-address",
        "x-forwarded-for": "999.999.999.999, not-an-ip",
      },
    });

    await isRateLimited(req);
    expect(mockLimit).toHaveBeenCalledWith("anonymous");
  });

  it("should extract valid IP if x-real-ip is invalid but x-forwarded-for contains a valid IP", async () => {
    mockLimit.mockResolvedValue({ success: true });

    const req = new Request("http://localhost/api/chat", {
      headers: {
        "x-real-ip": "malformed_ip",
        "x-forwarded-for": "203.0.113.195, bad_ip",
      },
    });

    await isRateLimited(req);
    expect(mockLimit).toHaveBeenCalledWith("203.0.113.195");
  });

  it("should return true if rate limit is exceeded (success: false)", async () => {
    mockLimit.mockResolvedValue({ success: false });

    const req = new Request("http://localhost/api/chat");
    const result = await isRateLimited(req);

    expect(result).toBe(true);
  });
});
