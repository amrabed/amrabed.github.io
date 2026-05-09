# Palette's UX Journal

This journal tracks critical UX and accessibility learnings discovered while working on this project.

## 2026-05-09 - [HeroUI v3 Tooltip Pattern]
**Learning:** HeroUI v3 (formerly NextUI) has shifted to a compound component pattern for many components, including `Tooltip`. Unlike v2 which used a `content` prop, v3 uses `Tooltip.Trigger` and `Tooltip.Content`. This allows for better composition and styling of internal elements.
**Action:** Always use the compound pattern (`Tooltip`, `Tooltip.Trigger`, `Tooltip.Content`) when implementing tooltips in this project, and include `Tooltip.Arrow` if a pointer is desired.
