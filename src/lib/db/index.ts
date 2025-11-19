import { env } from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { relations } from "@/lib/db/relations";
import * as schema from "@/lib/db/schemas";

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, { schema, relations });

export type DB = typeof db;
