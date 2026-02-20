import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth", "routes/auth.tsx"),
  layout("routes/protected/layout.tsx", [route("dashboard", "routes/protected/dashboard.tsx")]),
  ...prefix("api", [
    route("auth/*", "routes/api/auth/catch-all.ts"),
    route("color-scheme", "routes/api/color-scheme.ts"),
  ]),
] satisfies RouteConfig;
