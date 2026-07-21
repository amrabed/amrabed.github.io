import path from "node:path";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov", "json-summary"],
      include: [
        "src/utils/filter.ts",
        "src/contexts/**",
        "src/app/api/chat/ratelimit.ts",
        "src/app/api/chat/request.ts",
        "src/app/api/chat/response.ts",
        "src/app/api/chat/route.ts",
        "src/components/empty-state.tsx",
        "src/components/icon-link.tsx",
        "src/components/section-item-card.tsx",
        "src/components/section.tsx",
        "src/components/social.tsx",
        "src/components/upArrow.tsx",
        "src/components/filterable-section.tsx",
        "src/components/featured-section-container.tsx",
        "src/components/header.tsx",
        "src/components/chat/client.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
