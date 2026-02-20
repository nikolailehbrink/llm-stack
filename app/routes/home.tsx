import { Link } from "react-router";
import type { Route } from "./+types/home";
import { ColorSchemeToggle } from "~/components/color-scheme-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

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

const techStack = [
  {
    title: "React Router 7",
    description:
      "Framework mode with SSR, typed routes, and middleware support for full-stack apps.",
  },
  {
    title: "Better Auth",
    description:
      "Email/password authentication with Drizzle adapter and session middleware out of the box.",
  },
  {
    title: "Drizzle ORM",
    description: "Type-safe SQLite database with better-sqlite3 and WAL mode for fast reads.",
  },
  {
    title: "Tailwind CSS v4",
    description:
      "Utility-first styling with shadcn components, base-ui primitives, and design tokens.",
  },
  {
    title: "React 19",
    description: "Latest React with server rendering, streaming, and concurrent features.",
  },
  {
    title: "TypeScript",
    description: "Strict types throughout with auto-generated route types for full type safety.",
  },
  {
    title: "Vite",
    description:
      "Fast dev server and optimized production builds with HMR and Tailwind integration.",
  },
  {
    title: "Bun",
    description:
      "Fast JavaScript runtime and package manager with exact version pinning via .npmrc.",
  },
];

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

const tooling: { title: string; description: string }[] = [
  { title: "Vitest", description: "Fast unit and integration testing" },
  {
    title: "oxfmt",
    description: "Rust-based formatter with Tailwind class sorting",
  },
  {
    title: "oxlint",
    description: "Rust-based linter with jsx-a11y, unicorn, and React plugins",
  },
  { title: "Knip", description: "Detects unused files, dependencies, and exports" },
  { title: "commitlint", description: "Enforces conventional commit messages" },
  {
    title: "Git Hooks",
    description: "Pre-commit (fmt + lint + knip), pre-push (typecheck + tests)",
  },
  {
    title: "Docker",
    description: "Multi-stage Alpine build for production deployment",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-8 px-4 py-8 sm:py-16">
      <header className="flex w-full max-w-4xl justify-end">
        <ColorSchemeToggle />
      </header>

      {/* Hero */}
      <section className="flex w-full max-w-4xl flex-col items-center gap-6 rounded-xl bg-background py-20 text-center text-foreground scheme-dark dark:scheme-light">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">LLM Stack</h1>
        <p className="text-lg text-muted-foreground">
          A full-stack React starter template, optimized for AI-assisted development. <br />{" "}
          Configured so LLM agents can understand, modify, and extend the codebase.
        </p>
        <div className="flex gap-3">
          <Button render={<Link to="/auth">Get Started</Link>} />
          <Button variant="outline" render={<Link to="/dashboard">Dashboard</Link>} />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="flex w-full max-w-4xl flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tech Stack</h2>
          <p className="text-muted-foreground">
            Modern, type-safe technologies for full-stack apps.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {techStack.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* LLM-Optimized */}
      <section className="flex w-full max-w-4xl flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">LLM-Optimized</h2>
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

      {/* Tooling */}
      <section className="flex w-full max-w-4xl flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tooling</h2>
          <p className="text-muted-foreground">
            Fast, strict tooling for a reliable development workflow.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tooling.map((item) => (
            <Card key={item.title} size="sm">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
