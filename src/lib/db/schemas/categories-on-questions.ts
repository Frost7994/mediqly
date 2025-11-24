import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { categories, questions } from "@/lib/db/schemas";

const categoriesOnQuestions = pgTable(
  "categoriesOnQuestions",
  {
    categoryId: uuid()
      .notNull()
      .references(() => categories.id),
    questionId: uuid()
      .notNull()
      .references(() => questions.id),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.questionId] })]
);

export { categoriesOnQuestions };
