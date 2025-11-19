import { createTRPCRouter } from "@/lib/trpc/init";
import { questionsRouter } from "@/lib/trpc/routers/questions-router";

export const appRouter = createTRPCRouter({
  questions: questionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
