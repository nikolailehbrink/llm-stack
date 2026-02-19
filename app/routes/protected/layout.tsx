import { Outlet } from "react-router";
import { requireAuth } from "~/lib/auth-middleware.server";
import type { Route } from "./+types/layout";

export const middleware: Route.MiddlewareFunction[] = [requireAuth];

export default function ProtectedLayout() {
  return <Outlet />;
}
