# Checklist: AI Assistant Optimization & Deployment Setup

- [x] Task 1: Update Next.js config to support conditional export (`next.config.mjs`).
- [x] Task 2: Configure Firebase Hosting for Web Frameworks (`firebase.json`).
- [x] Task 3: Update GitHub Actions workflows (`firebase.yml`, `deploy.yml`).
- [x] Task 4: Implement direct context injection and CORS in the API route (`src/app/api/chat/route.ts`).
- [x] Task 5: Remove Firestore database files and seeding scripts (`src/middleware/firebase.ts`, `scripts/seed.ts`, `seed.yml`).
- [x] Task 6: Add dynamic API endpoint determination in the client (`src/components/ai-chat/ChatWidgetClient.tsx`).
- [x] Task 7: Verify builds and run local check.
- [x] Task 8: Extract `ReactMarkdown` custom components to module scope in `ChatWidgetClient.tsx` to optimize performance.
- [x] Task 9: Make message copy and edit actions robust using `messageText` fallback.
- [x] Task 10: Enhance copy/edit action panel layout for mobile-friendliness and touch support.
- [x] Task 11: Add a sticky floating "Stop Generating" / Interrupt button inside the message container during generation.
- [x] Task 12: Enable click/tap gestures to select a word (via select-text and cursor-text CSS styling) or full text (via double-click/double-tap handler) in message bubbles.
- [x] Task 13: Name the assistant "Miro" and configure the system prompt to speak in the third person on Amr's behalf.
- [x] Task 14: Adjust vertical position of the chat widget toggle and scroll-to-top buttons on mobile viewports to float above the bottom search/filter bar.
- [x] Task 15: Integrate dynamic sliding transitions to animate the vertical positions of both Miro and the scroll-to-top buttons dynamically when the search bar is shown or hidden.
- [x] Task 16: Refactor components directory: rename `ai-chat` to `chat`, main file to `index.tsx`, and client logic file to `client.tsx` to optimize import paths and project structure.
