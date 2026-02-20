import { data } from "react-router";

import { colorSchemeSchema, serializeColorScheme } from "~/lib/color-scheme.server";

import type { Route } from "./+types/color-scheme";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const colorScheme = colorSchemeSchema.parse(formData.get("colorScheme"));
  return data(null, {
    headers: { "Set-Cookie": await serializeColorScheme(colorScheme) },
  });
}
