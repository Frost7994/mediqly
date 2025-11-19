import { defineRelations } from "drizzle-orm";

import * as schema from "@/lib/db/schemas";

const relations = defineRelations(schema, (r) => ({
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  users: {},
  verifications: {},
}));

export { relations };
