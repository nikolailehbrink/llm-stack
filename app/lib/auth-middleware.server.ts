import { redirect, type RouterContextProvider } from "react-router";
import { auth } from "~/lib/auth.server";
import { sessionContext } from "~/context";

export async function requireAuth({
  request,
  context,
}: {
  request: Request;
  context: Readonly<RouterContextProvider>;
}) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw redirect("/auth");
  }

  context.set(sessionContext, session);
}

export async function requireGuest({ request }: { request: Request }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    throw redirect("/dashboard");
  }
}
