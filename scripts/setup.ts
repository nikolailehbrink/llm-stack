import { execSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, copyFileSync, readFileSync, writeFileSync } from "node:fs";

function run(cmd: string): void {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

// 1. Create .env if it doesn't exist
if (!existsSync(".env")) {
  console.log("Creating .env from .env.example...");
  copyFileSync(".env.example", ".env");

  const secret = randomBytes(32).toString("base64");
  const env = readFileSync(".env", "utf8").replace(
    "BETTER_AUTH_SECRET=",
    `BETTER_AUTH_SECRET=${secret}`,
  );
  writeFileSync(".env", env);
  console.log("Generated BETTER_AUTH_SECRET.");
} else {
  console.log(".env already exists, skipping.");
}

// 2. Push database schema
run("bun run db:push");

// 3. Seed database
run("bun run db:seed");

console.log("\nSetup complete! Run 'bun run dev' to start developing.");
