# Requirements for AI Agent

## Overview
Add an AI assistant to the portfolio website to answer questions about Amr Abed's experiences, skills, tools, projects, and certifications using RAG (Retrieval-Augmented Generation) with data from the project's data files.

## Technical Stack
- **Framework**: Next.js 15 (App Router)
- **AI SDK**: Vercel AI SDK (`ai`)
- **Model**: Google Gemini (`@ai-sdk/google`, model `gemma-4-27b-it`)
- **Embeddings**: `@ai-sdk/google` (model `text-embedding-004`)
- **Database/Vector Store**: Firebase Firestore (Vector Search)
- **Rate Limiting**: Upstash Redis (`@upstash/ratelimit`, `@upstash/redis`)
- **UI**: Tailwind CSS, HeroUI v3 components, Lucide icons, `react-markdown`

## Functional Requirements
- **Chat Interface**: A floating chat widget accessible from any page.
- **RAG Capability**: The agent must retrieve relevant context from the portfolio data to answer queries accurately.
- **Rate Limiting**: 10 requests per day per IP to prevent abuse.
- **Markdown Support**: AI responses should support markdown formatting.
- **Accessibility**: ARIA labels, keyboard navigation (Escape to close), and focus management.
- **Seeding**: A script to process data files, generate embeddings, and store them in Firestore.
- **CI/CD**: Automated re-seeding of the vector store on production deployments.

## Security Requirements
- Protect against reverse tabnabbing in links.
- Securely handle API keys via environment variables.
- Use Firebase Admin SDK for server-side operations.
