import { useState } from "react";
import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/auth";
import { requireGuest } from "~/lib/auth-middleware.server";
import { signIn, signUp } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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

export default function AuthPage() {
  const fetcher = useFetcher<typeof clientAction>();
  const isSubmitting = fetcher.state !== "idle";
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Create an account to get started" : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fetcher.Form method="post" className="flex flex-col gap-4">
            <input type="hidden" name="intent" value={isSignUp ? "sign-up" : "sign-in"} />

            {isSignUp && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" required={isSignUp} />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="max.mustermann@web.de"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required minLength={8} />
            </div>

            {fetcher.data?.error && (
              <p className="text-sm text-destructive">{fetcher.data.error}</p>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </fetcher.Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              type="button"
              variant="link"
              className="h-auto p-0"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
