import { useFetcher, Link } from "react-router";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { sessionContext } from "~/context";
import { signOut } from "~/lib/auth-client";

import type { Route } from "./+types/dashboard";

export function meta() {
  return [{ title: "Dashboard" }];
}

export async function loader({ context }: Route.LoaderArgs) {
  const { user } = context.get(sessionContext);
  return { user };
}

export async function clientAction() {
  await signOut();
  return { success: true };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const fetcher = useFetcher<typeof clientAction>();
  const isSigningOut = fetcher.state !== "idle";

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card text-card-foreground">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <fetcher.Form method="post">
              <Button type="submit" variant="outline" disabled={isSigningOut}>
                {isSigningOut ? "Signing out..." : "Sign out"}
              </Button>
            </fetcher.Form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
          <p className="mt-1 text-muted-foreground">
            Your authentication is working. Here's your session info.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User</CardTitle>
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
                  <dt className="text-xs text-muted-foreground">ID</dt>
                  <dd className="font-mono text-sm">{user.id}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Email verified</dt>
                  <dd className="text-sm font-medium">{user.emailVerified ? "Yes" : "No"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-muted-foreground">Created</dt>
                  <dd className="text-sm font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-US")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Updated</dt>
                  <dd className="text-sm font-medium">
                    {new Date(user.updatedAt).toLocaleDateString("en-US")}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground">Navigation</h3>
                <div className="mt-3 flex flex-col gap-2">
                  <Link to="/" className="text-sm text-primary hover:underline">
                    Home
                  </Link>
                  <Link to="/auth" className="text-sm text-primary hover:underline">
                    Auth page
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
