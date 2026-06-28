import { describe, expect, it, vi } from "vitest";

import sendRequest from "./request";

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

describe("sendRequest", () => {
  it("should stream text for valid messages slice", async () => {
    const messages = [
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
      { role: "user", content: "query" },
    ];

    mockConvertToModelMessages.mockResolvedValue([
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
      { role: "user", content: "query" },
    ]);
    mockStreamText.mockReturnValue("mock-stream-result");

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    });

    const result = await sendRequest(req);

    expect(mockConvertToModelMessages).toHaveBeenCalledWith(messages);
    expect(mockStreamText).toHaveBeenCalledWith({
      model: "mock-chat-model",
      messages: [
        { role: "user", content: "hello" },
        { role: "assistant", content: "hi" },
        { role: "user", content: "query" },
      ],
      system: "mock-system-prompt",
    });
    expect(result).toBe("mock-stream-result");
  });

  it("should parse non-string content in user message", async () => {
    const messages = [{ role: "user", content: "hello" }];

    mockConvertToModelMessages.mockResolvedValue([
      {
        role: "user",
        content: [
          { type: "text", text: "part1" },
          { type: "image" },
          { type: "text", text: "part2" },
        ],
      },
    ]);
    mockStreamText.mockReturnValue("mock-stream-result");

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    });

    await sendRequest(req);

    expect(mockStreamText).toHaveBeenCalled();
  });

  it("should throw an error if the user query is too long", async () => {
    mockConvertToModelMessages.mockResolvedValue([
      { role: "user", content: "a".repeat(10001) },
    ]);

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
    });

    await expect(sendRequest(req)).rejects.toThrow(
      "Message is too long (maximum 10,000 characters).",
    );
  });

  it("should only send the last 6 messages", async () => {
    const allMessages = Array.from({ length: 10 }, (_, i) => ({
      role: "user",
      content: `msg ${i}`,
    }));

    mockConvertToModelMessages.mockResolvedValue(allMessages);

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
    });

    await sendRequest(req);

    expect(mockStreamText).toHaveBeenCalledWith({
      model: "mock-chat-model",
      messages: allMessages.slice(-6),
      system: "mock-system-prompt",
    });
  });
});
