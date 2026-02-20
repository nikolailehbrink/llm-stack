import { createCookie } from "react-router";
import { z } from "zod";

const colorSchemeCookie = createCookie("color-scheme", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 365, // 1 year
});

export const colorSchemeSchema = z
  .enum(["light", "dark", "system"])
  .default("system")
  .catch("system");

export type ColorScheme = z.infer<typeof colorSchemeSchema>;

export async function getColorScheme(request: Request): Promise<ColorScheme> {
  const value = await colorSchemeCookie.parse(request.headers.get("Cookie"));
  return colorSchemeSchema.parse(value);
}

export async function serializeColorScheme(colorScheme: ColorScheme): Promise<string> {
  return colorSchemeCookie.serialize(colorScheme);
}
