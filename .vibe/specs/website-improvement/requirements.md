# Website Improvement Requirements

Audit and improve amrabed.com to fully reflect Amr's experience, background, skills, and credentials, while optimizing SEO, UX, and efficiency.

## Core Objectives

1. **Brand & Experience Representation**:
   - Highlight Virginia Tech PhD in Computer Engineering, Engineering Manager role at Sophi, ex-Google internship, AWS certifications (including Generative AI Developer - Professional early adopter), research publications, and university teaching background.
   - Display Amr's name, role, professional tagline, and clear call-to-actions (CTAs) prominently in the hero section.
   - Enrich the About section and project/publication details.

2. **SEO & Discoverability**:
   - Upgrade page metadata (title, rich description, targeted keywords, canonical link, OpenGraph, Twitter card tags).
   - Inject structured data (JSON-LD) for Person and WebSite schemas.
   - Ensure clean sitemap and search engine bot directives.

3. **Data Model Architecture**:
   - Centralize hardcoded `.tsx` data files into a clean, typed JSON data model (`resume.json` / JSON resume standard).
   - Decouple styling/icons from raw data.
   - Fix casing mismatches and typographical errors across skills, tags, and areas.

4. **UX & Performance**:
   - Improve Hero, navigation, social links placement, and filter accessibility.
   - Optimize Next.js image rendering and bundle footprint.
   - Maintain full test coverage and automated verification.
