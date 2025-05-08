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

---

## Commit 2: feat: Initialize Hono app and basic API route
**Description:**
- Install Hono and required middleware: `hono`, `@hono/zod-validator`, `@hono/jwt`, `@hono/cors`, `@hono/logger`.
- In `backend/src/index.ts`, set up a basic Hono app with a `/health` route that returns `{ status: 'ok' }`.
- Add logging and CORS middleware as per `docs/TECH_STACK.md`.

**Verification:**
- Run `pnpm install hono @hono/zod-validator @hono/jwt @hono/cors @hono/logger --filter ./backend`.
- Run the worker locally (e.g., with `pnpm dlx wrangler dev backend/src/index.ts`) and `curl http://localhost:8787/health` to verify it returns `{ status: 'ok' }`.

---

## Commit 3: feat: Integrate Cloudflare KV for note storage
**Description:**
- Add Cloudflare KV binding configuration (via `wrangler.toml` or equivalent) for the backend.
- In `backend/src/index.ts`, add a `/notes` route with GET and POST handlers that interact with Cloudflare KV for storing and retrieving notes.
- Use Zod for input validation on POST requests.
- Reference: See `docs/TECH_STACK.md` for storage details.

**Verification:**
- Confirm `wrangler.toml` includes KV namespace binding.
- Run local tests to POST a note and GET notes using `curl` or HTTP client.
- Check that notes persist in KV between requests.

---

## Commit 4: test: Add Vitest unit and integration tests for API
**Description:**
- Install Vitest and set up a test config for the backend.
- Add tests for `/health` and `/notes` endpoints in `backend/src/index.test.ts`.
- Ensure tests cover both valid and invalid input cases (use Zod validation).
- Reference: See `docs/TECH_STACK.md` for testing requirements.

**Verification:**
- Run `pnpm install vitest --filter ./backend`.
- Run `pnpm vitest run --filter ./backend` and confirm all tests pass.

---

## Commit 5: chore: Add Biome config and enforce formatting with Husky
**Description:**
- Add `.biome.json` to `backend/` if not already present, or ensure root config covers backend.
- Set up Husky pre-commit hook to run Biome formatting/linting on backend files.
- Reference: See `docs/TECH_STACK.md` and `docs/STRUCTURE.md` for formatting and git hook requirements.

**Verification:**
- Run `pnpm biome check backend/` to confirm formatting.
- Test pre-commit hook by making a sample commit in `backend/` and verifying Biome runs automatically.

--- 