# Website Improvement Tasks

## Phase 1: Critical SEO & Content Quick Wins
- [ ] Upgrade site metadata in `layout.tsx` (title, description, keywords, OpenGraph, Twitter card)
- [ ] Inject JSON-LD structured data (Person & WebSite schemas)
- [ ] Enhance Hero section: add visible name, professional tagline, social links, and CTAs
- [ ] Revamp About section with concrete impact and achievements
- [ ] Fix data typos (`"Pyhton"` -> `"Python"`) and normalize skill/tag case sensitivity

## Phase 2: Data Model Migration
- [ ] Define consolidated `resume.json` schema and data file
- [ ] Create icon & theme color mapping layer decoupling JSX from data
- [ ] Migrate data loaders and components to consume the unified data model
- [ ] Remove legacy scattered `.tsx` data sources

## Phase 3: Content Enrichment
- [ ] Add blog / articles integration or feed
- [ ] Add contact section / email reachout CTA
- [ ] Add downloadable resume capability
- [ ] Showcase teaching portfolio and public speaking / presentations

## Phase 4: UX & Performance Optimization
- [ ] Evaluate server component rendering for `page.tsx`
- [ ] Enable Next.js image optimization
- [ ] Prune unused dependencies and streamline bundle size
- [ ] Enhance filter accessibility and mobile UX

## Phase 5: Verification & Delivery
- [ ] Run formatting and lint checks (`pnpm format`, `pnpm lint`)
- [ ] Run unit and component test suites with coverage (`pnpm test`)
- [ ] Verify production build (`pnpm build`)
