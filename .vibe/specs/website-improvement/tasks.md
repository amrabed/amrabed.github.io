# Website Improvement Tasks

## Phase 1: Critical SEO & Content Quick Wins

- [x] Upgrade site metadata in `layout.tsx` (title, description, keywords, OpenGraph, Twitter card)
- [x] Inject JSON-LD structured data (Person & WebSite schemas)
- [x] Enhance Hero section: add visible name, professional tagline, social links, and CTAs
- [x] Revamp About section with concrete impact and achievements
- [x] Fix data typos (`"Pyhton"` -> `"Python"`) and normalize skill/tag case sensitivity

## Phase 2: Data Model Migration

- [x] Define consolidated `resume.json` schema and data file
- [x] Create icon & theme color mapping layer decoupling JSX from data
- [x] Migrate data loaders and components to consume the unified data model
- [x] Remove legacy scattered `.tsx` data sources

## Phase 3: Content Enrichment

- [x] Add blog / articles integration or feed
- [x] Add contact section / email reachout CTA
- [x] Add downloadable resume capability
- [x] Showcase teaching portfolio and public speaking / presentations

## Phase 4: UX & Performance Optimization

- [x] Evaluate server component rendering for `page.tsx`
- [x] Enable Next.js image optimization
- [x] Prune unused dependencies and streamline bundle size
- [x] Enhance filter accessibility and mobile UX

## Phase 5: Verification & Delivery

- [ ] Run formatting and lint checks (`pnpm format`, `pnpm lint`)
- [ ] Run unit and component test suites with coverage (`pnpm test`)
- [ ] Verify production build (`pnpm build`)
