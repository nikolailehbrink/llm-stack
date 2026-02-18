import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript", "import", "jsx-a11y", "unicorn"],
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
  env: {
    browser: true,
    es2024: true,
  },
  settings: {
    react: {
      linkComponents: [{ name: "Link", attributes: ["to"] }],
    },
    "jsx-a11y": {
      components: {
        Link: "a",
        NavLink: "a",
      },
    },
  },
  rules: {
    "react/rules-of-hooks": "error",
    "react/jsx-no-undef": "error",
    "react/no-direct-mutation-state": "error",
    "react/self-closing-comp": "warn",
    "react/react-in-jsx-scope": "off",
    "import/no-cycle": "error",
    "import/no-self-import": "error",
    "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
    "no-empty-pattern": "off",
    "unicorn/no-unnecessary-await": "warn",
  },
  overrides: [
    {
      files: ["*.config.ts", "*.config.js"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  ignorePatterns: ["build", ".react-router", "node_modules"],
});
