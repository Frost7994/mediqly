import { cache } from "react";

import { initTRPC } from "@trpc/server";

const createTRPCContext = cache(async () => {
  return { userId: "user_123" };
});

const t = initTRPC.create({
  // transformer: superjson,
});

// Base router and procedure helpers
const createTRPCRouter = t.router;
const mergeTRPCRouters = t.mergeRouters;
const createCallerFactory = t.createCallerFactory;
const publicProcedure = t.procedure;

export {
  createCallerFactory,
  createTRPCContext,
  createTRPCRouter,
  mergeTRPCRouters,
  publicProcedure,
};
