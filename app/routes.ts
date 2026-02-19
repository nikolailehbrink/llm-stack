import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/auth/*", "routes/api.auth.$.ts"),
  route("auth", "routes/auth.tsx"),
  layout("routes/protected-layout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
