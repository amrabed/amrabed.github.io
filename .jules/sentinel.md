## 2025-05-15 - [Scoped Dependency Overrides]
**Vulnerability:** Moderate DoS vulnerability in transitive dependency `brace-expansion` (GHSA-jxxr-4gwj-5jf2).
**Learning:** A blanket override of `brace-expansion` to `^5.0.6` broke the build (ESLint/minimatch@3 failed with "expand is not a function") because version 5 is not backwards compatible with version 1 expectations of older dependencies.
**Prevention:** Use scoped `pnpm.overrides` (e.g., `"minimatch@3>brace-expansion": "^1.1.11"`) to ensure all major versions in the dependency tree are patched without breaking compatibility for older tools.
