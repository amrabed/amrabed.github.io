# AI Assistant Deployment & Architecture Optimization Plan

The goal is to fix the AI assistant so it works seamlessly on local, Firebase Hosting (previews and production), and GitHub Pages, while optimization is applied to make the architecture simpler, faster, and more robust.

## Proposed Changes

1. **Move from RAG (Firestore Vector Database) to Direct Context Injection**:
   - Amr's entire portfolio data (`src/data/*.ts*`) is extremely small (~45 KB of text, or ~10,000 tokens). Using a vector database (RAG) for this dataset size is over-engineered.
   - **Proposed Solution**: Remove the Firestore vector database dependencies, seeding scripts, and GCP credentials entirely. Instead, import the data files directly in the API route, consolidate them into a text context block, and pass the entire context directly to Gemini (which has a 1 million token context window).
   - **Benefits**:
     - **Speed**: Cuts API latency in half (no query embeddings, no database lookups).
     - **Zero Database Setup**: No need to seed Firestore, create vector indexes, or manage credentials (`firebase-key.json`).
     - **Better Accuracy**: The LLM has access to the *complete* portfolio, allowing it to cross-reference experiences, projects, and skills with 100% accuracy, instead of retrieving only the top 4 semantic chunks.

2. **Conditional Next.js Output Mode**:
   - Currently, `next.config.mjs` has `output: "export"` hardcoded. This disables Next.js API routes at build time, causing the `/api/chat` route to be missing.
   - **Proposed Solution**: Make `output` conditional on the environment. For GitHub Pages builds, we will export a static site. For Firebase Hosting, we will deploy it as a dynamic Next.js app with functional API routes.

3. **Deploy API Routes on Firebase Hosting**:
   - We will configure Firebase Hosting to build and deploy Next.js dynamically using its built-in Web Frameworks integration (`source: "."`). This will deploy the `/api/chat` route as a Cloud Function automatically, enabling previews and production dynamic routing.

4. **Client-Side API Routing**:
   - Because GitHub Pages is strictly static, `/api/chat` will return 404 on the GitHub Pages domain. We will configure the client-side chat widget to check the current domain. If running on GitHub Pages (e.g., `amrabed.com` or `*.github.io`), it will fetch from the Firebase Hosting URL (`https://amr-abed.web.app/api/chat`). Otherwise, it will fetch from `/api/chat` relatively. We will configure the API route to support CORS for the GitHub Pages domain.
