import { gateway } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

const embeddingModel = google.embeddingModel("gemini-embedding-001");
const chatModel = gateway("google/gemini-2.0-flash");

const googleOptions = {
  google: {
    outputDimensionality: 1536,
    taskType: "SEMANTIC_SIMILARITY",
  },
};

export { google, googleOptions, embeddingModel, chatModel };
