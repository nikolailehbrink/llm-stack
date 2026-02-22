import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "~/db/index.server";

// No baseURL or BETTER_AUTH_URL needed — Better Auth auto-detects from the request.
// https://www.reddit.com/r/better_auth/comments/1hfamym/why_setting_up_better_auth_url_in_env_is_needed/
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
  trustedOrigins: process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : [],
});
