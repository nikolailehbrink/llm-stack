import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

function run(cmd: string): void {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

// 1. Create .env if it doesn't exist
if (!existsSync(".env")) {
  console.log("Creating .env from .env.example...");
  const template = readFileSync(".env.example", "utf-8");
  const secret = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64");
  writeFileSync(".env", template.replace("BETTER_AUTH_SECRET=", `BETTER_AUTH_SECRET=${secret}`));
  console.log("Generated BETTER_AUTH_SECRET.");
} else {
  console.log(".env already exists, skipping.");
}

// 2. Push database schema
run("bun run db:push");

// 3. Seed database
run("bun run db:seed");

console.log("\nSetup complete!");
