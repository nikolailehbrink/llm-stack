import { describe, expect, test } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  test("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  test("handles falsy values", () => {
    expect(cn("foo", undefined, null, "baz")).toBe("foo baz");
  });

  test("deduplicates and merges tailwind classes", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  test("handles empty inputs", () => {
    expect(cn()).toBe("");
  });
});
