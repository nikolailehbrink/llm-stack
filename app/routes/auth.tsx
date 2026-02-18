import { useState } from "react";
import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/auth";
import { requireGuest } from "~/lib/auth-middleware.server";
import { signIn, signUp } from "~/lib/auth-client";

export const middleware: Route.MiddlewareFunction[] = [requireGuest];

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-900 dark:shadow-gray-900/50">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>

        <fetcher.Form method="post" className="space-y-4">
          <input type="hidden" name="intent" value={isSignUp ? "sign-up" : "sign-in"} />

          {isSignUp && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required={isSignUp}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>

          {fetcher.data?.error && (
            <p className="text-sm text-red-600 dark:text-red-400">{fetcher.data.error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSubmitting ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </fetcher.Form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
