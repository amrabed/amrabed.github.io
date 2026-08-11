# Agent Instructions

## Git Workflow

When manipulating Git history and branches:

- Always rebase over merge commits when bringing a feature branch up to date with `main` (i.e. `git rebase main`).
- Always use a squash merge (or `squash and merge`) over regular merges when merging a feature branch into `main` (i.e. `git merge --squash feature-branch`). This keeps the commit history clean.

## Development Tasks

- Always use `mise` tasks instead of running package managers directly. Use `mise run <task>` (e.g., `mise run install`, `mise run format`, `mise run lint`, `mise run test`, `mise run verify`) to ensure correct tooling versions and dependencies are used.

## Tech Stack & Conventions

- **Framework**: Use Next.js with the App Router (`src/app`).
- **Styling**: Use Tailwind CSS for component styling.
- **Testing**: Use Vitest for unit and component testing. Place test files adjacent to their source files (e.g., `component.test.tsx`).
- **Package Manager**: The underlying package manager is `pnpm`, but you should interface with it via `mise`.
