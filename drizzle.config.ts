import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL ?? `file:${process.env.DATABASE_URL}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

export default defineConfig({
  dialect: "turso",
  schema: "./app/db/schema.ts",
  dbCredentials: { url, authToken },
});
