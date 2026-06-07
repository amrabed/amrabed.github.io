import { convertToModelMessages, embed, streamText } from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { findSimilarChunks } from "@/lib/ai/queries";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 d"),
});

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const embeddingModel = google.textEmbeddingModel("text-embedding-004");
const chatModel = google("gemini-1.5-flash");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({
        error: "You've reached the daily limit. Come back tomorrow!",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  const { messages } = await req.json();
  const modelMessages = await convertToModelMessages(messages);
  const lastMessage = modelMessages[modelMessages.length - 1];

  const userQuery =
    typeof lastMessage.content === "string"
      ? lastMessage.content
      : lastMessage.content
          .filter((c) => c.type === "text")
          .map((c) => c.text)
          .join("");

  if (userQuery.length > 500) {
    return new Response(JSON.stringify({ error: "Message too long." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const recentMessages = modelMessages.slice(-6);

  const { embedding } = await embed({
    model: embeddingModel,
    value: userQuery,
  });

  const chunks = await findSimilarChunks(embedding, 4);
  const context = chunks
    .map((c, i) => `[${i + 1}] ${c.content} (source: ${c.source})`)
    .join("\n\n");

  const systemPrompt = `You are an AI assistant on Amr Abed's personal portfolio website.
Amr is a software engineer and cloud architect based in Kitchener, Ontario, specializing in AWS, AI/ML, and full-stack web development with React and Next.js.

Answer questions about Amr's experience, skills, projects, and professional background using ONLY the context provided below.
If the answer is not in the context, say: 'I don't have that detail handy — feel free to reach out to Amr directly through the contact section.' Never fabricate projects, skills, or experience.
Keep answers to 3–4 sentences, friendly and professional in tone.

Context:
${context}`;

  const result = streamText({
    model: chatModel,
    messages: recentMessages,
    system: systemPrompt,
  });

  return result.toUIMessageStreamResponse();
}
