import { NUDGE, PROMPT } from "@/constants";
import { pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "@/lib/db/helpers";
import { answers, options, results } from "@/lib/db/schemas";

const hintTypes = [NUDGE, PROMPT] as const;
export type HintType = (typeof hintTypes)[number];
const hintTypeEnum = pgEnum("hintType", hintTypes);

const hints = pgTable("hints", {
  id,
  type: hintTypeEnum().default(NUDGE),

  resultId: uuid()
    .notNull()
    .references(() => results.id),

  answerId: uuid()
    .notNull()
    .references(() => answers.id),

  optionId: uuid().references(() => options.id),

  createdAt,
  updatedAt,
});

export { hints, hintTypeEnum, hintTypes };
