# App Idea: Cross-Platform Note-Taking App

## Overview
- A simple note-taking app inspired by Google Keep, but less complex.
- Should be accessible on web, mobile, and as a VS Code extension.
- Hosted on Cloudflare.

## Tech Stack & Preferences
- Monorepo managed with `pnpm` workspaces.
- Language: TypeScript.
- UI Framework: Next.js (for web and possibly mobile via Next.js/React Native integration).
- Styling: Tailwind CSS.
- Backend: Hono (Cloudflare Workers, similar to Express).
- Testing: Vitest for all tests.

## Additional Notes
- Focus on simplicity and cross-platform usability.
- Prioritize good test coverage from the start.
- Prefer Biome for formatting and want git hooks set up to enforce formatting before pushing. 