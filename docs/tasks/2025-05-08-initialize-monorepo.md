# Task: Initialize Monorepo Structure with pnpm Workspaces

## Commit 1: chore: Create monorepo directory structure and root config files
**Description:**
Create the foundational directory structure at the root of the repository as described in `docs/STRUCTURE.md` and `docs/TECH_STACK.md`. Add the following folders: `apps/`, `backend/`, `packages/`, `libs/`, and `docs/` (if not already present). Add root configuration files: `pnpm-workspace.yaml`, `tsconfig.json`, and `.biome.json`. Ensure all folders are empty except for a placeholder `.gitkeep` file if needed. Reference:
- `docs/STRUCTURE.md` ("Example Directory Structure")
- `docs/TECH_STACK.md` ("Monorepo managed with pnpm workspaces")

**Verification:**
- Run `ls -1` at the root and confirm the presence of `apps/`, `backend/`, `packages/`, `libs/`, `docs/`, `pnpm-workspace.yaml`, `tsconfig.json`, `.biome.json`.
- Open each directory to confirm it exists and is empty (except for `.gitkeep` if used).

---

## Commit 2: chore: Initialize pnpm workspace and add workspace config
**Description:**
Run `pnpm init` at the root to create a `package.json`. Add a `pnpm-workspace.yaml` file listing `apps/*`, `backend`, `packages/*`, and `libs/*` as workspaces. Reference:
- `docs/STRUCTURE.md` ("Monorepo Layout")
- `docs/TECH_STACK.md` ("Monorepo managed with pnpm workspaces")

**Verification:**
- Confirm `package.json` exists at the root with valid metadata.
- Confirm `pnpm-workspace.yaml` includes all workspace globs.
- Run `pnpm install` and verify no errors.

---

## Commit 3: chore: Add and configure root TypeScript and Biome configs
**Description:**
Create a root `tsconfig.json` with references to all workspace folders (`apps/*`, `backend`, `packages/*`, `libs/*`). Add a root `.biome.json` with formatting and linting rules as described in `docs/TECH_STACK.md`. Reference:
- `docs/STRUCTURE.md` ("Keep configuration files at the root")
- `docs/TECH_STACK.md` ("Formatting/Linting: Biome")

**Verification:**
- Confirm `tsconfig.json` and `.biome.json` exist at the root.
- Open both files and verify they contain workspace references and formatting/linting rules, respectively.

---

## Commit 4: chore: Set up Husky pre-commit hook for Biome formatting
**Description:**
Install Husky as a dev dependency in the root workspace. Add a pre-commit hook that runs `pnpm biome check --apply` (or equivalent) to enforce formatting before commits. Reference:
- `docs/TECH_STACK.md` ("Formatting: Biome (enforced with pre-commit git hooks)")

**Verification:**
- Confirm `.husky/` directory exists at the root with a `pre-commit` file.
- Make a test commit with a formatting violation and verify the hook prevents the commit until formatting is fixed.

---

## Commit 5: docs: Document monorepo structure and setup in README
**Description:**
Create or update `README.md` at the root to describe the monorepo structure, workspace layout, and initial setup steps. Reference the structure in `docs/STRUCTURE.md` and the stack in `docs/TECH_STACK.md`.

**Verification:**
- Open `README.md` and confirm it documents the directory structure, workspace usage, and setup commands (`pnpm install`, etc.).
- Ask a new contributor to follow the README and confirm they can set up the repo as described.

--- 