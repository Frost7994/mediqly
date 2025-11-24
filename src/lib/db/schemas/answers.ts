import { pgTable, uuid } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";
import { options, questions, results } from "@/lib/db/schemas";

const answers = pgTable("answers", {
  id,

  questionId: uuid()
    .notNull()
    .references(() => questions.id),

  resultId: uuid()
    .notNull()
    .references(() => results.id),

  optionId: uuid()
    .notNull()
    .references(() => options.id),

  createdAt,
  updatedAt,
});

export { answers };
