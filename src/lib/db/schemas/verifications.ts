import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";

export const verifications = pgTable("verifications", {
  id,
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),

  createdAt,
  updatedAt,
});
