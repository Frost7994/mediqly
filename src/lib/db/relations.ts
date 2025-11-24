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

  answers: {
    question: r.one.questions({
      from: r.answers.questionId,
      to: r.questions.id,
    }),
    option: r.one.options({
      from: r.answers.optionId,
      to: r.options.id,
    }),
    result: r.one.results({
      from: r.answers.resultId,
      to: r.results.id,
    }),
    hints: r.many.hints({
      from: r.answers.id,
      to: r.hints.answerId,
    }),
  },
  categories: {
    questions: r.many.questions({
      from: r.categories.id.through(r.categoriesOnQuestions.categoryId),
      to: r.questions.id.through(r.categoriesOnQuestions.questionId),
    }),
    results: r.many.results({
      from: r.categories.id.through(r.categoriesOnResults.categoryId),
      to: r.results.id.through(r.categoriesOnResults.resultId),
    }),
  },
  flags: {
    question: r.one.questions({
      from: r.flags.questionId,
      to: r.questions.id,
    }),
    result: r.one.results({
      from: r.flags.resultId,
      to: r.results.id,
    }),
  },
  hints: {
    result: r.one.results({
      from: r.hints.resultId,
      to: r.results.id,
    }),
    answer: r.one.answers({
      from: r.hints.answerId,
      to: r.answers.id,
    }),
    option: r.one.options({
      from: r.hints.optionId,
      to: r.options.id,
    }),
  },
  options: {
    question: r.one.questions({
      from: r.options.questionId,
      to: r.questions.id,
    }),
    answers: r.many.answers(),
    hints: r.many.hints(),
  },
  questions: {
    categories: r.many.categories(),
    options: r.many.options(),
    results: r.many.results({
      from: r.questions.id.through(r.questionsOnResults.questionId),
      to: r.results.id.through(r.questionsOnResults.resultId),
    }),
    answers: r.many.answers(),
    flags: r.many.flags(),
  },
  results: {
    categories: r.many.categories(),
    questions: r.many.questions(),
    answers: r.many.answers(),
    hints: r.many.hints(),
    flags: r.many.flags(),
  },
}));

export { relations };
