# amrabed.com — Second Round Audit & Phase 2 Plan

## Executive Summary

Following the initial audit, significant high-impact improvements have been made to amrabed.com. The transition to a centralized `resume.json` data model and the conversion of the main page to Server Components has drastically improved the site's maintainability and baseline performance. Furthermore, the Hero section now properly establishes your professional identity and provides clear calls-to-action.

While the structural foundations and content depth are now excellent, there are still a few key areas remaining from the original "Advanced SEO", "UX", and "Analytics" phases that present opportunities for further polish.

---

## ✅ Resolved Issues (The Wins)

The following critical issues from the first audit have been successfully addressed:

- **Centralized Data Architecture:** All hardcoded `.tsx` data was successfully migrated into `src/data/resume.json`. This provides a single source of truth and resolves casing inconsistencies.
- **Hero Identity & UX:** Your name, a strong tagline, CTA buttons, and social links are now prominently visible above the fold. 
- **SEO Fundamentals:** `json-ld` structured data for `Person` and `WebSite` has been injected. Meta titles and descriptions have been enriched with strong keywords.
- **Performance:** `page.tsx` was successfully converted to a Server Component, significantly reducing the initial client bundle.
- **Content Expansion:** Hidden positions (Abed Solutions) were restored, project descriptions were expanded via the `details` field, and new sections (Teaching, Contact, Blog) were added.
- **Cleanup:** Unused dependencies like `mongoose` were removed.

---

## ❌ Remaining Gaps (Next Opportunities)

### 1. Social Link Verification (`rel="me"`)
The `Social` component (`src/components/social.tsx`) currently renders a `<Button>` that uses `window.open()` for navigation. 
**Impact:** Because there is no underlying `<a>` tag with the `rel="me"` attribute, search engines (like Google Knowledge Graph) and platforms (like Mastodon) cannot cryptographically verify your ownership of these profiles. 

### 2. Deep Linking and Individual Pages
The site remains a strict Single Page Application (SPA). 
**Impact:** 
- There are no dedicated routes for projects (e.g., `/projects/[id]`) or courses.
- The individual project and publication cards (e.g., in `src/components/project.tsx`) lack HTML `id` attributes, meaning you cannot link directly to a specific project (e.g., `amrabed.com/#sophi-paywall`).

### 3. Custom Analytics Events
While `@next/third-parties/google` is successfully logging base pageviews, `react-ga4` remains installed but unused. 
**Impact:** There is no tracking for high-value interactions such as:
- Clicks on "View Resume" or "About Me" CTAs.
- Interactions with the Miro AI Chat Widget.
- Clicks on the Unified Filter Bar.
- Outbound clicks to GitHub repos or App Stores.

### 4. Custom 404 Page
There is no `not-found.tsx` in the `app` directory.
**Impact:** Visitors navigating to a broken link will see the unbranded Next.js default 404 page, which lacks navigation back to the main site.

### 5. Speaking/Presentations Section
This was recommended in the initial audit but hasn't been implemented yet.
**Impact:** Missed opportunity to highlight your public speaking engagements and SlideShare presentations.

---

## 📋 Phase 2 Action Plan

Here is the prioritized plan to address the remaining items:

### Step 1: Quick Fixes (High Impact, Low Effort)
1. **Fix Social Links:** Refactor `src/components/social.tsx` to render an actual `<a href="..." rel="noopener noreferrer me" target="_blank">` tag inside or around the `<Button>`.
2. **Add Card Anchors:** Add `id={project.id}` to the `Card` components in `src/components/project.tsx`, `publication.tsx`, and others to enable deep linking.
3. **Create Custom 404:** Create `src/app/not-found.tsx` with a simple branded message and a button redirecting to `/`.

### Step 2: Event Tracking Integration
4. **Implement Custom Events:** Use the `sendGAEvent` function from `@next/third-parties/google` to track:
   - CTA button clicks in `hero.tsx`.
   - Outbound link clicks in `project.tsx`.
   - Filter selection changes in `unified-filter-bar.tsx`.
   - Prompts sent to the AI chat in `use-chat-widget.ts`.
5. **Uninstall `react-ga4`:** Since `@next/third-parties/google` is handling GA, `react-ga4` can be safely removed from `package.json`.

### Step 3: Architecture & Content (Medium Effort)
6. **Add Presentations Section:** Add a `presentations` array to `resume.json` and create a `presentations.tsx` section to render them.
7. **Create Individual Pages (Optional but Recommended for SEO):** Scaffold dynamic routes (`src/app/projects/[id]/page.tsx`) that fetch data from `resume.json` and generate static pages with dedicated meta descriptions for each project.
