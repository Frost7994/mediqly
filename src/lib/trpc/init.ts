import { cache } from "react";

import { TRPCError, initTRPC } from "@trpc/server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

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
const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = await getSession();

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorised" });
  }

  return next({ ctx: { ...ctx, session, db } });
});

export {
  createCallerFactory,
  createTRPCContext,
  createTRPCRouter,
  mergeTRPCRouters,
  protectedProcedure,
  publicProcedure,
};
