import * as z from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/init";

const questionsRouter = createTRPCRouter({
  read: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

export { questionsRouter };
