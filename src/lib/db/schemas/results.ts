import { MOCK, OFFICIAL } from "@/constants";
import { boolean, integer, pgEnum, pgTable } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";

const resultTypes = [MOCK, OFFICIAL] as const;
export type ResultType = (typeof resultTypes)[number];
const resultTypeEnum = pgEnum("resultType", resultTypes);

const results = pgTable("results", {
  id,

  type: resultTypeEnum().default(MOCK),

  percentage: integer().notNull(),

  nudgesActive: boolean().notNull().default(false),
  promptsActive: boolean().notNull().default(false),
  timerActive: boolean().notNull().default(false),
  timeTaken: integer().notNull().default(0),

  createdAt,
  updatedAt,
});

export { results, resultTypeEnum, resultTypes };
