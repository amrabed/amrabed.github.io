# Phase 2 Action Plan Tasks

## Step 1: Quick Fixes (High Impact, Low Effort)

- [x] **Task 1: Fix Social Links (`rel="me"`)**
  - Refactor `src/components/social.tsx` to render an actual `<a href="..." rel="noopener noreferrer me" target="_blank">` tag instead of relying solely on `window.open` inside the Button.

- [x] **Task 2: Add Card Anchors (Deep Linking)**
  - Add `id={project.id}` to the `Card` components in `src/components/project.tsx`, `src/components/publication.tsx`, and others to enable direct deep linking (e.g., `amrabed.com/#sophi-paywall`).

- [x] **Task 3: Create Custom 404**
  - Create `src/app/not-found.tsx` with a simple branded message and a button redirecting back to `/`.

## Step 2: Event Tracking Integration

- [x] **Task 4: Implement Custom Events & Cleanup**
  - Use the `sendGAEvent` function from `@next/third-parties/google` to track:
    - CTA button clicks in `hero.tsx`.
    - Outbound link clicks in `project.tsx`.
    - Filter selection changes in `unified-filter-bar.tsx`.
  - Uninstall `react-ga4` from `package.json` since `@next/third-parties/google` is handling GA natively.

## Step 3: Architecture & Content (Medium Effort)

- [x] **Task 5: Add Presentations Section**
  - Add a `presentations` array to `src/data/resume.json`.
  - Create a `presentations.tsx` section to render them, similar to `projects.tsx` or `publications.tsx`.
  - Add the new section to `page.tsx`.

- [ ] **Task 6: Create Individual Pages (Optional but Recommended)**
  - Scaffold dynamic routes (e.g., `src/app/projects/[id]/page.tsx`) that fetch data from `resume.json` and generate static pages with dedicated metadata for each project/publication.
