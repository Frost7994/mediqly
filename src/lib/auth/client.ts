import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

const auth = createAuthClient({
  baseURL: env.NEXT_PUBLIC_API_URL,
  plugins: [],
});

export const { signIn, signOut, signUp, useSession } = auth;
