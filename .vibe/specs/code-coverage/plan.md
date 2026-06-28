# Implementation Plan - Unit Testing and Code Reorganization

This plan outlines the steps to add a unit testing framework (Vitest), reorganize codebase elements for a cleaner structure, write unit tests targeting ~100% coverage, and add a coverage badge to the README.

## Proposed Changes

### Reorganization

To clean up the project structure, we will:
1. Move `src/filter.tsx` (which is a pure utility file with no React/JSX component logic) to `src/utils/filter.ts` (with a `.ts` extension).
2. Rename `src/middleware` to `src/lib` because the files within it (`genai.ts`, `upstash.ts`) are database/API initializations, not Next.js middleware.
3. Update all imports referencing `@/filter` and `@/middleware`.

### Testing Setup

 We will configure **Vitest** since it is fast, supports TypeScript natively, works seamlessly with Next.js, and integrates well with `@testing-library/react` and `jsdom`.

1. **Install dev dependencies**:
   - `vitest` (test runner)
   - `@vitest/coverage-v8` (coverage provider)
   - `@vitejs/plugin-react` (Vite React plugin for JSX compilation)
   - `@testing-library/react` & `@testing-library/jest-dom` (React component testing)
   - `jsdom` (browser environment simulation)

2. **Add Configuration Files**:
   - [vitest.config.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/vitest.config.ts)
   - [vitest.setup.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/vitest.setup.ts) (for Jest DOM matches setup)

3. **Update Scripts**:
   - Add `"test": "vitest run --coverage"` to `package.json`
   - Add a task to `mise.toml` to run tests during local verification (`mise run verify`)

4. **Write Tests**:
   We will write tests for:
   - **Utilities**: `src/utils/filter.ts`
   - **API Routes**: `src/app/api/chat/ratelimit.ts`, `src/app/api/chat/request.ts`, `src/app/api/chat/response.ts`, `src/app/api/chat/route.ts`
   - **Contexts**: `src/contexts/search.tsx`, `src/contexts/filter.tsx`, `src/contexts/theme.tsx`, `src/contexts/suspense.tsx`, `src/contexts/sync.tsx`, `src/contexts/header.tsx`
   - **Components**: `EmptyState`, `IconLink`, `SectionItemCard`, `Section`, `Footer`, `UpArrow`, `Social`

5. **Generate & Link Coverage Badge**:
   - Run the tests to generate `coverage/coverage-summary.json`.
   - Update `README.md` to include a shields.io badge representing the test coverage.

---

### File Modifications

#### [MODIFY] [package.json](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/package.json)
- Add Vitest, testing library, and jsdom dependencies to `devDependencies`.
- Add `"test": "vitest run --coverage"` to scripts.

#### [MODIFY] [mise.toml](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/mise.toml)
- Add `test` task.
- Update `verify` task dependencies to include `test`.

#### [NEW] [vitest.config.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/vitest.config.ts)
- Configure Vitest testing environment with JSdom, setup files, path aliases (`@/*`), and coverage exclusions.

#### [NEW] [vitest.setup.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/vitest.setup.ts)
- Import `@testing-library/jest-dom/vitest`.

#### [NEW] [filter.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/utils/filter.ts)
- Copy contents of `src/filter.tsx` with corrected types/extensions.

#### [DELETE] [filter.tsx](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/filter.tsx)
- Remove old file path.

#### [MODIFY] [filterable-section.tsx](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/components/filterable-section.tsx)
- Update import path for filter helpers to `@/utils/filter`.

#### [NEW] [genai.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/lib/genai.ts)
- Move from `src/middleware/genai.ts`.

#### [NEW] [upstash.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/lib/upstash.ts)
- Move from `src/middleware/upstash.ts`.

#### [DELETE] [genai.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/middleware/genai.ts)
- Remove old file path.

#### [DELETE] [upstash.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/middleware/upstash.ts)
- Remove old file path.

#### [MODIFY] [request.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/app/api/chat/request.ts)
- Update import path for genai to `@/lib/genai`.

#### [MODIFY] [ratelimit.ts](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/src/app/api/chat/ratelimit.ts)
- Update import path for upstash to `@/lib/upstash`.

#### [MODIFY] [README.md](file:///Users/amrabed/Library/CloudStorage/OneDrive-Personal/code/amrabed.com/README.md)
- Add a shields.io coverage badge.

#### [NEW] `src/tests/*`
- Write unit tests for our utils, contexts, hooks, APIs, and components.

---

## Verification Plan

### Automated Tests
- Run `pnpm install`
- Run `pnpm run test` or `mise run test` to verify all tests pass and coverage is close to 100%.
- Run `pnpm run lint` and `tsc --noEmit` to ensure there are no compilation or syntax issues.
