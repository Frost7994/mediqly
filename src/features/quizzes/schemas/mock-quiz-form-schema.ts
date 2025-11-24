import {
  MAX_NO_OF_MOCK_QUESTIONS,
  MIN_NO_OF_MOCK_CATEGORIES,
  MIN_NO_OF_MOCK_QUESTIONS,
} from "@/constants";
import * as z from "zod";

const mockQuizFormSchema = z.object({
  categories: z
    .array(z.string())
    .min(
      MIN_NO_OF_MOCK_CATEGORIES,
      `Select at least ${MIN_NO_OF_MOCK_CATEGORIES} categor${MIN_NO_OF_MOCK_CATEGORIES > 1 ? "ies" : "y"}`
    ),
  numberOfQuestions: z
    .number()
    .min(MIN_NO_OF_MOCK_QUESTIONS, `Select at least ${MIN_NO_OF_MOCK_QUESTIONS} questions`)
    .max(MAX_NO_OF_MOCK_QUESTIONS, `You can select up to ${MAX_NO_OF_MOCK_QUESTIONS} questions`),
});

export type MockQuizFormData = z.infer<typeof mockQuizFormSchema>;

const mockQuizFormDefaultValues: MockQuizFormData = {
  categories: [],
  numberOfQuestions: MIN_NO_OF_MOCK_QUESTIONS,
};

export { mockQuizFormDefaultValues, mockQuizFormSchema };
