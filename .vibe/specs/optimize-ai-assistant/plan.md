# AI Assistant Deployment & Architecture Optimization Plan

The goal is to fix the AI assistant so it works seamlessly on local, Firebase Hosting (previews and production), and GitHub Pages, while optimization is applied to make the architecture simpler, faster, and more robust.

## User Review Required

We recommend making the following key architectural changes to simplify the application, reduce latency, and ensure it works across all deployment environments:

1. **Move from RAG (Firestore Vector Database) to Direct Context Injection**:
   > [!IMPORTANT]
   > Amr's entire portfolio data (`src/data/*.ts*`) is extremely small (~45 KB of text, or ~10,000 tokens). Using a vector database (RAG) for this dataset size is over-engineered.
   >
   > **Proposed Solution**: Remove the Firestore vector database dependencies, seeding scripts, and GCP credentials entirely. Instead, import the data files directly in the API route, consolidate them into a text context block, and pass the entire context directly to Gemini (which has a 1 million token context window).
   >
   > **Benefits**:
   > - **Speed**: Cuts API latency in half (no query embeddings, no database lookups).
   > - **Zero Database Setup**: No need to seed Firestore, create vector indexes, or manage credentials (`firebase-key.json`).
   > - **Better Accuracy**: The LLM has access to the *complete* portfolio, allowing it to cross-reference experiences, projects, and skills with 100% accuracy, instead of retrieving only the top 4 semantic chunks.

2. **Conditional Next.js Output Mode**:
   > [!NOTE]
   > Currently, `next.config.mjs` has `output: "export"` hardcoded. This disables Next.js API routes at build time, causing the `/api/chat` route to be missing.
   >
   > **Proposed Solution**: Make `output` conditional on the environment. For GitHub Pages builds, we will export a static site. For Firebase Hosting, we will deploy it as a dynamic Next.js app with functional API routes.

3. **Deploy API Routes on Firebase Hosting**:
   > [!NOTE]
   > We will configure Firebase Hosting to build and deploy Next.js dynamically using its built-in Web Frameworks integration (`source: "."`). This will deploy the `/api/chat` route as a Cloud Function automatically, enabling previews and production dynamic routing.

4. **Client-Side API Routing**:
   > [!IMPORTANT]
   > Because GitHub Pages is strictly static, `/api/chat` will return 404 on the GitHub Pages domain. We will configure the client-side chat widget to check the current domain. If running on GitHub Pages (e.g., `amrabed.com` or `*.github.io`), it will fetch from the Firebase Hosting URL (`https://amr-abed.web.app/api/chat`). Otherwise, it will fetch from `/api/chat` relatively. We will configure the API route to support CORS for the GitHub Pages domain.

## Open Questions

No open questions.

## Proposed Changes

### Next.js Configuration

#### [MODIFY] [next.config.mjs](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/next.config.mjs)
- Modify the `output` configuration to be conditional on `process.env.NEXT_EXPORT === "true"`.

### Firebase Deployment Configuration

#### [MODIFY] [firebase.json](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/firebase.json)
- Change `"public": "out"` to `"source": "."` to enable Firebase's Web Frameworks integration.
- Keep standard ignore files.

#### [MODIFY] [.github/workflows/firebase.yml](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/.github/workflows/firebase.yml)
- Enable the experimental `webframeworks` feature on the Firebase CLI before deploying.

#### [MODIFY] [.github/workflows/deploy.yml](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/.github/workflows/deploy.yml)
- Inject `NEXT_EXPORT=true` in the build step to ensure GitHub Pages deployment compiles statically into `/out`.

### AI Backend Optimization

#### [MODIFY] [src/app/api/chat/route.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/app/api/chat/route.ts)
- Import data files from `src/data/` directly.
- Build a helper function `getConsolidatedContext()` to turn these files into a structured profile text.
- Remove `@/middleware/firebase` and embedding model calls.
- Include the consolidated context in the `systemPrompt`.
- Add CORS header logic to allow requests from the GitHub Pages domains (`amrabed.com` and `amrabed.github.io`).

#### [DELETE] [src/middleware/firebase.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/middleware/firebase.ts)
- Remove the unused Firebase Admin Firestore database connection.

#### [DELETE] [scripts/seed.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/scripts/seed.ts)
- Remove the database seeding script as it is no longer required.

#### [DELETE] [.github/workflows/seed.yml](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/.github/workflows/seed.yml)
- Remove the seeding workflow from CI/CD.

### AI Client Optimization

#### [MODIFY] [src/components/ai-chat/ChatWidgetClient.tsx](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/components/ai-chat/ChatWidgetClient.tsx)
- Pass a dynamic `api` endpoint to `useChat()`: if the site is running on a GitHub Pages domain (`amrabed.com` or `*.github.io`), use `https://amr-abed.web.app/api/chat`, otherwise use relative `/api/chat`.

## Verification Plan

### Automated Tests
- Build and run the project locally with `pnpm dev` to check that the `/api/chat` endpoint answers questions using the full context.
- Test static build using `NEXT_EXPORT=true pnpm run build` to verify it successfully builds the static site to the `out` directory.

### Manual Verification
- Deploy to Firebase preview and verify the assistant answers questions.
- Test the chat widget locally by mocking the hostname to simulate GitHub Pages and verify it redirects requests to the Firebase Hosting endpoint.
