import { file } from "bun";

async function run(cmd: string[]): Promise<void> {
  console.log(`\n> ${cmd.join(" ")}`);
  const proc = Bun.spawn(cmd, { stdio: ["inherit", "inherit", "inherit"] });
  const code = await proc.exited;
  if (code !== 0) process.exit(code);
}

// 1. Create .env if it doesn't exist
const envFile = file(".env");

if (!(await envFile.exists())) {
  console.log("Creating .env from .env.example...");
  const template = await file(".env.example").text();
  const secret = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64");
  await Bun.write(envFile, template.replace("BETTER_AUTH_SECRET=", `BETTER_AUTH_SECRET=${secret}`));
  console.log("Generated BETTER_AUTH_SECRET.");
} else {
  console.log(".env already exists, skipping.");
}

// 2. Push database schema
await run(["bun", "run", "db:push"]);

// 3. Seed database
await run(["bun", "run", "db:seed"]);

console.log("\nSetup complete!");
