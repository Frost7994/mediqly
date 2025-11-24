import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { categories, results } from "@/lib/db/schemas";

const categoriesOnResults = pgTable(
  "categoriesOnResults",
  {
    categoryId: uuid()
      .notNull()
      .references(() => categories.id),
    resultId: uuid()
      .notNull()
      .references(() => results.id),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.resultId] })]
);

export { categoriesOnResults };
