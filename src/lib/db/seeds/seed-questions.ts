import { updatedQuestions } from "@/data";
import { inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import { categories, categoriesOnQuestions, options, questions } from "@/lib/db/schemas";

export const seedQuestions = async () => {
  for (const q of updatedQuestions) {
    // insert question into db
    const [question] = await db
      .insert(questions)
      .values({
        question: q.question,
      })
      .returning({ id: questions.id });

    // read the related categories from the db
    const dbCategories = await db
      .select({ id: categories.id })
      .from(categories)
      .where(inArray(categories.name, q.categories));

    // join categories to question
    await db.insert(categoriesOnQuestions).values(
      dbCategories.map((c) => ({
        categoryId: c.id,
        questionId: question.id,
      }))
    );

    // insert options into db
    for (const o of q.options) {
      await db.insert(options).values({
        text: o.text,
        correct: o.correct,

        questionId: question.id,
      });
    }
  }
};
