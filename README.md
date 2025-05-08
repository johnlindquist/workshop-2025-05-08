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

For more, see [`docs/STRUCTURE.md`](docs/STRUCTURE.md) and [`docs/TECH_STACK.md`](docs/TECH_STACK.md). 