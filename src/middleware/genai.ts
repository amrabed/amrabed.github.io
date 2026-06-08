import {
  createGoogleGenerativeAI,
  GoogleEmbeddingModelOptions,
} from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

const embeddingModel = google.embeddingModel("gemini-embedding-001");
const chatModel = google("gemini-flash-lite-latest");

const googleOptions = {
  google: {
    outputDimensionality: 1536,
    taskType: "SEMANTIC_SIMILARITY",
  } satisfies GoogleEmbeddingModelOptions,
};

export { google, googleOptions, embeddingModel, chatModel };
