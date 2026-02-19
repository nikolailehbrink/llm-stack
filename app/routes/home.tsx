import { Link } from "react-router";
import type { Route } from "./+types/home";
import { buttonVariants } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LLM Stack" },
    { name: "description", content: "Full-stack React app with authentication" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">LLM Stack</h1>
        <p className="text-lg text-muted-foreground">
          A full-stack React app with authentication, built with React Router, Better Auth, and
          Drizzle ORM.
        </p>
        <div className="flex gap-3">
          <Link to="/auth" className={buttonVariants()}>
            Get Started
          </Link>
          <Link to="/dashboard" className={buttonVariants({ variant: "outline" })}>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
