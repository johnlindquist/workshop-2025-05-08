# Monorepo: Note-Taking App

This repository is a pnpm-managed monorepo for a cross-platform note-taking application. It is structured for scalability, code sharing, and ease of development across web, backend, and shared packages.

## Directory Structure

```
/ (repo root)
├── apps/         # User-facing applications (web, mobile, VS Code extension)
├── backend/      # API and backend logic (Hono on Cloudflare Workers)
├── packages/     # Shared logic, UI components, and utilities
├── libs/         # Shared libraries, utilities, hooks, and logic
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
2. **Set up Husky hooks (if not already set):**
   ```sh
   pnpm dlx husky install
   ```
3. **Run formatting/linting:**
   ```sh
   pnpm biome check --apply
   ```
4. **Develop apps/packages:**
   - Add new apps in `apps/`
   - Add backend logic in `backend/`
   - Add shared code in `packages/` or `libs/`

## Contributing
- All code must pass Biome formatting/linting before commit (enforced by Husky).
- See `docs/` for requirements, tech stack, and architecture.

---

For more, see [`docs/STRUCTURE.md`](docs/STRUCTURE.md) and [`docs/TECH_STACK.md`](docs/TECH_STACK.md). 