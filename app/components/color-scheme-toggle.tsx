import { Form, useRouteLoaderData } from "react-router";

import { Button } from "~/components/ui/button";
import type { ColorScheme } from "~/lib/color-scheme.server";
import type { loader } from "~/root";

const options: { value: ColorScheme; label: string; icon: React.ReactNode }[] = [
  {
    value: "light",
    label: "Light",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
];

export function ColorSchemeToggle() {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const current = loaderData?.colorScheme ?? "system";

  return (
    <Form method="POST" action="/api/color-scheme" navigate={false} className="flex gap-1">
      {options.map((option) => (
        <Button
          key={option.value}
          type="submit"
          name="colorScheme"
          value={option.value}
          variant={current === option.value ? "outline" : "ghost"}
          size="icon-sm"
          aria-label={option.label}
          aria-pressed={current === option.value}
        >
          {option.icon}
        </Button>
      ))}
    </Form>
  );
}
