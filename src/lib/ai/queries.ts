import { adminDb } from "../firebase";

export async function findSimilarChunks(embedding: number[], topK = 4) {
  if (!adminDb) {
    console.error("adminDb is not initialized");
    return [];
  }
  const collection = adminDb.collection("knowledge");

  const snapshot = await collection
    .findNearest("embedding", embedding, {
      limit: topK,
      distanceMeasure: "COSINE",
    })
    .get();

  return snapshot.docs.map((doc) => ({
    content: doc.data().content as string,
    source: doc.data().source as string,
  }));
}
