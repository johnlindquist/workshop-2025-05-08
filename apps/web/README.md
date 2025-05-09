# Web App: Gothic Mock Note-Taking UI

This app implements the **Gothic Mock** design for a simple, fast, and accessible note-taking experience.

## Features
- Create, edit, and delete notes
- (Planned) Pin notes, search, theme toggle
- Keyboard-friendly, responsive UI
- State managed with Zustand
- Form validation with zod + react-hook-form
- Console logging for all note actions

## Tech Stack
- Next.js 14+ (App Router)
- Tailwind CSS, shadcn/ui
- Zustand, zod, react-hook-form
- Vitest (unit tests)

## File Structure
- Main page: `app/page.tsx`
- UI components: `components/ui/`
- Store: `store/notes.ts`
- Mock data: `mocks/notes.ts`
- Tests: `components/ui/__tests__/`, `store/notes.test.ts`

## Running Locally
```sh
pnpm install
pnpm --filter ./apps/web dev
```
- Visit http://localhost:3000 (or next available port)

## Development
- Edit UI in `components/ui/`
- Add logic to `store/notes.ts`
- All actions are logged to the browser console for observability

## Testing
```sh
pnpm --filter ./apps/web test
```
- All features are covered by Vitest tests

## Design Reference
- [docs/mocks/gothic.md](../../docs/mocks/gothic.md)
- [User Flow Diagram](../../docs/diagrams/user-interactions.md)
- [Webpage Events](../../docs/diagrams/webpage-events.md) 