import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";
import { questions, results } from "@/lib/db/schemas";

const flags = pgTable("flags", {
  id,

  active: boolean().notNull().default(true),

  questionId: uuid()
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),

  resultId: uuid()
    .notNull()
    .references(() => results.id, { onDelete: "cascade" }),

  createdAt,
  updatedAt,
});

export { flags };
