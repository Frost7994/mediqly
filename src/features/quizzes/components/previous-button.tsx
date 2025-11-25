"use client";

import { useIsMobile } from "@/hooks";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQuizStore } from "@/features/quizzes/stores";

function PreviousButton() {
  // store state
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);

  // store actions
  const handlePrevClick = useQuizStore((state) => state.handlePrevClick);

  // hooks
  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      size={isMobile ? "icon-sm" : "default"}
      onClick={() => handlePrevClick()}
      disabled={currentQuestionIndex === 0}
    >
      <span className="hidden sm:block">Prev</span>
      <ChevronLeftIcon className="block sm:hidden" />
    </Button>
  );
}

export { PreviousButton };
