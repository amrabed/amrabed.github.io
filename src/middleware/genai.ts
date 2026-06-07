import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

const embeddingModel = google.embeddingModel("gemini-embedding-001");
const chatModel = google("gemini-3.1-flash-lite");

export { google, embeddingModel, chatModel };
