import "drizzle-orm/mysql-core";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";

const categories = pgTable("categories", {
  id,
  name: varchar().notNull().unique(),

  createdAt,
  updatedAt,
});

export { categories };
