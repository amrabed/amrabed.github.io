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

## 6. UX Enhancements: Copy, Edit, and Interrupt Agent Buttons
- **Robust Message Extraction**: Fixed message copy and edit actions to check `m.content` (standard text string) with fallback logic to `m.parts` extraction. This ensures messages can always be copied and edited without typescript/runtime errors.
- **Mobile-Accessible Action Layout**: Made message action buttons (Copy/Edit) touch-friendly with standard spacing, visible at `opacity-90` on mobile screens (where hover is unavailable) while maintaining the hover transition on desktop, and repositioned them to float symmetrically to the left of the user's question bubble and to the right of the assistant's answer bubble. The message bubble max-width was set to `80%` to ensure plenty of spacing on narrow mobile displays.
- **Interrupt Agent Button**: Integrated a sticky floating "Stop Generating" button with a Stop/Square icon that sticks to the bottom of the chat log area while the response is streaming or loading. This gives the user an intuitive and instant way to interrupt generating answers.
- **Performance Optimizations**: Extracted the `ReactMarkdown` rendering components to a module-level constant to prevent component re-instantiation and re-rendering on every typing stream chunk.
- **Text Selection Gestures**: Added explicit `select-text` and `cursor-text` styles to allow smooth selection of individual words by drag/tap on mobile and desktop. Integrated a custom `onDoubleClick` / double-tap handler that automatically selects the full text content of the message bubble (excluding floating action buttons).
- **Assistant Naming & Persona (Miro)**: Named the AI assistant "Miro". The assistant header is updated to `"Miro — Amr's Assistant"` and the introductory empty state greeting welcomes the user on Miro's behalf. The API route prompt has been updated to instruct the model to introduce itself as Miro, refer to itself as Miro, and answer questions about Amr in the third person.
- **Mobile Layout & Overlap Prevention**: Shifted the vertical bottom position of both the chat widget parent container and the scroll-to-top button container to `bottom-20` on mobile viewports (`< 768px`). This pushes them exactly `80px` above the screen edge, clearing the sticky `UnifiedFilterBar` (which is `~62px` high) and preventing any overlap. On desktops, they remain at `bottom-6` (`24px`). Additionally, changed the chat window container width to `w-[calc(100vw-32px)]` and height to `h-[400px]` on mobile to fit nicely within narrow screens.
