import { Link } from "react-router";

import { ColorSchemeToggle } from "~/components/color-scheme-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LLM Stack" },
    {
      name: "description",
      content:
        "Full-stack React starter optimized for AI-assisted development with React Router 7, Better Auth, Drizzle ORM, and Tailwind CSS v4.",
    },
  ];
}

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "size-4 shrink-0",
};

const additionalFeatures = [
  {
    label: "Dark mode without FOUC",
    detail: "Inline script sets the color-scheme before first paint using a cookie",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
  {
    label: "One-command setup",
    detail: "Install, generate env, push schema, seed DB, start dev server",
    icon: (
      <svg {...iconProps}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    ),
  },
  {
    label: "Unused code detection",
    detail: "Knip flags dead files, exports, and dependencies",
    icon: (
      <svg {...iconProps}>
        <path d="m3 6 3 1 7.89 3.26a2 2 0 0 1 1.11 1.11L18 17l1 3" />
        <path d="M6 3 3 6" />
        <path d="M21 18l-3 3" />
        <path d="m2 2 20 20" />
      </svg>
    ),
  },
  {
    label: "Clean script",
    detail: "Removes node_modules, .react-router, and build",
    icon: (
      <svg {...iconProps}>
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    ),
  },
  {
    label: "Database seeding",
    detail: "Creates a demo user during setup",
    icon: (
      <svg {...iconProps}>
        <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
        <path d="M21.18 8.02c-1-2.3-2.85-4.17-5.16-5.18" />
      </svg>
    ),
  },
  {
    label: "Auto-sorting",
    detail: "oxfmt sorts imports and package.json fields on every format",
    icon: (
      <svg {...iconProps}>
        <path d="m3 16 4 4 4-4" />
        <path d="M7 20V4" />
        <path d="m21 8-4-4-4 4" />
        <path d="M17 4v16" />
      </svg>
    ),
  },
  {
    label: "Exact version pinning",
    detail: "No caret or tilde ranges via .npmrc",
    icon: (
      <svg {...iconProps}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    label: "Conventional commits",
    detail: "commitlint enforces feat/fix/chore format",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Git hooks",
    detail: "Pre-commit runs format, lint, and Knip. Pre-push runs typecheck and tests",
    icon: (
      <svg {...iconProps}>
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    label: "jsx-a11y linting",
    detail: "Accessibility rules with React Router component mappings",
    icon: (
      <svg {...iconProps}>
        <circle cx="16" cy="4" r="1" />
        <path d="m18 19 1-7-6 1" />
        <path d="m5 8 3-3 5.5 3-2.36 3.5" />
        <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
        <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
      </svg>
    ),
  },
];

const llmFeatureGroups = [
  {
    heading: "MCP Servers",
    items: [
      {
        title: "shadcn MCP",
        description:
          "Agents search, preview, and install base-ui components from the registry without leaving the editor.",
      },
      {
        title: "Context7 MCP",
        description:
          "Fetches up-to-date documentation and code examples for any library — no stale training data.",
      },
      {
        title: "Better Auth MCP",
        description:
          "Searches auth docs and asks an AI support agent about Better Auth features and troubleshooting.",
      },
      {
        title: "Chrome DevTools MCP",
        description:
          "Inspects the page, optimizes LCP, catches console errors, and runs performance traces.",
      },
    ],
  },
  {
    heading: "Custom Skills",
    items: [
      {
        title: "React Router 7 Skill",
        description:
          "Framework mode patterns for routes, loaders, actions, middleware, and nested layouts — beyond training cutoff.",
      },
      {
        title: "Better Auth Skills",
        description:
          "Email/password, 2FA, organizations, and security best practices — pre-wired patterns agents follow.",
      },
      {
        title: "React Best Practices Skill",
        description:
          "Vercel's performance optimization guidelines for React 19 and server rendering patterns.",
      },
      {
        title: "Frontend Design Skill",
        description:
          "Generates distinctive, production-grade UI with creative typography, color, and motion — avoids generic AI aesthetics.",
      },
      {
        title: "Composition Patterns Skill",
        description:
          "Compound components, render props, and scalable React APIs from Vercel Engineering.",
      },
    ],
  },
  {
    heading: "Project",
    items: [
      {
        title: "CLAUDE.md & AGENTS.md",
        description:
          "Project context and agent rules that are read automatically. Covers commands, architecture, auth flow, DB, component library, and code conventions.",
      },
      {
        title: "Fast Tooling",
        description:
          "oxfmt, oxlint, and Knip are Rust-based and run in milliseconds — agents get instant feedback on every change.",
      },
    ],
  },
];

interface PackageEntry {
  name: string;
  title: string;
  url: string;
  description: string;
  ai: string;
}

const deps: PackageEntry[] = [
  {
    name: "@base-ui/react",
    title: "Base UI",
    url: "https://base-ui.com",
    description: "Unstyled, accessible UI primitives powering shadcn components.",
    ai: "Agents get consistent, composable building blocks without fighting opinionated styling.",
  },
  {
    name: "@fontsource",
    title: "Fontsource",
    url: "https://fontsource.org",
    description: "Self-hosted open-source fonts — Inter and Instrument Serif loaded locally.",
    ai: "No external font requests — agents get consistent typography without CDN dependencies.",
  },
  {
    name: "better-auth",
    title: "Better Auth",
    url: "https://www.better-auth.com",
    description: "Type-safe authentication with email/password, sessions, and Drizzle adapter.",
    ai: "Agents scaffold auth flows without custom JWT logic — middleware, routes, and client are pre-wired.",
  },
  {
    name: "drizzle-orm",
    title: "Drizzle ORM",
    url: "https://orm.drizzle.team",
    description: "Type-safe ORM with SQLite and WAL mode for fast reads.",
    ai: "Agents get full autocompletion on queries and schema changes with zero runtime overhead.",
  },
  {
    name: "react",
    title: "React 19",
    url: "https://react.dev",
    description: "UI library with server rendering, streaming, and concurrent features.",
    ai: "The foundation agents build every component on — RSC-ready with React 19.",
  },
  {
    name: "react-router",
    title: "React Router 7",
    url: "https://reactrouter.com",
    description: "Full-stack framework with SSR, typed routes, and middleware.",
    ai: "Agents use loaders, actions, and route modules for end-to-end type-safe data flow.",
  },
  {
    name: "zod",
    title: "Zod 4",
    url: "https://zod.dev",
    description: "Schema validation with full TypeScript type inference.",
    ai: "Agents define data shapes once and get runtime validation plus static types automatically.",
  },
];

const toolingDeps: PackageEntry[] = [
  {
    name: "tailwindcss",
    title: "Tailwind CSS 4",
    url: "https://tailwindcss.com",
    description: "Utility-first CSS framework with design tokens and dark mode.",
    ai: "Agents compose styles directly in markup — no context-switching to separate CSS files.",
  },
  {
    name: "vite",
    title: "Vite 7",
    url: "https://vite.dev",
    description: "Fast dev server and optimized production builds with HMR.",
    ai: "Instant feedback loop — agents see changes reflected immediately during development.",
  },
  {
    name: "oxfmt",
    title: "Oxfmt",
    url: "https://oxc.rs/docs/guide/usage/formatter.html",
    description:
      "Next-gen Rust-based formatter with Tailwind class sorting. Part of the VoidZero toolchain — orders of magnitude faster than Prettier.",
    ai: "Instant formatting on save — agents never need to think about code style.",
  },
  {
    name: "oxlint",
    title: "Oxlint",
    url: "https://oxc.rs/docs/guide/usage/linter.html",
    description:
      "Next-gen Rust-based linter with jsx-a11y, unicorn, and React plugins. Part of the VoidZero toolchain — orders of magnitude faster than ESLint.",
    ai: "Catches accessibility, correctness, and style issues before agents commit code.",
  },
  {
    name: "knip",
    title: "Knip",
    url: "https://knip.dev",
    description: "Detects unused files, dependencies, and exports.",
    ai: "Keeps the codebase clean as agents add and remove code across the project.",
  },
  {
    name: "typescript",
    title: "TypeScript",
    url: "https://www.typescriptlang.org",
    description: "Strict type system across the entire stack.",
    ai: "Agents get compile-time safety with auto-generated route types from React Router.",
  },
  {
    name: "vitest",
    title: "Vitest 4",
    url: "https://vitest.dev",
    description:
      "Next-gen test runner powered by VoidZero with native Vite integration — dramatically faster than Jest.",
    ai: "Agents write and run tests with instant feedback — no separate build step needed.",
  },
];

function DependencyLine({ entry, isLast }: { entry: PackageEntry; isLast: boolean }) {
  return (
    <span className="text-foreground/50">
      <span>{"    "}</span>
      <Tooltip>
        <TooltipTrigger
          render={
            <a href={entry.url} target="_blank" rel="noopener noreferrer">
              {`"${entry.name}"`}
            </a>
          }
          className="rounded-sm border-b border-dashed border-foreground/25 px-0.5 text-foreground transition-all hover:border-foreground/50 hover:bg-foreground/10"
        />
        <TooltipContent side="top" className="flex max-w-xs flex-col gap-1.5 rounded-sm shadow-xl">
          <p className="text-sm font-semibold">{entry.title}</p>
          <p>{entry.description}</p>
          <p className="border-t border-current/10 pt-1.5 opacity-70">AI: {entry.ai}</p>
        </TooltipContent>
      </Tooltip>
      {!isLast && <span className="text-background/50">,</span>}
    </span>
  );
}

export default function Home() {
  return (
    <TooltipProvider closeDelay={200}>
      <div className="container mx-auto flex min-h-screen flex-col items-center gap-8 px-4 py-8">
        <header className="flex w-full max-w-4xl justify-end">
          <ColorSchemeToggle />
        </header>

        {/* Hero */}
        <section className="flex w-full max-w-4xl flex-col items-center gap-4 rounded-xl bg-background px-8 py-20 text-center text-foreground scheme-dark dark:scheme-light">
          <h1 className="font-serif text-3xl sm:text-5xl">LLM Stack</h1>
          <p className="text-muted-foreground">
            A full-stack React starter template, optimized for AI-assisted development. <br />{" "}
            Configured so LLM agents can understand, modify, and extend the codebase.
          </p>
          <div className="mt-2 flex gap-4">
            <Button
              nativeButton={false}
              render={
                <Link
                  to="https://github.com/nikolailehbrink/llm-stack"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </Link>
              }
            />
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link to="/dashboard">Dashboard</Link>}
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="flex w-full max-w-4xl flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl">Tooling</h2>
            <p className="text-muted-foreground">
              Everything that powers the stack. Hover the dependencies to learn more.
            </p>
          </div>
          <div className="relative w-full">
            <Card>
              <pre className="flex justify-center p-6 font-mono text-xs leading-relaxed wrap-break-word whitespace-pre-wrap sm:p-8 sm:text-sm">
                <code className="text-foreground/50">
                  <span>{"{"}</span>
                  {"\n"}
                  <span>{"  "}</span>
                  <span>{'"dependencies"'}</span>
                  <span>{": ["}</span>
                  {"\n"}
                  <span className="flex flex-col">
                    {deps.map((entry, i) => (
                      <DependencyLine
                        key={entry.name}
                        entry={entry}
                        isLast={i === deps.length - 1}
                      />
                    ))}
                  </span>
                  <span>{"  ],"}</span>
                  {"\n"}
                  <span>{"  "}</span>
                  <span>{'"devDependencies"'}</span>
                  <span>{": ["}</span>
                  {"\n"}
                  <span className="flex flex-col">
                    {toolingDeps.map((entry, i) => (
                      <DependencyLine
                        key={entry.name}
                        entry={entry}
                        isLast={i === toolingDeps.length - 1}
                      />
                    ))}
                  </span>
                  <span>{"  ]"}</span>
                  {"\n"}
                  <span>{"}"}</span>
                </code>
              </pre>
            </Card>
          </div>
        </section>

        {/* LLM-Optimized */}
        <section className="flex w-full max-w-4xl flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl">LLM-Optimized</h2>
            <p className="text-muted-foreground">
              Built so AI agents can understand and contribute to the project effectively.
            </p>
          </div>
          <Tabs defaultValue={llmFeatureGroups[0].heading}>
            <TabsList>
              {llmFeatureGroups.map((group) => (
                <TabsTrigger key={group.heading} value={group.heading}>
                  {group.heading}
                </TabsTrigger>
              ))}
            </TabsList>
            {llmFeatureGroups.map((group) => (
              <TabsContent key={group.heading} value={group.heading}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <Card key={item.title}>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Additional Features */}
        <section className="flex w-full max-w-4xl flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl">Additional Features</h2>
            <p className="text-muted-foreground">
              Pre-configured defaults so you don't have to set them up yourself.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl bg-foreground/10 ring-1 ring-foreground/10 sm:grid-cols-2">
            {additionalFeatures.map((item) => (
              <div key={item.label} className="flex gap-3 bg-card px-4 py-3">
                <span className="mt-0.5 text-muted-foreground">{item.icon}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
