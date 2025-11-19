import { boolean, pgTable, text } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";

export const users = pgTable("users", {
  id,
  name: text().notNull(),

  email: text().notNull().unique(),
  emailVerified: boolean()
    .$defaultFn(() => false)
    .notNull(),

  createdAt,
  updatedAt,
});
