import { FieldValue } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

import { embedMany } from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { adminDb } from "../src/lib/firebase";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const model = google.textEmbeddingModel("text-embedding-004");

async function deleteCollection(collectionPath: string) {
  if (!adminDb) throw new Error("adminDb is null");
  const collectionRef = adminDb.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(500);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(query: any, resolve: any) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    resolve();
    return;
  }

  if (!adminDb) throw new Error("adminDb is null");
  const batch = adminDb.batch();
  snapshot.docs.forEach((doc: any) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

function stringify(obj: any, indent = ""): string {
  if (obj === null || obj === undefined) return "";
  if (typeof obj === "string") return obj;
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);

  if (Array.isArray(obj)) {
    if (obj.every((i) => typeof i === "string")) {
      return obj.join(", ");
    }
    return obj.map((i) => stringify(i, indent + "  ")).join("\n" + indent);
  }

  if (typeof obj === "object") {
    return Object.entries(obj)
      .filter(
        ([, v]) =>
          v !== null &&
          v !== undefined &&
          v !== "" &&
          (Array.isArray(v) ? v.length > 0 : true),
      )
      .map(([k, v]) => `${indent}${k}: ${stringify(v, indent + "  ")}`)
      .join("\n");
  }

  return "";
}

function chunkText(text: string, maxLength = 2000): string[] {
  if (text.length <= maxLength) return [text];
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    chunks.push(remaining.substring(0, maxLength));
    remaining = remaining.substring(maxLength);
  }
  return chunks;
}

async function main() {
  const reset = process.argv.includes("--reset");
  if (reset) {
    console.log("Resetting knowledge collection...");
    await deleteCollection("knowledge");
  }

  const dataDir = path.join(process.cwd(), "src/data");
  const files = fs
    .readdirSync(dataDir)
    .filter(
      (f) => f.endsWith(".tsx") || f.endsWith(".ts") || f.endsWith(".json"),
    );

  console.log(`Found ${files.length} data files.`);

  const startTime = Date.now();
  let totalItems = 0;
  let totalChunks = 0;

  for (const file of files) {
    console.log(`Processing ${file}...`);
    let data;
    if (file.endsWith(".json")) {
      const content = fs.readFileSync(path.join(dataDir, file), "utf-8");
      data = JSON.parse(content);
    } else {
      const dataModule = await import(path.join(dataDir, file));
      data = dataModule.default || Object.values(dataModule)[0];
    }

    if (!Array.isArray(data)) {
      console.log(`Skipping ${file}: not an array.`);
      continue;
    }

    const items = data;
    totalItems += items.length;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const content = stringify(item);
      const chunks = chunkText(content);

      for (let j = 0; j < chunks.length; j += 10) {
        const batchChunks = chunks.slice(j, j + 10);

        const { embeddings } = await embedMany({
          model,
          values: batchChunks,
        });

        if (!adminDb) throw new Error("adminDb is null");
        const batch = adminDb.batch();
        for (let k = 0; k < batchChunks.length; k++) {
          const docRef = adminDb.collection("knowledge").doc();
          batch.set(docRef, {
            content: batchChunks[k],
            source: `${file}[${i}]`,
            embedding: FieldValue.vector(embeddings[k]),
          });
          totalChunks++;
        }
        await batch.commit();

        if (j + 10 < chunks.length) {
          await new Promise((r) => setTimeout(r, 500));
        }
      }
    }
    console.log(`Finished ${file}: ${items.length} items.`);
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(
    `Seeding complete! Items: ${totalItems}, Chunks: ${totalChunks}, Time: ${totalTime}s`,
  );
}

main().catch(console.error);
