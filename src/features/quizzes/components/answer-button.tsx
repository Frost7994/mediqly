"use client";

import { cn } from "@/utils";

import { Button } from "@/components/ui/button";

import { useQuizStore } from "@/features/quizzes/stores";

type Props = {
  option: {
    id: string;
    text: string;
  };
};

function AnswerButton({ option }: Props) {
  // store state
  const answers = useQuizStore((state) => state.answers);
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const hints = useQuizStore((state) => state.hints);

  // store actions
  const handleAnswerClick = useQuizStore((state) => state.handleAnswerClick);

  // helpers
  const isAnswerSelected = (optionId: string) => {
    const answer = answers.find((a) => a.questionId === currentQuestion.id);
    return answer?.optionId === optionId;
  };

  const hasHints = (optionId: string) => {
    // return hints.some((hint) => hint.optionIds.includes(optionId));
    return hints.some((hint) => hint.optionId === optionId);
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto whitespace-normal sm:py-3",
        isAnswerSelected(option.id) &&
          "hover:bg-background hover:text-accent-foreground dark:hover:bg-input/50 border-primary dark:border-primary"
      )}
      onClick={() => handleAnswerClick(option.id)}
      disabled={hasHints(option.id)}
    >
      {option.text}
    </Button>
  );
}

export { AnswerButton };
