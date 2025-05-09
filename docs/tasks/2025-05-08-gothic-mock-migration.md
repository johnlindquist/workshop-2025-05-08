# Task: Implement Gothic Mock Design in Web App

## Commit 1: ✅ feat: Move and integrate gothic mock components into web app (35b1268)
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

## Commit 2: ✅ refactor: Modularize gothic mock into small, reusable components (e7d2770)
**Description:**
- Break down the gothic mock code into small, focused components (≤200 lines each) and place them in `apps/web/components/ui` or other appropriate directories.
- Add excessive logging to key actions (note creation, deletion, pinning, theme toggle) for observability.
- Ensure all files remain under 200 lines where possible.

**Verification:**
- All gothic mock features still work after refactor.
- Each component file is ≤200 lines.
- Logging output is visible in the browser console for key actions.

---

## Commit 3: ✅ chore: Add/Update tests for gothic mock features (e9dc340)
**Description:**
- Add or update tests using `vitest`

---

## Commit 4: ✅ docs: Update README and document new design (a65d0db)
**Description:**
// ... existing code ...

---

## Commit 5: ✅ feat: Full gothic mock UI with pin, edit, delete, logging, and accessibility (56103eb)
**Description:**
- Migrated the entire gothic mock UI from docs/mocks/gothic.md into the Next.js app.
- All features: pin/unpin, edit, delete, excessive logging, dark mode, accessibility, and polish.
- All linter errors fixed.
- UI matches the reference mock exactly.