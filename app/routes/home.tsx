import { Link } from "react-router";

import { ColorSchemeToggle } from "~/components/color-scheme-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
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

const llmFeatures = [
  {
    title: "CLAUDE.md",
    description:
      "Project context file that Claude Code reads automatically to understand the codebase.",
  },
  {
    title: "AGENTS.md",
    description:
      "Mandatory rules for AI agents covering component library, routing, auth, testing, and code style.",
  },
  {
    title: "11 Custom Skills",
    description:
      "React Router framework mode, Better Auth patterns, security, 2FA, composition patterns, design, and more.",
  },
  {
    title: "3 MCP Servers",
    description:
      "shadcn for UI components, Better Auth for auth docs, and Context7 for up-to-date library docs.",
  },
  {
    title: "Conventional Commits",
    description: "Structured commit messages that agents follow automatically via commitlint.",
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
    <TooltipProvider>
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
            <Button nativeButton={false} render={<Link to="/auth">Get Started</Link>} />
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
            {/* Left gradient line */}
            <div className="absolute top-[15%] bottom-[10%] left-0 z-10 w-px bg-linear-to-b from-transparent via-foreground/20 to-transparent" />
            {/* Right gradient line */}
            <div className="absolute top-[10%] right-0 bottom-[20%] z-10 w-px bg-linear-to-b from-transparent via-foreground/25 to-transparent" />
            {/* Top gradient line */}
            <div className="absolute top-0 right-[20%] left-[10%] z-10 h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent" />
            {/* Bottom gradient line */}
            <div className="absolute right-[10%] bottom-0 left-[25%] z-10 h-px bg-linear-to-r from-transparent via-foreground/15 to-transparent" />
            <div className="overflow-hidden rounded-xl border border-border bg-card">
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
            </div>
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
          <div className="grid gap-4 sm:grid-cols-2">
            {llmFeatures.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
