// Workaround: Vercel's default server entry doesn't pass a RouterContextProvider
// when middleware is enabled (v8_middleware: true), causing a runtime error.
// Remove this file (and the rollupOptions.input in vite.config.ts) once fixed:
// https://github.com/vercel/vercel/issues/13327
import { createRequestHandler, RouterContextProvider } from "react-router";
import * as build from "virtual:react-router/server-build";

const handler = createRequestHandler(build);

export default async function (request: Request): Promise<Response> {
  return handler(request, new RouterContextProvider());
}
