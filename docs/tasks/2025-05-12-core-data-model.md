# Task: Implement Core Data Model for Notes App

## ✅ Commit 1: feat: Create shared Note type package (48d975e)

**Description:**
Create the foundational shared type package that defines the core Note data structure. This involves:
1. Initialize package in `packages/types/` with `pnpm init`
2. Create `packages/types/src/note.ts` with Zod schema for the Note entity (fields: `id`, `title`, `content`, `createdAt`, `updatedAt`)
3. Create `packages/types/src/index.ts` to export the Note type
4. Update `package.json` to add zod dependency and configure TypeScript
5. Add tsconfig.json for the types package

**Verification:**
1. Run `cd packages/types && pnpm install` to ensure dependencies install correctly
2. Verify TypeScript compiles without errors: `pnpm tsc --noEmit`
3. Create a simple test in `packages/types/src/__tests__/note.test.ts` that validates a Note object
4. Run test with `pnpm vitest run packages/types/src/__tests__/note.test.ts`

---

## ✅ Commit 2: feat: Add backend API skeleton with Hono (b574c1a)

**Description:**
Set up the backend API structure with Hono for Cloudflare Workers:
1. Initialize the backend project in `backend/` with `pnpm init`
2. Set up Hono and Cloudflare Workers dependencies in `backend/package.json`
3. Create `backend/src/index.ts` with basic Hono setup and a health check endpoint
4. Add `backend/src/routes/notes.ts` with CRUD route declarations (GET /notes, POST /notes, PUT /notes/:id, DELETE /notes/:id)
5. Create placeholder implementation for note storage in `backend/src/services/noteService.ts`
6. Add `backend/wrangler.toml` configuration for Cloudflare Workers

**Verification:**
1. Run `cd backend && pnpm install` to install dependencies
2. Verify the TypeScript compiles: `pnpm tsc --noEmit`
3. Run local development server: `pnpm wrangler dev`
4. Test health check endpoint with: `curl http://localhost:8787/health`
5. Confirm the API returns 200 OK

---

## ✅ Commit 3: feat: Implement in-memory Note storage for backend (8bdb0c1)

**Description:**
Implement in-memory storage for Notes to enable CRUD operations:
1. Update `backend/src/services/noteService.ts` with in-memory implementation for storing notes
2. Implement GET /notes to retrieve all notes in `backend/src/routes/notes.ts`
3. Implement POST /notes to create a note in `backend/src/routes/notes.ts`
4. Implement PUT /notes/:id to update a note in `backend/src/routes/notes.ts`
5. Implement DELETE /notes/:id to delete a note in `backend/src/routes/notes.ts`
6. Add input validation with Zod for all endpoints
7. Add proper error handling and response formatting

**Verification:**
1. Run the development server: `cd backend && pnpm wrangler dev`
2. Test creating a note: `curl -X POST -H "Content-Type: application/json" -d '{"content":"Test note"}' http://localhost:8787/notes`
3. Test retrieving notes: `curl http://localhost:8787/notes`
4. Test updating a note: `curl -X PUT -H "Content-Type: application/json" -d '{"content":"Updated note"}' http://localhost:8787/notes/{id}`
5. Test deleting a note: `curl -X DELETE http://localhost:8787/notes/{id}`
6. Verify all operations work correctly and return appropriate status codes and responses

---

## Commit 4: feat: Set up basic Next.js web app structure

**Description:**
Initialize and configure the web application with Next.js:
1. Set up Next.js with App Router in `apps/web/`: `cd apps && pnpm create next-app web --typescript --tailwind --eslint --app --src-dir`
2. Configure Tailwind CSS and install shadcn/ui dependencies
3. Create basic app layout in `apps/web/src/app/layout.tsx`
4. Add `apps/web/src/app/page.tsx` with a simple UI skeleton for notes
5. Create `apps/web/components/ui/NoteInput.tsx` component for adding notes
6. Create `apps/web/components/ui/NotesList.tsx` component for displaying notes
7. Set up API client in `apps/web/lib/api.ts` to communicate with the backend

**Verification:**
1. Run the web app: `cd apps/web && pnpm dev`
2. Verify the app loads without errors at http://localhost:3000
3. Check developer console for any errors
4. Verify the basic UI elements render correctly (note input field and notes list placeholder)
5. Verify proper Tailwind CSS and shadcn/ui styling is applied

---

## Commit 5: feat: Implement Zustand store for Notes state management

**Description:**
Implement client-side state management with Zustand:
1. Install Zustand in the web app: `cd apps/web && pnpm add zustand`
2. Create `apps/web/store/useNotesStore.ts` with Zustand store for managing notes
3. Implement actions for fetching, adding, updating, and deleting notes
4. Update `apps/web/components/ui/NoteInput.tsx` to use the store for adding notes
5. Update `apps/web/components/ui/NotesList.tsx` to display notes from the store
6. Add loading and error states to the UI components
7. Implement optimistic updates for better UX

**Verification:**
1. Run the backend: `cd backend && pnpm wrangler dev`
2. Run the web app: `cd apps/web && pnpm dev`
3. Test adding a note via the UI
4. Verify the note appears in the notes list
5. Test editing a note
6. Test deleting a note
7. Verify the UI correctly reflects all changes
8. Check network requests in browser dev tools to confirm they're communicating with the backend API correctly 