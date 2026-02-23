import { Link, redirect, useFetcher } from "react-router";

import { ColorSchemeToggle } from "~/components/color-scheme-toggle";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Spinner } from "~/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { sessionContext } from "~/context";
import { signOut } from "~/lib/auth-client";

import type { Route } from "./+types/dashboard";

export function meta() {
  return [{ title: "Dashboard — LLM Stack" }];
}

export async function loader({ context }: Route.LoaderArgs) {
  const { user } = context.get(sessionContext);
  return { user };
}

export async function clientAction() {
  await signOut();
  throw redirect("/auth");
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const checklist = [
  { label: "Authentication", hint: "app/lib/auth.server.ts", done: true },
  { label: "Database", hint: "app/db/schema.ts", done: true },
  { label: "UI Components", hint: "app/components/ui/", done: true },
  { label: "Add your first route", hint: "app/routes.ts", done: false },
  { label: "Extend the schema", hint: "app/db/schema.ts", done: false },
  { label: "Deploy", hint: "bun run build && bun run start", done: false },
];

const quickActions = [
  {
    label: "Home",
    to: "/",
    external: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    label: "Documentation",
    to: "https://github.com/nikolailehbrink/llm-stack#readme",
    external: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    label: "Source",
    to: "https://github.com/nikolailehbrink/llm-stack",
    external: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
];

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const fetcher = useFetcher<typeof clientAction>();
  const isSigningOut = fetcher.state !== "idle";

  const firstName = user.name.split(" ")[0];
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
            <Link to="/" className="font-serif text-lg">
              LLM Stack
            </Link>
            <div className="flex items-center gap-2">
              <ColorSchemeToggle />
              <div className="mx-1 h-5 w-px bg-border" />
              <Tooltip>
                <TooltipTrigger
                  render={
                    <fetcher.Form method="post">
                      <Button
                        type="submit"
                        variant="outline"
                        size="icon-sm"
                        disabled={isSigningOut}
                        aria-label="Sign out"
                      >
                        {isSigningOut ? (
                          <Spinner />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-4"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                          </svg>
                        )}
                      </Button>
                    </fetcher.Form>
                  }
                />
                <TooltipContent side="bottom">Sign out</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* Greeting Hero */}
        <section className="bg-background text-foreground scheme-dark dark:scheme-light">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="font-serif text-3xl">
              {getGreeting()}, {firstName}
            </h1>
            <p className="mt-2 text-muted-foreground">Your LLM Stack is ready.</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Member since {memberSince} &middot; {user.email}
            </p>
          </div>
        </section>

        <main className="mx-auto max-w-4xl px-6 py-8">
          {/* Quick Actions */}
          <section className="flex flex-col gap-3">
            <div className="grid gap-3 sm:grid-cols-3">
              {quickActions.map((action) => {
                const inner = (
                  <Card size="sm" className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {action.icon}
                        {action.label}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                );

                if (action.external) {
                  return (
                    <a
                      key={action.label}
                      href={action.to}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <Link key={action.label} to={action.to}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Info Grid */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardAction>
                  <Avatar>
                    <AvatarFallback className="bg-foreground font-serif text-background">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </CardAction>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs text-muted-foreground">Name</dt>
                    <dd className="text-sm font-medium">{user.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Email</dt>
                    <dd className="text-sm font-medium">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">User ID</dt>
                    <dd className="truncate font-mono text-xs text-muted-foreground">{user.id}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Account Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardAction>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-chart-2/10 px-2 py-0.5 text-xs font-medium text-chart-2">
                    <span className="size-1.5 animate-pulse rounded-full bg-chart-2" />
                    Active
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs text-muted-foreground">Email verified</dt>
                    <dd className="text-sm font-medium">
                      {user.emailVerified ? "Verified" : "Not verified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Created</dt>
                    <dd className="text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Updated</dt>
                    <dd className="text-sm font-medium">
                      {new Date(user.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </section>

          {/* Getting Started */}
          <section className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-2xl">Getting Started</h2>
              <p className="text-sm text-muted-foreground">
                Track your progress setting up the stack.
              </p>
            </div>
            <Card>
              <CardContent>
                <ul className="space-y-3">
                  {checklist.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      {item.done ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 size-4 shrink-0 text-chart-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`text-sm font-medium ${item.done ? "text-muted-foreground line-through" : ""}`}
                        >
                          {item.label}
                        </span>
                        <code className="font-mono text-xs text-muted-foreground">{item.hint}</code>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
}
