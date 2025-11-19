import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";
import { users } from "@/lib/db/schemas";

export const sessions = pgTable("sessions", {
  id,
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),

  ipAddress: text(),
  userAgent: text(),
  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt,
  updatedAt,
});
