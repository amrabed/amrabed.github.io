# Requirements for Code Coverage and Unit Testing

## Overview
Implement a comprehensive unit testing setup using Vitest to achieve close to 100% test coverage. Add a coverage badge to the README.md and reorganize components/utilities/middleware for a cleaner, more modular structure.

## Technical Stack
- **Test Runner**: Vitest
- **Coverage Tool**: `@vitest/coverage-v8`
- **React Testing**: `@testing-library/react`, `@testing-library/jest-dom`
- **DOM Environment**: `jsdom`

## Functional Requirements
- Setup testing commands in `package.json` (`pnpm run test` and `pnpm run test:coverage`).
- Setup a verify step in `mise.toml` that runs tests.
- Move helper files to appropriate structures:
  - `src/filter.tsx` -> `src/utils/filter.ts`
  - `src/middleware/` -> `src/lib/`
- Achieve close to 100% coverage on:
  - Utility helpers (`src/utils/filter.ts`)
  - API Routes/Handlers (`src/app/api/chat/*`)
  - Contexts & custom hooks (`src/contexts/*`)
  - UI Components (`src/components/empty-state.tsx`, `src/components/icon-link.tsx`, `src/components/section-item-card.tsx`, `src/components/upArrow.tsx`, etc.)
- Add a dynamically generated or updated coverage badge to the `README.md`.
