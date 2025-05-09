# Task: Implement Gothic Mock Design in Web App

## Commit 1: feat: Move and integrate gothic mock components into web app
**Description:**
- Move all relevant components, logic, and styles from the gothic mock (e.g., `docs/mocks/gothic.md`) into the `apps/web` folder.
- Refactor the gothic mock code as needed to fit the structure of the web app, placing reusable UI in `apps/web/components/ui`, main app logic in `apps/web/app`, and any mock data in `apps/web/mocks` or `store`.
- Remove or archive any legacy components or pages that are being replaced by the gothic mock design.
- Ensure the new design is the default experience when running the web app.

**Verification:**
- Run the web app locally (`pnpm dev` or equivalent) and confirm the gothic mock design is fully functional and visually matches the mock.
- All gothic mock features (note creation, pinning, search, theme toggle, etc.) work as expected.
- No legacy UI is visible or accessible.

---

## Commit 2: refactor: Modularize gothic mock into small, reusable components
**Description:**
- Break down the gothic mock code into small, focused components (≤200 lines each) and place them in `apps/web/components/ui` or other appropriate directories.
- Add excessive logging to key actions (note creation, deletion, pinning, theme toggle) for observability.
- Ensure all files remain under 200 lines where possible.

**Verification:**
- All gothic mock features still work after refactor.
- Each component file is ≤200 lines.
- Logging output is visible in the browser console for key actions.

---

## Commit 3: chore: Add/Update tests for gothic mock features
**Description:**
- Add or update tests using `vitest` to cover the gothic mock's main features and components.
- Ensure tests cover note creation, deletion, pinning, search, and theme toggling.

**Verification:**
- All tests pass (`pnpm test`).
- No failing or skipped tests related to gothic mock features.

---

## Commit 4: docs: Update README and document new design
**Description:**
- Update the root and/or web app `README.md` to describe the new gothic mock design, its features, and how to develop against it.
- Reference any relevant design files or documentation.

**Verification:**
- Open `README.md` and confirm it documents the new design and features.
- A new contributor can understand how to run and develop the gothic mock web app.

--- 