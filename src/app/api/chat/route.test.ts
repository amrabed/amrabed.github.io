/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";

import { OPTIONS, POST } from "./route";

const mockIsRateLimited = vi.fn();
const mockSendRequest = vi.fn();

vi.mock("./ratelimit", () => ({
  default: (req: any) => mockIsRateLimited(req),
}));

vi.mock("./request", () => ({
  default: (req: any) => mockSendRequest(req),
}));

vi.mock("./response", () => ({
  getCorsHeaders: (origin: string | null) => ({ "mock-cors": "true", origin }),
  optionsResponse: (origin: string | null) =>
    new Response("options", { headers: { origin: origin || "" } }),
  errorResponse: (status: number, message: string, origin: string | null) =>
    new Response(JSON.stringify({ error: message, origin }), { status }),
  isAllowedOrigin: (origin: string | null) =>
    origin === "https://amrabed.com" || origin === "http://localhost:3000",
}));

describe("chat api route", () => {
  it("should handle OPTIONS requests", async () => {
    const req = new Request("http://localhost/api/chat", { method: "OPTIONS" });
    const res = await OPTIONS(req);
    expect(await res.text()).toBe("options");
  });

  describe("POST", () => {
    it("should return 403 if origin is not allowed", async () => {
      const req = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { origin: "https://evil.com" },
      });
      const res = await POST(req);

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.error).toContain("Forbidden");
    });

    it("should return 429 if rate limited", async () => {
      mockIsRateLimited.mockResolvedValue(true);

      const req = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { origin: "https://amrabed.com" },
      });
      const res = await POST(req);

      expect(res.status).toBe(429);
      const json = await res.json();
      expect(json.error).toContain("reached the daily limit");
    });

    it("should return UI message stream response on success", async () => {
      mockIsRateLimited.mockResolvedValue(false);
      const mockStreamResponse = new Response("mock stream");
      mockSendRequest.mockResolvedValue({
        toUIMessageStreamResponse: vi.fn().mockReturnValue(mockStreamResponse),
      });

      const req = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { origin: "https://amrabed.com" },
      });
      const res = await POST(req);

      expect(await res.text()).toBe("mock stream");
    });

    it("should return 400 if user query is too long", async () => {
      mockIsRateLimited.mockResolvedValue(false);
      mockSendRequest.mockRejectedValue(new Error("Message is too long."));

      const req = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { origin: "https://amrabed.com" },
      });
      const res = await POST(req);

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toContain("Message is too long");
    });

    it("should return 500 on other errors", async () => {
      mockIsRateLimited.mockResolvedValue(false);
      mockSendRequest.mockRejectedValue(new Error("Internal API Error"));

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const req = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { origin: "https://amrabed.com" },
      });
      const res = await POST(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json.error).toBe("An error occurred. Please try again later.");
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("should handle non-Error catch block values safely", async () => {
      mockIsRateLimited.mockResolvedValue(false);
      mockSendRequest.mockRejectedValue("String error");

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const req = new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { origin: "https://amrabed.com" },
      });
      const res = await POST(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json.error).toBe("An error occurred. Please try again later.");

      consoleSpy.mockRestore();
    });
  });
});
