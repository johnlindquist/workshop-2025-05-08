# Monorepo: Note-Taking App

This repository is a pnpm-managed monorepo for a cross-platform note-taking application. It is structured for scalability, code sharing, and ease of development across web, backend, and shared packages.

## Directory Structure

```
/ (repo root)
├── apps/         # User-facing applications (web, mobile, VS Code extension)
├── backend/      # API and backend logic (Hono on Cloudflare Workers)
├── packages/     # Independently versionable/publishable packages (shared logic, UI components)
├── libs/         # Internal shared libraries, utilities, hooks, and logic (not published)
├── docs/         # Documentation, diagrams, and requirements
├── .husky/       # Git hooks (pre-commit formatting/linting)
├── biome.json    # Biome config (formatting/linting)
├── pnpm-workspace.yaml
├── tsconfig.json # TypeScript config
└── ...
```

See [`docs/STRUCTURE.md`](docs/STRUCTURE.md) for more details on the directory layout.

## Tech Stack
- **Monorepo:** pnpm workspaces
- **Languages:** TypeScript everywhere
- **Frontend:** Next.js, Tailwind CSS, shadcn/ui, Zustand, react-hook-form, zod
- **Backend:** Hono (Cloudflare Workers), zod, JWT, CORS, logging middleware
- **Testing:** Vitest
- **Formatting/Linting:** Biome (enforced with Husky pre-commit hook)

See [`docs/TECH_STACK.md`](docs/TECH_STACK.md) for full details.

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Husky hooks are set up automatically via the `prepare` script.**
3. **Run formatting/linting:**
   ```sh
   pnpm biome check --staged --write
   # or to check/format all files
   pnpm biome check --write .
   ```
4. **Develop apps/packages:**
   - Add new apps in `apps/`
   - Add backend logic in `backend/`
   - Add independently versionable/publishable code in `packages/`
   - Add internal shared code in `libs/`

## Contributing
- All code must pass Biome formatting/linting before commit (enforced by Husky).
- See `docs/` for requirements, tech stack, and architecture.

---

## Gothic Mock Web App Design (2025-05-08)

The web app now implements the **Gothic Mock** design, inspired by Google Keep:

- **Features:**
  - Create, edit, and delete notes
  - Pin notes (future)
  - Search notes (future)
  - Theme toggle (future)
  - Fast, keyboard-friendly UI
  - State managed with Zustand
  - Form validation with zod + react-hook-form
  - All actions are logged to the console for observability
- **Tech:** Next.js 14+, Tailwind CSS, shadcn/ui, Zustand, zod, Vitest
- **Location:** All main UI in `apps/web/app/page.tsx` and `apps/web/components/ui/`
- **Mock data:** `apps/web/mocks/notes.ts`, store logic in `apps/web/store/notes.ts`

### Running the Web App

```sh
pnpm install
pnpm --filter ./apps/web dev
```

- The app will be available at http://localhost:3000 or the next available port.
- All gothic mock features are available by default.

### Development
- UI components: `apps/web/components/ui/`
- State/store: `apps/web/store/notes.ts`
- Tests: colocated in `__tests__` folders, run with `pnpm test`
- See [docs/mocks/gothic.md](docs/mocks/gothic.md) for the original design mock
- See [docs/diagrams/user-interactions.md](docs/diagrams/user-interactions.md) for user flow
- See [docs/diagrams/webpage-events.md](docs/diagrams/webpage-events.md) for event flow

### Testing
```sh
pnpm --filter ./apps/web test
```
- All gothic mock features are covered by Vitest tests.

---

For more, see [`docs/STRUCTURE.md`](docs/STRUCTURE.md) and [`docs/TECH_STACK.md`](docs/TECH_STACK.md). 