import { auth } from "~/lib/auth.server";

const DEMO_USER = {
  name: "Demo User",
  email: "demo@example.com",
  password: "password123",
};

async function seed(): Promise<void> {
  console.log("Seeding database...");

  try {
    await auth.api.signUpEmail({ body: DEMO_USER });
    console.log(`Created demo user: ${DEMO_USER.email}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exists")) {
      console.log("Demo user already exists, skipping.");
    } else {
      throw error;
    }
  }
}

seed()
  .then(() => {
    console.log("Seed complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
