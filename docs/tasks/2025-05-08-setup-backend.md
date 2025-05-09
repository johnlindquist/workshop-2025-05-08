# Task: Set Up Backend API with Hono on Cloudflare Workers

## Commit 1: ✅ feat: Scaffold backend directory structure and config (c163006)
**Description:**
- Create `backend/src/` directory for backend source code.
- Add an initial `backend/src/index.ts` entry point for the Hono app.
- Ensure `backend/tsconfig.json` is configured to use `src` as `rootDir` and `dist` as `outDir` (already present).
- Add a `.gitkeep` file to `src/` if empty.
- Reference: See `docs/STRUCTURE.md` for directory conventions.

**Verification:**
- Confirm `backend/src/index.ts` exists and is referenced in `tsconfig.json`.
- Run `pnpm tsc --filter ./backend` to ensure TypeScript compiles with no errors.

## Commit 2: ✅ feat: Initialize Hono app and basic API route (cb02dfa)
**Description:**
- Install Hono and required middleware: `hono`, `@hono/zod-validator`, `@hono/jwt`, `@hono/cors`, `@hono/logger`.
- In `backend/src/index.ts`, set up a basic Hono app with a `/health` route that returns `{ status: 'ok' }`.
- Add logging and CORS middleware as per `docs/TECH_STACK.md`.

**Verification:**
- Run `pnpm install hono @hono/zod-validator @hono/jwt @hono/cors @hono/logger --filter ./backend`.
- Run the worker locally (e.g., with `pnpm dlx wrangler dev backend/src/index.ts`) and `curl http://localhost:8787/health` to verify it returns `{ status: 'ok' }`.

## Commit 3: ✅ feat: Integrate Cloudflare KV for note storage (e51c447)
**Description:**
- Add Cloudflare KV binding configuration (via `

## Commit 4: ✅ test: Add Vitest unit and integration tests for API (a8cefc7)
**Description:**
// ... existing code ...

## Commit 5: ✅ chore: Add Biome config and enforce formatting with Husky (941bc1c)
**Description:**
// ... existing code ...