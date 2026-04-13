import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const flatCompat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...flatCompat.extends("eslint-config-next/core-web-vitals"),
  {
    ignores: ["**/.next/**", "**/out/**", "**/node_modules/**"],
  },
];

export default eslintConfig;
