import { useMemo, useState } from "react";
import { Link, redirect, useFetcher } from "react-router";

import { ColorSchemeToggle } from "~/components/color-scheme-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signIn, signUp } from "~/lib/auth-client";
import { requireGuest } from "~/lib/auth-middleware.server";

import type { Route } from "./+types/auth";

export function meta() {
  return [{ title: "Auth — LLM Stack" }];
}

export const middleware: Route.MiddlewareFunction[] = [requireGuest];

export function loader() {}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "sign-up": {
      const { error } = await signUp.email({
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        name: String(formData.get("name")),
      });
      if (error) return { error: error.message ?? "Sign up failed" };
      throw redirect("/dashboard");
    }
    case "sign-in": {
      const { error } = await signIn.email({
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      });
      if (error) return { error: error.message ?? "Sign in failed" };
      throw redirect("/dashboard");
    }
    default:
      return { error: "Invalid action" };
  }
}

const features = [
  {
    title: "Type-safe from DB to UI",
    description: "Drizzle ORM + React Router typed routes",
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
  {
    title: "Auth out of the box",
    description: "Email/password with session middleware",
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
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "AI-optimized codebase",
    description: "CLAUDE.md, AGENTS.md, custom skills",
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
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
  },
  {
    title: "Modern tooling",
    description: "Vite, oxfmt, oxlint, Bun",
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
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

const funFacts = [
  "GPT-3 trained on 570 GB of text — roughly 400 billion tokens. Today's frontier models train on over 15 trillion tokens, a 37x increase in just 4 years.",
  "The word \"hallucination\" became AI's word of the year in 2023. LLMs don't retrieve facts — they predict the next most likely token.",
  "Claude's context window can hold ~150,000 words — that's longer than The Lord of the Rings trilogy combined.",
  'The "T" in GPT stands for Transformer — the architecture from Google\'s 2017 paper "Attention Is All You Need," which has 180,000+ citations.',
  "Training a single frontier LLM can cost over $100 million in compute. Running inference on it costs fractions of a cent per request.",
];

export default function AuthPage() {
  const fetcher = useFetcher<typeof clientAction>();
  const isSubmitting = fetcher.state !== "idle";
  const [isSignUp, setIsSignUp] = useState(false);
  const funFact = useMemo(() => funFacts[Math.floor(Math.random() * funFacts.length)], []);

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <Link to="/" className="font-serif text-lg">
            LLM Stack
          </Link>
          <ColorSchemeToggle />
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm md:max-w-4xl">
          <div className="mx-auto mb-6 flex max-w-lg flex-col items-center gap-2 text-center">
            <p className="font-serif text-lg italic">Did you know?</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{funFact}</p>
          </div>

          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              {/* Form side */}
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-serif text-2xl">
                      {isSignUp ? "Create an account" : "Welcome back"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {isSignUp
                        ? "Enter your details to get started."
                        : "Sign in to continue to your dashboard."}
                    </p>
                  </div>

                  <fetcher.Form method="post" className="flex flex-col gap-4">
                    <input type="hidden" name="intent" value={isSignUp ? "sign-up" : "sign-in"} />

                    {isSignUp && (
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required={isSignUp}
                          placeholder="Max Mustermann"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="max.mustermann@web.de"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                        placeholder="Min. 8 characters"
                      />
                    </div>

                    {fetcher.data?.error && (
                      <p className="text-sm text-destructive">{fetcher.data.error}</p>
                    )}

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? "Loading..." : isSignUp ? "Create account" : "Sign in"}
                    </Button>
                  </fetcher.Form>

                  <p className="text-sm text-muted-foreground">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0"
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp ? "Sign in" : "Sign up"}
                    </Button>
                  </p>
                </div>
              </div>

              {/* Branding side */}
              <div className="hidden flex-col justify-between bg-foreground p-8 text-background md:flex">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="font-serif text-2xl">LLM Stack</span>
                    <p className="text-sm text-background/60">
                      A full-stack React starter, optimized for AI-assisted development.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {features.map((feature) => (
                      <div key={feature.title} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-background/10">
                          {feature.icon}
                        </div>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="text-sm font-medium">{feature.title}</p>
                          <p className="text-xs text-background/50">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
