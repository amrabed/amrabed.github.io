# Optimization, Testing, Security, and Refactoring Plan

This plan outlines the approach to address the requested tasks, ensuring each task is isolated into a separate commit as requested.

## User Review Required

> [!IMPORTANT]  
> Please review the approach for the **CORS Header restriction** and **Rate Limiter Fix**. Let me know if you have specific domains for CORS, or if the `https://amrabed.com` default works.

## Open Questions

> [!WARNING]
>
> 1. For testing, are there any specific components from `src/components/` that you want me to prioritize? Otherwise, I will add basic rendering tests for components like `banner.tsx`, `footer.tsx`, `project.tsx`, `publication.tsx`, `skills.tsx`, `timeline.tsx`, and `unified-filter-bar.tsx`.
> 2. For CORS in `src/app/api/chat/response.ts`, is it acceptable to restrict origin to `https://amrabed.com` and `http://localhost:3000` instead of `*`?

## Proposed Changes

---

### 1. Remove Unused Imports

I will run `npx eslint --fix` (if an unused imports rule is configured) or write a custom script using `eslint` to find and remove all unused imports and import aliases across the `src/` directory.

#### [MODIFY] Multiple files across `src/`

---

### 2. Add Test Files

I will add basic `.test.tsx` files for components that currently lack them to increase coverage.

#### [NEW] `src/components/banner.test.tsx`

#### [NEW] `src/components/footer.test.tsx`

#### [NEW] `src/components/project.test.tsx`

#### [NEW] `src/components/publication.test.tsx`

#### [NEW] `src/components/skills.test.tsx`

#### [NEW] `src/components/timeline.test.tsx`

#### [NEW] `src/components/unified-filter-bar.test.tsx`

---

### 3. Fix Overly Permissive CORS Headers

The `CORS_HEADERS` currently allow `Access-Control-Allow-Origin: *`. I will restrict this to the application's origin, or check the request origin against an allowlist.

#### [MODIFY] `src/app/api/chat/response.ts`

- Update `CORS_HEADERS` to dynamically use the request's origin if it matches `https://amrabed.com` or `http://localhost:3000`, or fallback to `https://amrabed.com`.

---

### 4. Optimize Inefficient Code

I will implement the optimizations identified in the screenshots:

#### [MODIFY] `src/components/chat/message-bubble.tsx`

- Replace chained `.filter().map()` with a single `.reduce()` for parsing message parts.

#### [MODIFY] `src/utils/filter.ts`

- Pre-compute or avoid repetitive `.toLowerCase()` calls during iterative search by ensuring the `lowercaseQuery` is strictly used without modifying array items on every single pass if they are static, or optimize the loop.

#### [MODIFY] `src/components/featured-section-container.tsx`

- Replace the double `.filter()` array traversal with a `.reduce()` that splits the array in a single pass.

#### [MODIFY] `src/app/api/chat/request.ts`

- Replace chained `.filter().map()` with a `.reduce()` for mapping message text.

#### [MODIFY] `src/components/sections/skills.tsx`

- Replace `Object.keys(skillsData).forEach((s) => matchingSkills.add(s))` with `const matchingSkills = new Set(Object.keys(skillsData))`.

---

### 5. Address Rate Limit Bypass

The ratelimiter currently reads `x-forwarded-for` and blindly trusts the first IP (`split(",")[0]`). This is easily spoofed by clients sending a fake `x-forwarded-for` header, which proxies append to.

#### [MODIFY] `src/app/api/chat/ratelimit.ts`

- Change type of `req` to `NextRequest | Request`.
- Use the built-in Next.js `req.ip` which securely extracts the client IP on Vercel and similar hosting, falling back to `x-real-ip` or the _last_ appended IP in `x-forwarded-for` if `req.ip` is unavailable.

---

### 6. Refactor ChatWidgetClient

The `ChatWidgetClient` component is over 260 lines and mixes UI layout, chat state, resizing logic, and window event listeners.

#### [MODIFY] `src/components/chat/client.tsx`

- Extract chat state and side effects into a custom hook: `useChatWidget`.
- Extract internal UI components into separate files:
  - `chat-header.tsx`
  - `chat-input.tsx`
  - `chat-window.tsx`
- Recompose `client.tsx` to just glue the hook and smaller UI components together.

## Verification Plan

### Automated Tests

- `npm run test` or `pnpm test` to ensure all existing and newly added tests pass and coverage is maintained or improved.
- `npm run lint` and `npm run format` to ensure no linting or formatting errors are introduced.

### Manual Verification

- Review the `git diff` for each commit to ensure changes match the plan.
- Ensure the chat widget continues to open, close, and send messages without regression.
