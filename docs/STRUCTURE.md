# Project Structure Best Practices

## 1. Monorepo Layout
- Use a monorepo managed by `pnpm` workspaces for all apps and packages.
- Organize code into logical workspaces:
  - `apps/` for user-facing applications (web, mobile, VS Code extension).
  - `packages/` for shared logic, UI components, and utilities.
  - `backend/` for API and backend logic (Hono on Cloudflare Workers).
  - `libs/` for shared libraries, utilities, hooks, and logic used across multiple apps or services.
- Keep configuration files (e.g., `pnpm-workspace.yaml`, `tsconfig.json`, `.biome.json`) at the root.
- Store documentation in `docs/`.

### About the `libs/` Folder
- **Purpose:** Store shared libraries, utilities, hooks, or logic that are reused across multiple parts of the system (web, mobile, backend, etc.).
- **Best Practices:**
  - Each library in `libs/` should be self-contained and may have its own `package.json` for workspace management.
  - Add a `tsconfig.json` in each lib for local TypeScript overrides, and reference them from the root `tsconfig.json`.
  - Include tests and a `README.md` in each library.
  - Use clear, descriptive names for each library (e.g., `utils`, `hooks`, `api`).
  - Prefer colocating code by domain or functionality for easier discoverability.

## 2. Tech Stack & Tooling
- **Languages:** TypeScript everywhere (frontend, backend, shared).
- **Frontend:** Next.js (web, possibly mobile), Tailwind CSS, shadcn/ui, Zustand, react-hook-form, zod.
- **Backend:** Hono (Cloudflare Workers), zod, JWT, CORS, logging middleware.
- **Testing:** Vitest for all tests (unit, integration, E2E optional).
- **Formatting/Linting:** Biome, enforced with pre-commit git hooks (Husky).
- **CI/CD:** GitHub Actions for linting, testing, and deployment.
- **Storage:** Cloudflare KV for notes, D1 optional for future relational needs.

## 3. Documentation & Diagrams
- Store all documentation in `docs/`.
- Use Markdown for requirements, tech stack, and architecture.
- Use Mermaid diagrams for user flows and event lifecycles (see `docs/diagrams/`).

## 4. Best Practices
- **Simplicity:** Favor simple, composable modules and clear separation of concerns.
- **Cross-Platform:** Design shared logic for reuse across web, mobile, and VS Code extension.
- **Observability:** Add logging at key points (API, state changes, errors).
- **Testing:** Write tests for all logic; maintain high coverage.
- **Formatting:** Enforce consistent code style with Biome and pre-commit hooks.
- **Security:** Validate all input (zod), use HTTPS, manage secrets securely.
- **Scalability:** Use Cloudflare-native solutions for global reach and low latency.

## 5. Example Directory Structure
```text
/ (repo root)
├── apps/
│   ├── web/           # Next.js web app
│   ├── mobile/        # (Optional) React Native app
│   └── vscode-ext/    # (Optional) VS Code extension
├── backend/           # Hono API (Cloudflare Workers)
├── packages/
│   ├── ui/            # Shared UI components (shadcn/ui, etc.)
│   └── types/         # Shared TypeScript types
├── libs/
│   ├── utils/         # Shared utility functions
│   ├── hooks/         # Shared React hooks
│   └── api/           # API clients or shared API logic
├── docs/
│   ├── PRD.md
│   ├── TECH_STACK.md
│   ├── STRUCTURE.md
│   └── diagrams/
├── .biome.json        # Biome config
├── pnpm-workspace.yaml
├── tsconfig.json
└── ...
```

## 6. References
- See `docs/PRD.md` for product requirements.
- See `docs/TECH_STACK.md` for detailed tech stack.
- See `docs/diagrams/` for user and event flow diagrams. 