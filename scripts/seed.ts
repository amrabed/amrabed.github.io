import { FieldValue } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

import { embedMany } from "ai";

import { adminDb } from "../src/middleware/firebase";
import { embeddingModel, googleOptions } from "../src/middleware/genai";

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

  // Skip React elements
  if (obj && typeof obj === "object" && obj.$$typeof) return "";

  if (Array.isArray(obj)) {
    if (obj.every((i) => typeof i === "string")) {
      return obj.join(", ");
    }
    return obj
      .map((i) => stringify(i, indent + "  "))
      .filter((s) => s !== "")
      .join("\n" + indent);
  }

  if (typeof obj === "object") {
    return Object.entries(obj)
      .map(([k, v]) => {
        const s = stringify(v, indent + "  ");
        return s ? `${indent}${k}: ${s}` : "";
      })
      .filter((s) => s !== "")
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
  const dryRun = process.argv.includes("--dry-run");

  if (dryRun) {
    console.log("Dry run enabled. No changes will be made to the database.");
  }

  if (reset && !dryRun) {
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

    let items: any[];
    if (Array.isArray(data)) {
      items = data;
    } else if (data && typeof data === "object") {
      items = Object.entries(data);
    } else {
      console.log(`Skipping ${file}: not an array or object.`);
      continue;
    }

    totalItems += items.length;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const content = stringify(item);
      const chunks = chunkText(content);

      for (let j = 0; j < chunks.length; j += 10) {
        const batchChunks = chunks.slice(j, j + 10);

        if (dryRun) {
          totalChunks += batchChunks.length;
          console.log(
            `[DRY RUN] Would process ${batchChunks.length} chunks for item ${i} from ${file}`,
          );
          continue;
        }

        const { embeddings } = await embedMany({
          model: embeddingModel,
          values: batchChunks,
          providerOptions: googleOptions,
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
