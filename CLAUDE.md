# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **Bun** (not npm/yarn/pnpm).

| Task                  | Command                                        |
| --------------------- | ---------------------------------------------- |
| Setup (first time)    | `bun run setup`                                |
| Dev server            | `bun run dev` (opens at http://localhost:5173) |
| Build                 | `bun run build`                                |
| Start prod server     | `bun run start`                                |
| Preview build         | `bun run preview`                              |
| Typecheck             | `bun run typecheck`                            |
| Lint                  | `bun run lint`                                 |
| Lint (autofix)        | `bun run lint:fix`                             |
| Format check          | `bun run fmt:check`                            |
| Format                | `bun run fmt`                                  |
| Run tests             | `bun run test`                                 |
| Run single test       | `bunx vitest run <path>`                       |
| Unused code check     | `bun run knip`                                 |
| DB push schema        | `bun run db:push`                              |
| DB generate migration | `bun run db:generate`                          |
| DB run migrations     | `bun run db:migrate`                           |
| DB seed               | `bun run db:seed`                              |
| DB studio             | `bun run db:studio`                            |

## Architecture

Full-stack React app using **React Router 7 framework mode** with SSR, **Better Auth** for authentication, **Drizzle ORM** with SQLite, and **Tailwind CSS v4**.

### Path alias

`~/*` maps to `./app/*` (configured in tsconfig.json).

### Routing

Routes are defined programmatically in `app/routes.ts` using helpers from `@react-router/dev/routes` (`index`, `route`, `layout`, `prefix`). Typed route parameters and loader data are auto-generated in `.react-router/types/`.

React Router middleware is enabled via `v8_middleware: true` in `react-router.config.ts`.

### Auth flow

- **Server:** `app/lib/auth.server.ts` — Better Auth instance with Drizzle adapter and email/password enabled.
- **Client:** `app/lib/auth-client.ts` — Exports `signIn`, `signUp`, `signOut`, `useSession`.
- **API:** `app/routes/api/auth/catch-all.ts` — Catches all `/api/auth/*` requests and delegates to `auth.handler()`.
- **Middleware:** `app/lib/auth-middleware.server.ts` — `requireAuth` (redirects unauthenticated to `/auth`, sets session on context) and `requireGuest` (redirects authenticated to `/dashboard`).
- **Context:** Session is passed via React Router context (`app/context.ts` using `createContext<Session>()`). Middleware sets it, loaders/components read it.
- Auth mutations (`signIn`, `signUp`, `signOut`) use `clientAction` exports (browser-side), not server actions, because Better Auth client manages session cookies directly.

### Database

Drizzle ORM with `better-sqlite3`. Schema in `app/db/schema.ts` (user, session, account, verification tables). Connection in `app/db/index.server.ts` with WAL mode enabled. `DATABASE_URL` env var points to the SQLite file.

### Server-only code

Files suffixed `.server.ts` are excluded from client bundles (auth, db, middleware).

### UI components

Uses **shadcn** with **base-ui** primitives (not Radix). Components installed via shadcn MCP server. Do not use sonner-based toast — use base-ui toast instead.

### Tooling

- **Formatter:** oxfmt (not Prettier) — configured in `.oxfmtrc.json` with Tailwind class sorting
- **Linter:** oxlint (not ESLint) — configured in `oxlint.config.ts`
- **Commits:** Conventional commits enforced via commitlint
- **Git hooks** (`.githooks/`): pre-commit auto-formats + lint + knip; pre-push runs typecheck + tests; commit-msg runs commitlint

### Environment variables

Required in `.env`:

- `BETTER_AUTH_SECRET` — Auth secret key
- `BETTER_AUTH_URL` — Auth base URL (http://localhost:5173 in dev)
- `DATABASE_URL` — SQLite file path
