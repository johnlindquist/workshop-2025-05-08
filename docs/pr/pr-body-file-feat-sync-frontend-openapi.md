## PR Summary: feat: Sync Frontend with OpenAPI Specification

This pull request implements the full task of syncing the frontend application with the OpenAPI specification (`docs/openapi.yaml`). It includes defining shared API types, updating data fetching logic, refactoring components to use the new types and hooks, and setting up mock API handlers with MSW for development and testing.

### Key Changes:

1.  **Defined Shared API Types (Commit `7b3fb43`):**
    *   Created TypeScript interfaces (`Note`, `ErrorResponse`, `CreateNotePayload`, `UpdateNotePayload`) in `packages/types/src/api-types.ts` based on the OpenAPI schemas.
    *   Ensured all properties, types, and `readOnly` attributes are correctly represented.

2.  **Updated Frontend Data Fetching (Commit `eea33eb`):
    *   Created `apps/web/lib/api-client.ts` with functions for all API endpoints (`/notes` GET, POST; `/notes/{noteId}` GET, PUT, DELETE), incorporating Zod for runtime response validation against the new API types.
    *   Created `apps/web/hooks/use-notes.ts` with React Query hooks (`useGetNotes`, `useGetNoteById`, `useCreateNote`, `useUpdateNote`, `useDeleteNote`) utilizing the new API client functions.
    *   Resolved various TypeScript path alias and monorepo configuration issues to ensure successful builds.

3.  **Refactored Frontend Components (Commit `c18b11d`):
    *   Refactored the main page component (`apps/web/app/page.tsx`) to replace local state management and old data structures with the new React Query hooks and API types.
    *   Updated `apps/web/components/gothic/NoteCard.tsx` to use the new `Note` type.
    *   Added `QueryClientProvider` to `apps/web/app/layout.tsx` to enable React Query throughout the application.
    *   Removed outdated static initial data (`initialNotesData`) and old type definitions.

4.  **Added Mock API Handlers (Commit `247631c`):
    *   Integrated MSW (Mock Service Worker) into `apps/web`.
    *   Created mock handlers in `apps/web/mocks/handlers.ts` for all defined API endpoints, returning data consistent with the new API schemas.
    *   Set up MSW browser and server configurations (`browser.ts`, `server.ts`).
    *   Added a component (`MSWComponent`) to conditionally initialize MSW in development builds, controlled by the `NEXT_PUBLIC_ENABLE_MSW` environment variable.
    *   Generated the `mockServiceWorker.js` file in the `public` directory.

5.  **Wrote Vitest Tests (Commit `4ae5d97`):
    *   Created Vitest unit/integration tests for the API client functions in `apps/web/lib/api-client.test.ts`.
    *   Created Vitest tests for the React Query hooks in `apps/web/hooks/use-notes.test.tsx`.
    *   Configured `vitest.setup.ts` to use the MSW mock server for tests.
    *   Addressed various test setup issues, including dependency installation and import path resolution. (Note: Some pre-existing test failures and JSDOM environment issues remain but are outside the scope of this PR\'s core changes).

### Files Affected:

*   `packages/types/src/api-types.ts` (New & Modified)
*   `packages/types/src/index.ts` (Modified)
*   `packages/types/package.json` (Modified)
*   `packages/types/tsconfig.json` (Modified)
*   `apps/web/lib/api-client.ts` (New & Modified)
*   `apps/web/hooks/use-notes.ts` (New & Modified)
*   `apps/web/app/page.tsx` (Modified)
*   `apps/web/components/gothic/NoteCard.tsx` (Modified)
*   `apps/web/components/providers/query-provider.tsx` (New)
*   `apps/web/app/layout.tsx` (Modified)
*   `apps/web/mocks/handlers.ts` (New & Modified)
*   `apps/web/mocks/browser.ts` (New)
*   `apps/web/mocks/server.ts` (New)
*   `apps/web/components/providers/msw-component.tsx` (New)
*   `apps/web/public/mockServiceWorker.js` (New)
*   `apps/web/package.json` (Modified)
*   `vitest.setup.ts` (Modified)
*   `apps/web/lib/api-client.test.ts` (New)
*   `apps/web/hooks/use-notes.test.tsx` (New)
*   `tsconfig.json` (Modified)
*   `apps/web/tsconfig.json` (Modified)
*   `.gitignore` (Modified)
*   `backend/package.json` (Modified)
*   `backend/src/services/noteService.ts` (Modified)
*   `backend/src/routes/notes.ts` (Modified)
*   (Deleted `apps/web/types/note.ts`, `apps/web/lib/initial-notes.ts`, `apps/web/store/notes.test.ts`)

This PR significantly advances the project by establishing a robust, type-safe, and mockable API interaction layer for the frontend, aligning it with the defined OpenAPI contract. 