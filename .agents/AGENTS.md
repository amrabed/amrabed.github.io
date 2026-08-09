# Agent Instructions

## Git Workflow
When manipulating Git history and branches:
- Always rebase over merge commits when bringing a feature branch up to date with `main` (i.e. `git rebase main`).
- Always use a squash merge (or `squash and merge`) over regular merges when merging a feature branch into `main` (i.e. `git merge --squash feature-branch`). This keeps the commit history clean.
