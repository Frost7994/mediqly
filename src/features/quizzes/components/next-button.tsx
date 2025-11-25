"use client";

import { useIsMobile } from "@/hooks";
import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQuizStore } from "@/features/quizzes/stores";

function NextButton() {
  // store state
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const questions = useQuizStore((state) => state.questions);

  // store actions
  const handleNextClick = useQuizStore((state) => state.handleNextClick);

  // hooks
  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      size={isMobile ? "icon-sm" : "default"}
      onClick={() => handleNextClick()}
      disabled={currentQuestionIndex === questions.length - 1}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="block sm:hidden" />
    </Button>
  );
}

export { NextButton };
