# AGENTS.md

Project context, rules, and conventions for AI agents contributing to this repository.

## Commands

All scripts are defined in `package.json` and work with any package manager.

| Task                  | Script              | Notes                          |
| --------------------- | ------------------- | ------------------------------ |
| Setup (first time)    | `setup`             |                                |
| Dev server            | `dev`               | Opens at http://localhost:5173 |
| Build                 | `build`             |                                |
| Start prod server     | `start`             |                                |
| Preview build         | `preview`           |                                |
| Typecheck             | `typecheck`         |                                |
| Lint                  | `lint`              |                                |
| Lint (autofix)        | `lint:fix`          |                                |
| Format                | `fmt`               |                                |
| Format check          | `fmt:check`         |                                |
| Run tests             | `test`              |                                |
| Run single test       | `vitest run <path>` | Via package runner (npx/bunx)  |
| Unused code check     | `knip`              |                                |
| DB push schema        | `db:push`           |                                |
| DB generate migration | `db:generate`       |                                |
| DB run migrations     | `db:migrate`        |                                |
| DB seed               | `db:seed`           |                                |
| DB studio             | `db:studio`         |                                |

## Architecture

Full-stack React app using **React Router 7 framework mode** with SSR, **Better Auth** for authentication, **Drizzle ORM** with SQLite, and **Tailwind CSS v4**.

### Path alias

`~/*` maps to `./app/*` (configured in tsconfig.json).

### Routing

Use the `react-router-framework-mode` skill when generating routes, loaders, actions, middleware, protected routes, or nested layouts.

Routes are defined programmatically in `app/routes.ts` using helpers from `@react-router/dev/routes` (`index`, `route`, `layout`, `prefix`). Typed route parameters and loader data are auto-generated in `.react-router/types/`.

Middleware is enabled via `v8_middleware: true` in `react-router.config.ts`.

- Follow React Router 7 framework mode patterns strictly
- Do not generate legacy React Router v1-v6 patterns or deprecated APIs
- Do not invent router APIs

### Authentication

Use the `better-auth-best-practices` skill when implementing auth flows. Additional skills for specific features:

- `email-and-password-best-practices` — Email/password sign-up and sign-in
- `two-factor-authentication-best-practices` — 2FA setup and verification
- `organization-best-practices` — Multi-tenant organizations and RBAC
- `better-auth-security-best-practices` — Rate limiting, CSRF, session security, trusted origins
- `create-auth-skill` — Scaffolding new auth layers

Auth flow:

- **Server:** `app/lib/auth.server.ts` — Better Auth instance with Drizzle adapter and email/password enabled.
- **Client:** `app/lib/auth-client.ts` — Exports `signIn`, `signUp`, `signOut`, `useSession`.
- **API:** `app/routes/api/auth/catch-all.ts` — Catches all `/api/auth/*` requests and delegates to `auth.handler()`.
- **Middleware:** `app/lib/auth-middleware.server.ts` — `requireAuth` (redirects unauthenticated to `/auth`, sets session on context) and `requireGuest` (redirects authenticated to `/dashboard`).
- **Context:** Session is passed via React Router context (`app/context.ts` using `createContext<Session>()`). Middleware sets it, loaders/components read it.
- Auth mutations (`signIn`, `signUp`, `signOut`) use `clientAction` exports (browser-side), not server actions, because Better Auth client manages session cookies directly.

Rules:

- Do not invent custom auth logic or implement JWT handling manually
- Use Better Auth client/server utilities
- Respect middleware-based auth protection patterns
- Keep auth logic out of UI components

### Database

Drizzle ORM with `@libsql/client` (libSQL/Turso). Schema in `app/db/schema.ts` (user, session, account, verification tables). Connection in `app/db/index.server.ts`. In production, `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` (set via Vercel Turso integration) connect to Turso. Locally, falls back to `file:{DATABASE_URL}` for a SQLite file.

### Deployment

This branch (`deploy/vercel`) is configured for Vercel deployment. Key differences from `main`:

- **Database driver:** `@libsql/client` instead of `better-sqlite3`
- **Drizzle dialect:** `turso` instead of `sqlite`
- **Vercel preset:** `@vercel/react-router` with `vercelPreset()` in `react-router.config.ts`
- **Custom server entry:** `server/app.ts` provides `RouterContextProvider` (required for middleware on Vercel)
- **Vite config:** SSR build uses `server/app.ts` as rollup input
- **Auth:** `trustedOrigins` includes `VERCEL_URL` for preview deployments; `baseURL` is auto-detected from requests

### Server-only code

Files suffixed `.server.ts` are excluded from client bundles (auth, db, middleware). Do not mix server and client code.

### UI Components

Use the shadcn MCP server to search, preview, and install base-ui components. Uses **shadcn** with **base-ui** primitives (not Radix).

- Always use base-ui components via shadcn before creating custom primitives
- Do NOT use sonner-based toast — use the base-ui toast implementation instead
- Use existing button variants, color tokens, spacing scale, and typography styles before creating new ones
- Respect dark mode support
- Avoid inline styles and hardcoded colors
- When unsure about styling, inspect existing components and mirror codebase patterns

### UI Design

Use the `frontend-design` skill when building pages, components, or layouts. Use the `web-design-guidelines` skill when reviewing UI for accessibility and design compliance.

- Prefer composition over customization
- Keep components small and composable

### Tooling

- **Formatter:** oxfmt (not Prettier) — configured in `.oxfmtrc.json` with Tailwind class sorting
- **Linter:** oxlint (not ESLint) — configured in `.oxlintrc.json`
- **Tests:** vitest (not Jest)
- **Commits:** Conventional commits enforced via commitlint
- **Git hooks** (`.githooks/`): pre-commit auto-formats + lint + knip; pre-push runs typecheck + tests; commit-msg runs commitlint

Do not generate Prettier or ESLint configs. Follow existing formatting style. Avoid unnecessary formatting changes.

### Environment variables

Required in `.env`:

- `BETTER_AUTH_SECRET` — Auth secret key
- `DATABASE_URL` — SQLite file path (local dev)

Set via Vercel Turso integration (production/preview):

- `TURSO_DATABASE_URL` — Turso database URL
- `TURSO_AUTH_TOKEN` — Turso auth token

## Code Rules

### React Patterns

Use the `vercel-react-best-practices` skill when writing or refactoring React components. Use the `vercel-composition-patterns` skill for component architecture decisions (compound components, render props, scalable APIs).

- Use functional components only
- Use hooks correctly (no conditional hooks)
- Avoid deeply nested components
- Avoid unnecessary re-renders
- Use lazy loading for heavy routes
- Prefer suspense where appropriate
- Keep bundle size minimal

### TypeScript

- Use TypeScript strictly — avoid `any`
- Prefer explicit return types on exported functions

### State Management

- Prefer local state
- Avoid global state unless necessary
- Do not introduce new state libraries without explicit instruction

### Testing

- Write tests using vitest syntax — do not use Jest
- Prefer unit tests for utilities
- Prefer integration-style tests for routes
- Avoid testing implementation details
- Mock external services appropriately

### Dependencies

Before adding a new dependency:

1. Check if base-ui already provides the solution
2. Check if React Router or Better Auth already solves it
3. Prefer platform APIs when possible
4. Do not add UI, styling, toast, or form libraries unless explicitly required

### Files & Structure

- Follow existing project structure
- Do not invent new top-level folders
- Place route files according to React Router framework mode conventions
- Keep UI components separated from business logic

### Error Handling

- Use route error boundaries
- Use middleware for cross-cutting concerns
- Avoid silent failures
- Provide meaningful error messages
- Do not expose sensitive information

### Accessibility

- Use semantic HTML
- Use accessible base-ui components
- Ensure buttons have proper type
- Ensure inputs are labeled
- Avoid div-based click handlers

### Security

Use the `better-auth-security-best-practices` skill for security-related implementation.

- Never expose secrets or log sensitive tokens
- Sanitize user input where required
- Follow Better Auth best practices
