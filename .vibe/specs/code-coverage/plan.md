# Plan for Code Coverage and Unit Testing

1. **Reorganize Code Elements**
   - Move `src/filter.tsx` -> `src/utils/filter.ts`.
   - Rename `src/middleware` -> `src/lib`.
   - Update imports in components and API routes.

2. **Testing Framework Setup**
   - Install `vitest`, `@vitest/coverage-v8`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`.
   - Add `vitest.config.ts` and `vitest.setup.ts`.
   - Update `package.json` with scripts for test execution and coverage generation.
   - Add test command to `mise.toml` and verify workflow.

3. **Writing Unit Tests**
   - Write tests for filter helpers in `src/utils/filter.ts`.
   - Write tests for contexts (`search`, `filter`, `theme`, etc.) and hooks.
   - Write tests for API route logic (rate limit check, requests, responses).
   - Write tests for common UI components (`EmptyState`, `IconLink`, `Social`, etc.).

4. **Code Coverage and Badge Generation**
   - Run Vitest with coverage.
   - Setup a scripts task to parse the coverage report and generate/update the coverage badge.
   - Link the badge in `README.md`.
