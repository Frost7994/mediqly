import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { questions, results } from "@/lib/db/schemas";

const questionsOnResults = pgTable(
  "questionsOnResults",
  {
    questionId: uuid()
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    resultId: uuid()
      .notNull()
      .references(() => results.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.questionId, t.resultId] })]
);

export { questionsOnResults };
