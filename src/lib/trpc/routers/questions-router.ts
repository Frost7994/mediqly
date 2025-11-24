import * as z from "zod";

import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/init";

const questionsRouter = createTRPCRouter({
  read: protectedProcedure
    .input(
      z.object({
        categories: z.array(
          z.object({
            id: z.string(),
          })
        ),
      })
    )
    .query(async ({ ctx: { db }, input }) => {
      // destructure input
      const { categories } = input;

      //  if no categories are provided, return all questions
      if (!categories || categories.length === 0) {
        return await db.query.questions.findMany({
          columns: {
            id: true,
            question: true,
          },
          with: {
            options: {
              columns: {
                id: true,
                text: true,
                correct: true,
              },
            },
          },
        });
      }

      // return questions matching the provided categories
      return await db.query.questions.findMany({
        columns: {
          id: true,
          question: true,
        },
        with: {
          options: {
            columns: {
              id: true,
              text: true,
              correct: true,
            },
          },
        },
        where: {
          categories: {
            RAW({ id }, { inArray }) {
              return inArray(
                id,
                categories.map((category) => category.id)
              );
            },
          },
        },
      });
    }),
});

export { questionsRouter };
