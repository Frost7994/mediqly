import { pgTable, varchar } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";

const questions = pgTable("questions", {
  id,
  question: varchar().notNull(),

  createdAt,
  updatedAt,
});

export { questions };
