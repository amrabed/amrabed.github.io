# Walkthrough - AI Assistant Optimization & Deployment Setup

We have completed the optimization and deployment updates for the portfolio AI Assistant. Here is a summary of the improvements and changes made:

## 1. Architectural Optimization: Direct Context Injection (Replacing RAG)
Instead of querying Firestore (which had a ~45 KB index) via embeddings and vector search:
- **Direct Imports**: The API route handler (`src/app/api/chat/route.ts`) now imports all data files from `src/data/` directly.
- **Consolidation**: A helper function `getConsolidatedContext()` aggregates profile data, work experiences, certifications, education, skills, projects, and publications into a structured text profile.
- **System Prompt Injection**: This text profile (~10,000 characters or ~2,500 tokens) is passed directly in the LLM's system prompt. Since the dataset is extremely small, this completely fits within the model's large context window (1 million tokens for Gemini 1.5 Flash).
- **Latency & Cost Reductions**: This eliminates the extra embedding API request and the Firestore database read, speeding up response times and reducing run-time costs.
- **No Database Dependencies**: Deleted the database seeding scripts (`scripts/seed.ts`, `.github/workflows/seed.yml`), Firestore middleware (`src/middleware/firebase.ts`), and removed the requirement for Firebase Service Account Credentials (`firebase-key.json`). The application is now completely database-independent.

## 2. Dynamic Build Output mode
Modified `next.config.mjs` to dynamically configure the output target based on the environment:
- For static deployments (GitHub Pages), setting the environment variable `NEXT_EXPORT=true` triggers `output: "export"`.
- For local development and Firebase Hosting, `output: undefined` (dynamic mode) is used.

## 3. Firebase Web Frameworks Deployment
Enabled Firebase's built-in framework integration to automatically compile and deploy Next.js dynamic routing:
- Modified `firebase.json` to change the hosting directory from the static `out` folder to the framework-aware source root directory (`source: "."`).
- Updated `mise.toml` to automatically enable the `webframeworks` experiment on the Firebase CLI before running the deployment task (`firebase experiments:enable webframeworks`).
- Environment variables (`GOOGLE_GENERATIVE_AI_API_KEY`, etc.) passed in `.github/workflows/firebase.yml` will now be automatically set on the Cloud Function created by Firebase CLI.

## 4. GitHub Pages Static Build Update
- Updated `.github/workflows/deploy.yml` to inject `NEXT_EXPORT: "true"` during `pnpm run build` to output the static files to `out` for upload and deployment.

## 5. Client Routing & CORS Support
- **Dynamic Endpoint Determination**: In `src/components/ai-chat/ChatWidgetClient.tsx`, `useChat()` is configured to check `window.location.hostname`. If running on GitHub Pages (statically at `amrabed.com` or `*.github.io`), it queries the live Firebase Hosting backend (`https://amr-abed.web.app/api/chat`). Otherwise, it uses the relative `/api/chat` path.
- **CORS Configuration**: Implemented a dynamic CORS checking system in `src/app/api/chat/route.ts` that allows requests originating from localhost, `*.github.io`, `amrabed.com`, and `*.web.app` (including Firebase preview channels), and handles preflight `OPTIONS` requests successfully.
