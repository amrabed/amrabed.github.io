## Amr Abed's Personal Website

[![Website](https://img.shields.io/website-up-down-brightgreen-red/https/amrabed.com.svg?label=amrabed.com)](https://amrabed.com)
[![](https://sonarcloud.io/api/project_badges/measure?project=amrabed.github.io&metric=coverage&organization=amr-abed)](https://sonarcloud.io/project/overview?id=amrabed.github.io)
[![](https://sonarcloud.io/api/project_badges/measure?project=amrabed.github.io&metric=alert_status&organization=amr-abed)](https://sonarcloud.io/project/overview?id=amrabed.github.io)
[![GitHub issues](https://img.shields.io/github/issues/amrabed/amrabed.github.io.svg)](https://github.com/amrabed/amrabed.github.io/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Vercel AI Gateway & Environment Setup

The AI assistant uses **assistant-ui** on the frontend and connects to **Vercel AI Gateway** on the backend using the `@ai-sdk/google` provider / Vercel AI SDK (`gateway("google/gemini-2.0-flash")`).

### Vercel Dashboard Configuration

To enable and configure Vercel AI Gateway for your deployment:

1. **Enable AI Gateway in Vercel:**
   - Go to your project settings in the [Vercel Dashboard](https://vercel.com/dashboard).
   - Navigate to the **AI** section or **AI Gateway** settings tab.
   - Enable **AI Gateway** for your project.

2. **Configure API Keys & Environment Variables:**
   - Navigate to **Settings** > **Environment Variables** in your Vercel project dashboard.
   - Add `GOOGLE_GENERATIVE_AI_API_KEY`: Set this to your Google AI Studio API key (from [aistudio.google.com](https://aistudio.google.com)).
   - Add `AI_GATEWAY_API_KEY` (if using OIDC authentication / custom gateway credentials for Vercel AI Gateway).
   - Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for rate limiting (from [console.upstash.com](https://console.upstash.com)).

3. **Deploy / Redeploy:**
   - Redeploy the project so Vercel injects the environment variables and enables AI Gateway routing for `/api/chat`.
