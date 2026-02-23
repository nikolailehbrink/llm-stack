import { useFetcher, useFetchers, useRouteLoaderData } from "react-router";
import { z } from "zod";

import type { loader } from "~/root";

export const colorSchemeSchema = z
  .enum(["light", "dark", "system"])
  .default("system")
  .catch("system");

export type ColorScheme = z.infer<typeof colorSchemeSchema>;

const ACTION = "/api/color-scheme";

/**
 * Returns the current color scheme with optimistic UI support.
 *
 * While a color-scheme fetcher is in flight, this returns the pending value
 * so the UI updates instantly — before the server responds.
 */
export function useColorScheme(): ColorScheme {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const fetchers = useFetchers();

  const pending = fetchers.find((f) => f.formAction === ACTION && f.formData);

  return (
    (pending?.formData?.get("colorScheme") as ColorScheme) ?? loaderData?.colorScheme ?? "system"
  );
}

/**
 * Returns the current color scheme and a setter with optimistic UI.
 *
 * Usage:
 * ```tsx
 * const [colorScheme, setColorScheme] = useOptimisticColorScheme();
 * ```
 */
export function useOptimisticColorScheme() {
  const colorScheme = useColorScheme();
  const fetcher = useFetcher();

  const setColorScheme = (value: ColorScheme) => {
    fetcher.submit({ colorScheme: value }, { method: "POST", action: ACTION });
  };

  return [colorScheme, setColorScheme] as const;
}
