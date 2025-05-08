# Tech Stack

## 1. Project Overview & Goals (Informed by PRD)
A simple note-taking app inspired by Google Keep, but less complex. Should be accessible on web, mobile, and as a VS Code extension. Hosted on Cloudflare. Focus on simplicity and cross-platform usability. Primary goal: Provide a lightweight, accessible note-taking solution across multiple platforms.

## 2. Core Languages & Runtimes
- Backend Language: TypeScript (all code)
- Frontend Language/Framework: TypeScript with Next.js (web, possibly mobile via Next.js/React Native integration)
- Runtime: Cloudflare Workers (for backend)
- Monorepo managed with pnpm workspaces

## 3. Frameworks & Libraries (Backend)
- Framework: Hono (Cloudflare Workers, similar to Express)
- Key libraries:
  - zod (schema validation)
  - @hono/zod-validator (request validation)
  - @hono/jwt (JWT authentication)
  - @hono/cors (CORS middleware)
  - @hono/logger (logging middleware)
  - @hono/router (routing utilities)
  - cloudflare/kv-asset-handler (for asset and KV storage integration)
  - dotenv (environment variable management for local dev)
  - @biomejs/biome (formatting/linting)
  - vitest (testing)

## 4. Frameworks & Libraries (Frontend)
- Framework: Next.js (web, possibly mobile via Next.js/React Native integration)
- Styling: Tailwind CSS
- Key UI libraries:
  - shadcn/ui (for accessible, customizable UI components)
  - Headless UI (for unstyled, accessible UI primitives)
  - @tanstack/react-query (data fetching/caching)
  - Zustand (state management)
  - react-hook-form (form management)
  - zod (form validation)
  - next-auth (authentication, if needed)
  - @biomejs/biome (formatting/linting)
  - vitest (testing)

## 5. Database & Data Storage
- Primary storage: Cloudflare KV (key-value store) for fast, globally distributed note storage
- Optionally, Cloudflare D1 (SQLite-compatible) for relational data if needed in the future
- Caching: Cloudflare Cache API for static assets and frequently accessed data
- No traditional SQL/NoSQL database required for MVP; Cloudflare KV is sufficient for simple note storage
- Object storage: Not required for MVP, but Cloudflare R2 can be used for file attachments if needed
- Message queues: Not required for MVP

## 6. Infrastructure & Deployment
- Hosting: Cloudflare (Cloudflare Pages for frontend, Cloudflare Workers for backend API)
- CI/CD: GitHub Actions (for linting, testing, and deployment)
- Containerization: Not required (Cloudflare Workers/Pages are serverless)
- Orchestration: Not required
- DNS: Managed via Cloudflare
- Environment variables: Managed via Cloudflare dashboard and dotenv for local development

## 7. APIs & Integrations
- The project exposes its own RESTful API (via Hono on Cloudflare Workers)
- API style: REST (JSON over HTTPS)
- API documentation: OpenAPI (Swagger) or typedoc for auto-generated docs
- Third-party integrations: None required for MVP, but can integrate with authentication providers (e.g., GitHub, Google) via next-auth if needed
- Analytics: Cloudflare Analytics or Vercel Analytics for usage tracking

## 8. Development Tools & Standards
- Version control: Git
- Repository hosting: GitHub
- Formatting: Biome (enforced with pre-commit git hooks)
- Linting: Biome
- Testing: Vitest (unit, integration, and E2E tests)
- IDE: Visual Studio Code (recommended)
- Code formatting: EditorConfig, Biome
- Commit hooks: Husky (for pre-commit formatting/linting)
- Testing strategies: Unit tests for logic, integration tests for API, E2E tests with Playwright or Cypress (optional for MVP)

## 9. Security Considerations
- Use HTTPS everywhere (enforced by Cloudflare)
- Input validation with zod on both frontend and backend
- JWT-based authentication for API endpoints (using @hono/jwt)
- CORS configured with @hono/cors
- Environment variables managed securely (never commit secrets)
- Dependency scanning via GitHub Dependabot
- Regular updates of dependencies
- Use of Content Security Policy (CSP) headers
- Rate limiting (Cloudflare Workers/Cloudflare settings)
- Secrets management via Cloudflare dashboard

## 10. Rationale & Alternatives Considered
- TypeScript: Chosen for type safety, maintainability, and cross-platform compatibility. Alternative: JavaScript (less type safety).
- Next.js: Rapid development, SSR/SSG support, large ecosystem. Alternatives: Remix, SvelteKit, Astro (Next.js is most mature for React-based apps).
- Hono: Lightweight, fast, Cloudflare-native. Alternatives: Express (not Cloudflare-native), Miniflare (dev only), or raw Workers API (less ergonomic).
- Tailwind CSS: Utility-first, fast prototyping, highly customizable. Alternatives: CSS Modules, styled-components, Chakra UI (Tailwind is most flexible for MVP).
- pnpm: Fast, disk-efficient monorepo management. Alternatives: npm, yarn (pnpm is fastest and best for monorepos).
- Biome: Fast, all-in-one formatter/linter. Alternatives: ESLint + Prettier (Biome is simpler and faster).
- Vitest: Fast, Vite-native testing. Alternatives: Jest (Vitest is faster for Vite/Next.js projects).
- Cloudflare KV: Simple, globally distributed, low-latency storage. Alternatives: D1 (for relational), FaunaDB, Supabase (KV is simplest for MVP).
- Cloudflare Pages/Workers: Serverless, globally distributed, easy integration. Alternatives: Vercel, Netlify, AWS Lambda (Cloudflare is preferred for global reach and cost). 