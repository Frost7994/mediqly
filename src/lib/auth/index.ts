import { headers } from "next/headers";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/lib/db";

const auth = betterAuth({
  // -- DATABASE CONNECTION
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  // -- SOCIAL PROVIDERS
  socialProviders: {},

  // -- CUSTOM DB HOOKS
  databaseHooks: {},

  // -- TABLE ALTERATIONS
  user: {
    modelName: "users",
  },
  session: {
    modelName: "sessions",
    expiresIn: 7 * 24 * 60 * 60, // 7 days
  },
  account: {
    modelName: "accounts",
  },
  verification: {
    modelName: "verifications",
  },

  // -- AUTHENTICATION METHOD
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 7,
    maxPasswordLength: 25,
    // autoSignIn: false,
  },

  // -- ADVANCED CONFIGURATION
  advanced: {
    database: {
      generateId: false,
    },
  },

  // -- HOOKS
  hooks: {},
});

const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
};

export { auth, getSession };
