# Task: Sync Frontend with OpenAPI Specification

## Commit 1: feat: Define shared API types from OpenAPI spec

**Description:**
Analyze `docs/openapi.yaml` to identify all defined schemas (e.g., `Note`, `ErrorResponse`) and their properties. Create/update TypeScript interfaces or types in `packages/types/src/api-types.ts` (or a similar new file if `api-types.ts` doesn't exist) to match these schemas precisely. This ensures that both frontend and backend can share these type definitions. For example, the `Note` schema with `id`, `title`, `content`, `createdAt`, `updatedAt` properties should be translated into a `Note` interface. Ensure all properties, their types (e.g., `string`, `string | undefined` for optional fields, `date-time` to `string` or `Date`), and `readOnly` attributes are correctly represented. Add JSDoc comments based on descriptions in OpenAPI.

**Verification:**
Run `pnpm -r tsc --noEmit` to ensure the new/updated types in `packages/types/src/api-types.ts` are valid TypeScript and cause no compilation errors. Manually review the generated types against `docs/openapi.yaml` for accuracy and completeness of all schemas and their fields.

---

## Commit 2: feat: Update frontend data fetching hooks/services to align with OpenAPI paths and methods

**Description:**
Review existing frontend data fetching logic, likely using `@tanstack/react-query` as specified in `docs/TECH_STACK.md`. This logic might be in `apps/web/lib/api.ts`, `apps/web/hooks/useNotes.ts`, or similar files.
Update or create functions/hooks for each API endpoint defined in `docs/openapi.yaml` (`/notes` GET, POST; `/notes/{noteId}` GET, PUT, DELETE).
Ensure each function uses the correct HTTP method, path, and request/response types defined in `packages/types/src/api-types.ts` from Commit 1.
For example, a hook `useGetNotes` should fetch from `/notes` (GET) and expect a `Note[]` response. `useCreateNote` should POST to `/notes` with a body matching the `Note` creation schema (e.g., `{ title?: string; content: string; }`) and expect a `Note` response.
All API client functions should use Zod for runtime validation of responses against the types from `packages/types/src/api-types.ts` before returning data to React Query, as per `docs/TECH_STACK.md` which mentions Zod for validation.

**Verification:**
Run `pnpm -w tsc --noEmit` (or `pnpm -r tsc --noEmit`) to confirm type correctness in `apps/web`. Manually review the updated data fetching functions/hooks to ensure they correctly implement all API calls (GET, POST, PUT, DELETE for notes) as per `docs/openapi.yaml`, including path parameters (e.g., `noteId`) and request bodies. Verify Zod schemas are used for response validation.

---

## Commit 3: refactor: Update frontend components to use new API types and data fetching logic

**Description:**
Identify all React components in `apps/web/components/` and `apps/web/app/` that interact with note data (e.g., displaying notes, creating notes, editing notes).
Refactor these components to use the updated data fetching hooks/services from Commit 2.
Ensure that data passed to and received from these hooks/services adheres to the types defined in `packages/types/src/api-types.ts`.
For instance, if a component displays a list of notes, it should now use `useGetNotes()` and expect data of type `Note[]`. Forms for creating/editing notes (likely using `react-hook-form` and `zod` as per `docs/TECH_STACK.md`) should use the appropriate request types for `useCreateNote()` or `useUpdateNote()`.

**Verification:**
Run `pnpm -w tsc --noEmit` (or `pnpm -r tsc --noEmit`) to ensure no type errors in the `apps/web` components. Manually inspect components that create, read, update, or delete notes to confirm they correctly use the new data fetching logic and types. Test UI interactions for creating, viewing, and modifying notes with mocked API responses (if tests exist) to ensure data flows correctly. If no tests exist, perform manual checks on the UI.

---

## Commit 4: chore: Add/update mock API handlers for development and testing

**Description:**
Based on `docs/openapi.yaml` and the new types in `packages/types/src/api-types.ts`, update or create mock API handlers. If using a library like MSW (Mock Service Worker), update the handlers in `apps/web/mocks/handlers.ts` (or a similar location).
These mocks should cover all defined endpoints (`/notes` GET, POST; `/notes/{noteId}` GET, PUT, DELETE) and return data consistent with the `Note` schema and other response schemas.
This ensures a consistent development and testing experience as outlined by the project's emphasis on testing in `docs/PRD.md`.

**Verification:**
Ensure the application runs correctly with the mock handlers enabled (`pnpm dev` in `apps/web`). Manually test all CRUD operations (Create, Read, Update, Delete notes) in the UI to verify the mock handlers are responding correctly according to `docs/openapi.yaml`. If unit/integration tests exist for API interactions (e.g., in Vitest), ensure they pass using these mock handlers.

---

## Commit 5: test: Write/update Vitest tests for API type conformity and data fetching

**Description:**
Create or update Vitest unit/integration tests (`*.test.ts` files co-located with source or in test directories, as per `docs/TECH_STACK.md`) for:
1.  The API client functions/hooks created/updated in Commit 2. These tests should verify that the functions make correct API calls (method, URL, body) and that their outputs (after Zod validation) conform to the `packages/types/src/api-types.ts`.
2.  Components (from Commit 3) to ensure they correctly handle data conforming to the new API types.
These tests will use the mock handlers from Commit 4. Focus on ensuring data integrity between the frontend's expectations and the OpenAPI defined structures.

**Verification:**
Run `pnpm test` (or `pnpm -r test` and specifically `pnpm test --filter web`) to ensure all new and existing tests pass. Review test coverage reports (if available) to confirm adequate testing of the new types and data fetching logic. Ensure tests cover successful cases, error handling (e.g., 404 Not Found), and validation failures. 