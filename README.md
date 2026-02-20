# LLM Stack

A full-stack React starter template, optimized for AI-assisted development. Configured so LLM agents can understand, modify, and extend the codebase.

## Tech Stack

| Category    | Technology                                                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework   | [React Router 7](https://reactrouter.com/) (framework mode, SSR)                                                                                  |
| UI          | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Base UI](https://base-ui.com/) via [shadcn](https://ui.shadcn.com/) |
| Auth        | [Better Auth](https://www.better-auth.com/) (email/password, sessions, middleware)                                                                |
| Database    | [Drizzle ORM](https://orm.drizzle.team/) + SQLite ([better-sqlite3](https://github.com/WiseLibs/better-sqlite3))                                  |
| Validation  | [Zod](https://zod.dev/)                                                                                                                           |
| Formatter   | [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) (with Tailwind class sorting)                                                             |
| Linter      | [oxlint](https://oxc.rs/docs/guide/usage/linter.html)                                                                                             |
| Testing     | [Vitest](https://vitest.dev/)                                                                                                                     |
| Unused code | [Knip](https://knip.dev/)                                                                                                                         |
| Commits     | [Conventional Commits](https://www.conventionalcommits.org/) via [commitlint](https://commitlint.js.org/)                                         |
| Runtime     | [Bun](https://bun.sh/)                                                                                                                            |
| Bundler     | [Vite 7](https://vite.dev/)                                                                                                                       |
| Language    | [TypeScript](https://www.typescriptlang.org/) (strict mode)                                                                                       |

## Features

- **Server-side rendering** with React Router 7 framework mode
- **Authentication** with email/password sign up, sign in, and session management
- **Protected routes** via middleware (`requireAuth` / `requireGuest`)
- **Color scheme toggle** with light, dark, and system modes (cookie-persisted)
- **Type-safe database** with Drizzle ORM, auto-generated route types, and Zod validation
- **Auto-formatting on commit** via git hooks (oxfmt on staged files)
- **11 custom AI agent skills** for React Router, Better Auth, security, design patterns, and more
- **4 MCP servers** for component installation, auth docs, library docs, and browser automation

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.3.9 or later)

### Installation

```sh
git clone https://github.com/nikolailehbrink/llm-stack.git
cd llm-stack
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```sh
BETTER_AUTH_SECRET=<your-secret-key>
BETTER_AUTH_URL=http://localhost:5173
DATABASE_URL=sqlite.db
```

Generate a secret key:

```sh
openssl rand -base64 32
```

### Database Setup

Push the schema to create the SQLite database:

```sh
bun run db:push
```

This creates the `user`, `session`, `account`, and `verification` tables.

### Development

```sh
bun run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

## Scripts

| Script        | Command               | Description                      |
| ------------- | --------------------- | -------------------------------- |
| `dev`         | `bun run dev`         | Start dev server with HMR        |
| `build`       | `bun run build`       | Production build                 |
| `start`       | `bun run start`       | Production server                |
| `preview`     | `bun run preview`     | Preview build with Vite          |
| `typecheck`   | `bun run typecheck`   | Generate route types and run tsc |
| `lint`        | `bun run lint`        | Run oxlint                       |
| `lint:fix`    | `bun run lint:fix`    | Run oxlint with auto-fix         |
| `fmt`         | `bun run fmt`         | Format with oxfmt                |
| `fmt:check`   | `bun run fmt:check`   | Check formatting                 |
| `test`        | `bun run test`        | Run tests with Vitest            |
| `knip`        | `bun run knip`        | Check for unused code            |
| `db:push`     | `bun run db:push`     | Push schema to database          |
| `db:generate` | `bun run db:generate` | Generate migration files         |
| `db:migrate`  | `bun run db:migrate`  | Run migrations                   |
| `db:seed`     | `bun run db:seed`     | Seed database with demo user     |
| `db:studio`   | `bun run db:studio`   | Open Drizzle Studio              |

## Project Structure

```
llm-stack/
├── .agents/skills/          # 11 custom AI agent skills
├── .githooks/               # Git hooks (pre-commit, pre-push, commit-msg)
├── .vscode/                 # VS Code workspace settings and extensions
├── app/
│   ├── components/
│   │   ├── ui/              # Base UI components (button, card, input, label, tooltip)
│   │   └── color-scheme-toggle.tsx
│   ├── db/
│   │   ├── index.server.ts  # Database connection (WAL mode)
│   │   └── schema.ts        # Drizzle schema
│   ├── lib/
│   │   ├── auth.server.ts   # Better Auth instance
│   │   ├── auth-client.ts   # Client-side auth (signIn, signUp, signOut, useSession)
│   │   ├── auth-middleware.server.ts  # requireAuth & requireGuest
│   │   ├── color-scheme.server.ts     # Color scheme cookie handling
│   │   └── utils.ts         # cn() utility
│   ├── routes/
│   │   ├── home.tsx         # Landing page
│   │   ├── auth.tsx         # Sign in / sign up
│   │   ├── protected/
│   │   │   ├── layout.tsx   # Auth middleware wrapper
│   │   │   └── dashboard.tsx
│   │   └── api/
│   │       ├── auth/catch-all.ts    # Better Auth handler
│   │       └── color-scheme.ts      # Color scheme endpoint
│   ├── routes.ts            # Route definitions
│   ├── root.tsx             # Root layout
│   ├── context.ts           # Session context
│   └── app.css              # Tailwind v4 theme and styles
├── CLAUDE.md                # Project context for Claude Code
├── AGENTS.md                # Mandatory rules for AI agents
└── .mcp.json                # MCP server configuration
```

Files suffixed `.server.ts` are excluded from client bundles.

## LLM Configuration

This project is designed to work with [Claude Code](https://docs.anthropic.com/en/docs/claude-code). The AI agent configuration consists of three layers:

### CLAUDE.md & AGENTS.md

`CLAUDE.md` provides project context — architecture, commands, conventions. `AGENTS.md` defines mandatory rules for AI agents: use Base UI via shadcn, follow React Router 7 framework mode, use Better Auth patterns, write Vitest tests, format with oxfmt, lint with oxlint.

### Custom Skills (11)

Located in `.agents/skills/`, these provide specialized knowledge:

| Skill                                      | Purpose                                   |
| ------------------------------------------ | ----------------------------------------- |
| `react-router-framework-mode`              | Routes, loaders, actions, middleware, SSR |
| `better-auth-best-practices`               | Auth flow patterns and integration        |
| `better-auth-security-best-practices`      | Rate limiting, CSRF, session security     |
| `email-and-password-best-practices`        | Secure email/password auth                |
| `two-factor-authentication-best-practices` | 2FA implementation                        |
| `create-auth-skill`                        | Auth layer scaffolding                    |
| `organization-best-practices`              | Multi-tenant orgs and RBAC                |
| `frontend-design`                          | Production-grade UI design                |
| `web-design-guidelines`                    | Accessibility and UX auditing             |
| `vercel-react-best-practices`              | React/Next.js performance optimization    |
| `vercel-composition-patterns`              | Component composition and architecture    |

### MCP Servers (4)

Configured in `.mcp.json`:

| Server              | Type                                    | Purpose                                            |
| ------------------- | --------------------------------------- | -------------------------------------------------- |
| **shadcn**          | CLI (`bunx shadcn@latest mcp`)          | Install and manage Base UI components              |
| **better-auth**     | HTTP                                    | Query Better Auth documentation                    |
| **context7**        | HTTP                                    | Fetch up-to-date docs for any library              |
| **chrome-devtools** | CLI (`bunx chrome-devtools-mcp@latest`) | Browser automation, performance tracing, debugging |

## Git Hooks

Hooks are stored in `.githooks/` and activated automatically on `bun install` via the `prepare` script.

| Hook           | What it does                                               |
| -------------- | ---------------------------------------------------------- |
| **pre-commit** | Auto-formats staged files with oxfmt, runs oxlint and knip |
| **pre-push**   | Runs typecheck and tests                                   |
| **commit-msg** | Enforces conventional commit format                        |

## Auth Flow

1. User visits `/auth` to sign up or sign in with email/password
2. Better Auth handles credentials and creates a session cookie
3. Protected routes (e.g. `/dashboard`) use `requireAuth` middleware
4. Session data is passed via React Router context to loaders and components
5. `requireGuest` middleware redirects authenticated users away from `/auth`

Auth mutations use `clientAction` exports (browser-side) because Better Auth's client manages session cookies directly.

## License

[MIT](LICENSE)
