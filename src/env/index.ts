import { createEnv } from "@t3-oss/env-nextjs";
import "dotenv/config";
import * as z from "zod";

const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
  },
  server: {},
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});

export { env };
