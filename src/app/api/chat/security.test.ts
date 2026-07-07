import { describe, expect, it, vi } from "vitest";
import sendRequest from "./request";
import isRateLimited from "./ratelimit";

const mockStreamText = vi.fn();
const mockConvertToModelMessages = vi.fn();

vi.mock("ai", () => ({
  streamText: (options: any) => mockStreamText(options),
  convertToModelMessages: (messages: any) =>
    mockConvertToModelMessages(messages),
}));

vi.mock("@/lib/genai", () => ({
  chatModel: "mock-chat-model",
}));

vi.mock("./prompt", () => ({
  systemPrompt: "mock-system-prompt",
}));

const mockLimit = vi.fn();
vi.mock("@/lib/upstash", () => ({
  ratelimit: {
    limit: (ip: string) => mockLimit(ip),
  },
}));

describe("Security fixes verification", () => {
  describe("sendRequest crash on empty messages", () => {
    it("should not crash when messages array is empty", async () => {
      mockConvertToModelMessages.mockResolvedValue([]);

      const req = new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [] }),
      });

      // Expect it to throw a proper validation error instead of TypeError
      await expect(sendRequest(req)).rejects.toThrow("Invalid request: messages must be an array and cannot be empty.");
    });
  });

  describe("isRateLimited IP prioritization", () => {
    it("should prioritize x-real-ip over x-forwarded-for", async () => {
      mockLimit.mockResolvedValue({ success: true });

      const req = new Request("http://localhost/api/chat", {
        headers: {
          "x-forwarded-for": "1.1.1.1",
          "x-real-ip": "2.2.2.2"
        },
      });

      await isRateLimited(req);
      expect(mockLimit).toHaveBeenCalledWith("2.2.2.2");
    });
  });
});
