# Product Requirements Document (PRD)

## 1. Core Functionality & Purpose
- A simple note-taking app inspired by Google Keep, but less complex.
- Should be accessible on web, mobile, and as a VS Code extension.
- Focus on simplicity and cross-platform usability.
- Primary problem solved: Provide a lightweight, accessible note-taking solution across multiple platforms.

## 2. Key Technical Goals & Scope
- Monorepo managed with `pnpm` workspaces.
- Hosted on Cloudflare.
- Language: TypeScript.
- UI Framework: Next.js (for web and possibly mobile via Next.js/React Native integration).
- Styling: Tailwind CSS.
- Backend: Hono (Cloudflare Workers, similar to Express).
- Testing: Vitest for all tests.
- Prioritize good test coverage from the start.
- Prefer Biome for formatting and want git hooks set up to enforce formatting before pushing.
- Out of scope: <!-- TODO: What features or platforms are explicitly out of scope for the current development cycle? -->

## 3. User Interaction & Technical Design
- Primary user types: Web users, mobile users, VS Code extension users.
- Interaction methods: Web UI, mobile UI, VS Code extension interface.
<!-- TODO: Are there any available UI mockups, API contracts, or user flows? If so, please provide or reference them. -->

## 4. Essential Features & Implementation Details
- Must-have functionalities:
  - Create, edit, and delete notes.
  - Sync notes across platforms (web, mobile, VS Code extension).
  - Simple, intuitive UI.
- High-level implementation considerations:
  - Use Next.js for web/mobile, Hono for backend, Tailwind CSS for styling.
<!-- TODO: Are there any additional must-have features or specific implementation details for each feature? -->

## 5. Acceptance Criteria & "Done" Definition
- The app is considered "done" when:
  - A user can load the website and see the main page.
  - The user can type into the text field and press the Enter key.
  - The entered note is saved to the backend.
  - The saved note is displayed in the list of notes (to-dos) on the main page.

## 6. Key Technical Requirements & Constraints
- Non-negotiable requirements:
  - TypeScript for all code.
  - Hosted on Cloudflare.
  - Monorepo with pnpm workspaces.
  - Use Biome for formatting and enforce with git hooks.
  - Use Vitest for testing.
- Non-functional requirements and constraints:
  - Focus on simplicity and cross-platform usability.
<!-- TODO: Are there any additional non-functional requirements (performance, scalability, security, reliability) or constraints (infrastructure, budget)? -->

## 7. Success Metrics (Technical Viewpoint)
- **API Endpoint Usage:**
  - Count of `POST /notes` requests (Note Creations)
  - Count of `GET /notes` requests (Note List Fetches)
  - Count of `GET /notes/{noteId}` requests (Specific Note Fetches)
  - Count of `PUT /notes/{noteId}` requests (Note Updates)
  - Count of `DELETE /notes/{noteId}` requests (Note Deletions)
  *Reference: See `docs/openapi.yaml` for endpoint details.*
- **API Error Rates:**
  - Percentage of 4xx Client Errors for key API endpoints (`/notes`, `/notes/{noteId}`).
  - Percentage of 5xx Server Errors for key API endpoints (`/notes`, `/notes/{noteId}`).
  *Target: Keep 5xx error rate below 0.1%.*
- **Application Performance:**
  - Average Page Load Time (LCP - Largest Contentful Paint) for the main web application page.
  *Target: Below 2.5 seconds (as measured by Cloudflare Analytics or similar tool).*
  - API Response Time (P95) for `GET /notes`.
  *Target: Below 500ms.*
- **Core Functionality Success Rates:**
  - Note Creation Success Rate: (Successful `POST /notes` requests) / (Total `POST /notes` requests)
  *Target: > 99.9%*
  - Note Sync Success Rate: (Metrics TBD - requires understanding sync mechanism, potentially based on client-side error reporting or backend consistency checks).
  *Initial Focus: Track API success rates as a proxy.*

## 8. Development Logistics & Lookahead
- Major assumptions: Simplicity and cross-platform usability are achievable with the chosen stack.
<!-- TODO: What are the significant technical risks or dependencies, and initial mitigation thoughts? What future development considerations should be noted for extensibility? --> 