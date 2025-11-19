import { env } from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { relations } from "@/lib/db/relations";

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, { relations });

export type DB = typeof db;
