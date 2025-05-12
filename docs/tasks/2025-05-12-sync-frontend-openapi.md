# Task: Sync Frontend with OpenAPI Specification

## Commit 1: feat: Define shared API types from OpenAPI spec ✅ 7b3fb43

**Description:**
Analyze `docs/openapi.yaml` to identify all defined schemas (e.g., `Note`, `ErrorResponse`) and their properties. Create/update TypeScript interfaces or types in `packages/types/src/api-types.ts` (or a similar new file if `api-types.ts` doesn't exist) to match these schemas precisely. This ensures that both frontend and backend can share these type definitions. For example, the `Note` schema with `id`, `title`, `content`, `createdAt`, `updatedAt` properties should be translated into a `Note` interface. Ensure all properties, their types (e.g., `string`, `string | undefined` for optional fields, `date-time` to `string` or `Date`), and `readOnly` attributes are correctly represented. Add JSDoc comments based on descriptions in OpenAPI.

**Verification:**
Run `pnpm -r tsc --noEmit` to ensure the new/updated types in `packages/types/src/api-types.ts` are valid TypeScript and cause no compilation errors. Manually review the generated types against `docs/openapi.yaml` for accuracy and completeness of all schemas and their fields.

---

## Commit 2: feat: Update frontend data fetching hooks/services to align with OpenAPI paths and methods ✅ eea33eb

**Description:**
Review existing frontend data fetching logic, likely using `@tanstack/react-query` as specified in `docs/TECH_STACK.md`. This logic might be in `apps/web/lib/api.ts`, `apps/web/hooks/useNotes.ts`, or similar files.
Update or create functions/hooks for each API endpoint defined in `docs/openapi.yaml` (`/notes` GET, POST; `/notes/{noteId}` GET, PUT, DELETE).
Ensure each function uses the correct HTTP method, path, and request/response types defined in `packages/types/src/api-types.ts` from Commit 1.
For example, a hook `useGetNotes` should fetch from `/notes` (GET) and expect a `Note[]` response. `useCreateNote` should POST to `/notes` with a body matching the `Note` creation schema (e.g., `{ title?: string; content: string; }`) and expect a `Note` response.
All API client functions should use Zod for runtime validation of responses against the types from `packages/types/src/api-types.ts` before returning data to React Query, as per `docs/TECH_STACK.md` which mentions Zod for validation.

**Verification:**
Run `pnpm -w tsc --noEmit` (or `pnpm -r tsc --noEmit`) to confirm type correctness in `apps/web`. Manually review the updated data fetching functions/hooks to ensure they correctly implement all API calls (GET, POST, PUT, DELETE for notes) as per `docs/openapi.yaml`, including path parameters (e.g., `noteId`) and request bodies. Verify Zod schemas are used for response validation.

---

## Commit 3: refactor: Update frontend components to use new API types and data fetching logic ✅ c18b11d

**Description:**
Identify all React components in `apps/web/components/` and `apps/web/app/` that interact with note data (e.g., displaying notes, creating notes, editing notes).
Refactor these components to use the updated data fetching hooks/services from Commit 2.
Ensure that data passed to and received from these hooks/services adheres to the types defined in `packages/types/src/api-types.ts`.
For instance, if a component displays a list of notes, it should now use `useGetNotes()` and expect data of type `Note[]`. Forms for creating/editing notes (likely using `react-hook-form` and `zod` as per `docs/TECH_STACK.md`) should use the appropriate request types for `useCreateNote()` or `useUpdateNote()`.

**Verification:**
Run `pnpm -w tsc --noEmit` (or `pnpm -r tsc --noEmit`) to ensure no type errors in the `apps/web` components. Manually inspect components that create, read, update, or delete notes to confirm they correctly use the new data fetching logic and types. Test UI interactions for creating, viewing, and modifying notes with mocked API responses (if tests exist) to ensure data flows correctly. If no tests exist, perform manual checks on the UI.

---

## Commit 4: chore: Add/update mock API handlers for development and testing ✅ 247631c

**Description:**
Based on `docs/openapi.yaml`

---

## Commit 5: test: Write/update Vitest tests for API type conformity and data fetching ✅ 4ae5d97

**Description:**
// ... existing code ...