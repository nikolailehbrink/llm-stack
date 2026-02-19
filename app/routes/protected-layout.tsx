import { Outlet } from "react-router";
import type { Route } from "./+types/protected-layout";
import { requireAuth } from "~/lib/auth-middleware.server";

export const middleware: Route.MiddlewareFunction[] = [requireAuth];

export default function ProtectedLayout() {
  return <Outlet />;
}
