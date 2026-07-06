import { convertToModelMessages, streamText } from "ai";

import { chatModel } from "@/lib/genai";

import { systemPrompt } from "./prompt";

export default async function sendRequest(request: Request) {
  const body = await request.json();
  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    throw new Error("Invalid request: messages must be an array.");
  }

  const modelMessages = await convertToModelMessages(messages);
  const lastMessage = modelMessages[modelMessages.length - 1];

  const userQuery =
    typeof lastMessage.content === "string"
      ? lastMessage.content
      : lastMessage.content.reduce(
          (acc, c) => (c.type === "text" ? acc + c.text : acc),
          "",
        );

  if (userQuery.length > 10000) {
    throw new Error("Message is too long (maximum 10,000 characters).");
  }

  const recentMessages = modelMessages.slice(-6);
  const result = streamText({
    model: chatModel,
    messages: recentMessages,
    system: systemPrompt,
  });

  return result;
}
