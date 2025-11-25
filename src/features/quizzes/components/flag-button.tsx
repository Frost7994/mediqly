"use client";

import { useIsMobile } from "@/hooks";
import { FlagIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQuizStore } from "@/features/quizzes/stores";

function FlagButton() {
  // store state
  const flags = useQuizStore((state) => state.flags);
  const currentQuestion = useQuizStore((state) => state.currentQuestion);

  // store actions
  const handleFlagClick = useQuizStore((state) => state.handleFlagClick);

  // helpers
  const isQuestionFlagged = () => {
    return flags.some((flag) => flag.questionId === currentQuestion.id);
  };

  // hooks
  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      size={isMobile ? "icon-sm" : "default"}
      onClick={() => handleFlagClick()}
    >
      <span className="hidden sm:block">{isQuestionFlagged() ? "Unflag" : "Flag"}</span>
      <FlagIcon className="block sm:hidden" />
    </Button>
  );
}

export { FlagButton };
