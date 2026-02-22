import { createRequestHandler, RouterContextProvider } from "react-router";
import * as build from "virtual:react-router/server-build";

const handler = createRequestHandler(build);

export default async function (request: Request): Promise<Response> {
  return handler(request, new RouterContextProvider());
}
