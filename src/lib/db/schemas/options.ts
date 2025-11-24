import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";
import { questions } from "@/lib/db/schemas";

const options = pgTable("options", {
  id,
  text: varchar().notNull(),
  correct: boolean().notNull().default(false),

  questionId: uuid()
    .notNull()
    .references(() => questions.id),

  createdAt,
  updatedAt,
});

export { options };
