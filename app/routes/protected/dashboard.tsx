import { useFetcher, Link } from "react-router";
import type { Route } from "./+types/dashboard";
import { sessionContext } from "~/context";
import { signOut } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
            <fetcher.Form method="post">
              <Button
                type="submit"
                disabled={isSigningOut}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {isSigningOut ? "Signing out..." : "Sign out"}
              </Button>
            </fetcher.Form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome, {user.name}
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Your authentication is working. Here's your session info.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">User</h3>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-500">Name</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.name}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-500">Email</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.email}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-500">ID</dt>
                <dd className="font-mono text-sm text-gray-900 dark:text-gray-100">{user.id}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-500">Email verified</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.emailVerified ? "Yes" : "No"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account</h3>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-500">Created</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {new Date(user.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-500">Updated</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Navigation</h3>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  to="/"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Home
                </Link>
                <Link
                  to="/auth"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Auth page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
