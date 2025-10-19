import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "eslint/config";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const flatCompat = new FlatCompat({ baseDirectory: __dirname });

export default defineConfig([
  ...flatCompat.extends("eslint-config-next/core-web-vitals"),
]);
